import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'
import { EditalScraper } from '@/lib/scrapers/edital-scraper'
// import prisma from '@/lib/db/prisma'

export async function POST(req: NextRequest) {
    try {
        const session = await getSession()

        // Check for authentication (mock or real)
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await req.json()
        const { url, concursoId } = body

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            )
        }

        const scraper = new EditalScraper()
        const data = await scraper.scrape(url)

        // TODO: Save to database when Prisma connection is working
        // if (concursoId) {
        //     await prisma.edital.create({ ... })
        // }

        return NextResponse.json({
            success: true,
            data
        })

    } catch (error) {
        console.error('Scraping error:', error)
        return NextResponse.json(
            { error: 'Failed to scrape edital' },
            { status: 500 }
        )
    }
}
