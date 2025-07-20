import { db } from '@/utils/firebase.admin'
import { type NextRequest } from 'next/server'

// Intended to act as proxy for Alpaca requests
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {

    const snapshot = await db.collection("updates").orderBy("timestamp", "desc").get();
    const updates: any[] = []
    snapshot.forEach(doc => {
        let update: any = doc.data();
        update["id"] = doc.id;
        update["timestamp"] = update["timestamp"].toDate()
        updates.push(
            update
        )
    });

    try {
        return new Response(JSON.stringify(updates), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (reason) {
        const message = reason instanceof Error ? reason.message : 'Unexpected exception'
        return new Response(message, { status: 500 })
    }
}