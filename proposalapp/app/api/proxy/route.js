export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 10;
        const status = searchParams.get('status') || '';
        const search = searchParams.get('search') || '';

        const response = await fetch(
            `https://3c20-183-82-206-164.ngrok-free.app/activity/getall?sort=Upcoming&type=Events&page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&status=${status}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return new Response(JSON.stringify({ error: errorData.message || 'Failed to fetch activities' }), { status: response.status });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
