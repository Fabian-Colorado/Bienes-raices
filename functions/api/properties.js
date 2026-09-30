export async function onRequestGet(context) {
    const { env } = context;

    const { results } = await env.DB.prepare(
        "SELECT * FROM properties ORDER BY id DESC"
    ).all();

    return new Response(
        JSON.stringify(results),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}
