export default {
    async fetch(request, env) {

        const url = new URL(request.url);
                // Login del administrador
        if (url.pathname === "/api/admin/login" && request.method === "POST") {

            const body = await request.json();

            if (body.password === env.ADMIN_PASSWORD) {

                return new Response(
                    JSON.stringify({
                        success: true
                    }),
                    {
                        headers: {
                            "Content-Type": "application/json"
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
