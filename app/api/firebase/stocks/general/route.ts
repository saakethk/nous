import { db } from '@/utils/firebase.admin'
import { type NextRequest } from 'next/server'

// Intended to act as proxy for Alpaca requests
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {

    const snapshot = await db.collection("stocks").get();
    const stocks: { [id: string]: any} = {}
    snapshot.forEach(doc => {
        stocks[doc.id] = doc.data();
    });
    
    try {
        return new Response(JSON.stringify(stocks), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (reason) {
        const message = reason instanceof Error ? reason.message : 'Unexpected exception'
        return new Response(message, { status: 500 })
    }
}