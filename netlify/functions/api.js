export const handler = async (event, context) => {

    const params = new URLSearchParams(event.queryStringParameters).toString();
    
    const GOLEMIO_URL = `https://api.golemio.cz/v2/pid/departureboards?${params}`;
    
    const API_KEY = process.env.GOLEMIO_API_KEY;

    try {
        const response = await fetch(GOLEMIO_URL, {
            headers: {
                'x-access-token': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // 5. Pošleme data zpět na tvůj web
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Chyba na serveru", details: error.message })
        };
    }
};