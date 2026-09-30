export default {
    async fetch(request, env) {

        const url = new URL(request.url);

        if (url.pathname === "/api/properties") {

            const { results } = await env.DB
                .prepare("SELECT * FROM properties ORDER BY id DESC")
                .all();

            return new Response(
                JSON.stringify(results),
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
