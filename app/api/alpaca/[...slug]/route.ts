import { type NextRequest } from 'next/server'

// Intended to act as proxy for Alpaca requests
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {

    // Gets url
    const { slug } = await params
    const pathname = slug.join("/")
    const proxyURL = new URL(pathname, process.env.ALPACA_PAPER_TRADE_BASE_API)
    const searchParams = request.nextUrl.searchParams
    const options: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json', 
            'APCA-API-KEY-ID': process.env.ALPACA_PAPER_TRADE_MARKET_KEY as string, 
            'APCA-API-SECRET-KEY': process.env.ALPACA_PAPER_TRADE_MARKET_SECRET as string
        }
    };

    try {
        let response = await fetch(`${proxyURL.href}?${searchParams}`, options)
        let response_object = await response.json()
        return new Response(JSON.stringify(response_object), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (reason) {
        const message = reason instanceof Error ? reason.message : 'Unexpected exception'
        return new Response(message, { status: 500 })
    }
}