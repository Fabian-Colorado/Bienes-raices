async function createSessionToken(password) {

    const timestamp = Date.now().toString();

    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        {
            name: "HMAC",
            hash: "SHA-256"
        },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(timestamp)
    );

    const signatureArray = Array.from(new Uint8Array(signature));

    const signatureHex = signatureArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

    return `${timestamp}.${signatureHex}`;
}
async function verifySessionToken(token, password) {

    if (!token) {
        return false;
    }

    const parts = token.split(".");

    if (parts.length !== 2) {
        return false;
    }

    const [timestamp, signatureHex] = parts;

    const tokenAge = Date.now() - Number(timestamp);

    // La sesión no puede tener más de 1 hora
    if (tokenAge > 60 * 60 * 1000 || tokenAge < 0) {
        return false;
    }

    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        {
            name: "HMAC",
            hash: "SHA-256"
        },
        false,
        ["verify"]
    );

    const signature = new Uint8Array(
        signatureHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
    );

    return await crypto.subtle.verify(
        "HMAC",
        key,
        signature,
        encoder.encode(timestamp)
    );
}
export default {
    async fetch(request, env) {

        const url = new URL(request.url);
        const cookies = request.headers.get("Cookie") || "";

const sessionCookie = cookies
    .split(";")
    .find(cookie => cookie.trim().startsWith("admin_session="));

const sessionToken = sessionCookie
    ? sessionCookie.trim().substring("admin_session=".length)
    : null;

const isAuthenticated = await verifySessionToken(
    sessionToken,
    env.ADMIN_PASSWORD
);
        console.log("Admin panel:", {
    path: url.pathname,
    authenticated: isAuthenticated
});
if (url.pathname === "/admin-panel.html" && !isAuthenticated) {

    return Response.redirect(
        `${url.origin}/admin.html`,
        302
    );
}
                // Login del administrador
        if (url.pathname === "/api/admin/login" && request.method === "POST") {

            const body = await request.json();

 if (body.password === env.ADMIN_PASSWORD) {

    const token = await createSessionToken(env.ADMIN_PASSWORD);

    return new Response(
        JSON.stringify({
            success: true
        }),
        {
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie": `admin_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
            }
        }
    );
}

            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Contraseña incorrecta"
                }),
                {
                    status: 401,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        if (url.pathname === "/api/properties") {

            const { results: properties } = await env.DB
                .prepare("SELECT * FROM properties ORDER BY id DESC")
                .all();

            const { results: images } = await env.DB
                .prepare(
                    "SELECT * FROM property_images ORDER BY property_id, sort_order"
                )
                .all();

            const formattedProperties = properties.map(property => {

                const propertyImages = images
                    .filter(image => image.property_id === property.id)
                    .map(image => image.image_url);

                return {
                    id: property.id,
                    title: property.title,
                    price: property.price,
                    location: property.location,
                    bedrooms: property.bedrooms,
                    bathrooms: property.bathrooms,
                    description: property.description,

                    images: propertyImages,

                    services: {
                        water: Boolean(property.water),
                        electricity: Boolean(property.electricity),
                        deeds: Boolean(property.deeds),
                        debt: Boolean(property.debt)
                    }
                };
            });

            return new Response(
                JSON.stringify(formattedProperties),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return env.ASSETS.fetch(request);
    }
};
