import pdf from 'pdf-parse'
import cheerio from 'cheerio'

export interface ScrapedEditalData {
    text: string
    title?: string
    url: string
    extractedInfo?: {
        inscriptionStart?: Date
        inscriptionEnd?: Date
        examDate?: Date
        salaries?: string[]
        positions?: string[]
        banca?: string
    }
}

export class EditalScraper {
    /**
     * Scrape an edital from a URL (PDF or Webpage)
     */
    async scrape(url: string): Promise<ScrapedEditalData> {
        console.log(`Starting scrape for: ${url}`)

        try {
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Failed to fetch URL: ${response.statusText}`)
            }

            const contentType = response.headers.get('content-type')

            if (contentType?.includes('application/pdf')) {
                const buffer = await response.arrayBuffer()
                return this.parsePdf(Buffer.from(buffer), url)
            } else {
                // Assume HTML page with links to PDF or content
                const html = await response.text()
                return this.parseHtmlPage(html, url)
            }
        } catch (error) {
            console.error('Error in EditalScraper:', error)
            throw error
        }
    }

    private async parsePdf(buffer: Buffer, url: string): Promise<ScrapedEditalData> {
        const data = await pdf(buffer)
        const text = data.text

        // Extract basic info using Regex patterns
        const extractedInfo = this.extractInfoFromText(text)

        return {
            text,
            url,
            extractedInfo
        }
    }

    private async parseHtmlPage(html: string, url: string): Promise<ScrapedEditalData> {
        const $ = cheerio.load(html)
        // This is a placeholder for generic HTML parsing logic
        // Real implementation would look for PDF links or article content

        // Example: Look for links ending in .pdf
        const pdfLink = $('a[href$=".pdf"]').first().attr('href')

        if (pdfLink) {
            const absoluteLink = new URL(pdfLink, url).toString()
            return this.scrape(absoluteLink)
        }

        return {
            text: $('body').text(), // Fallback to body text
            url,
            title: $('title').text()
        }
    }

    private extractInfoFromText(text: string) {
        // Basic Regex patterns for Brazilian editais
        const datePattern = /\d{2}\/\d{2}\/\d{4}/g
        const moneyPattern = /R\$\s?[\d.,]+/g

        // Find dates (very naive implementation)
        const dates = text.match(datePattern) || []

        // Find salaries
        const salaries = text.match(moneyPattern) || []

        // Identify Banca (naive check)
        const bancas = ['CESPE', 'CEBRASPE', 'FGV', 'VUNESP', 'FCC', 'IBFC']
        const foundBanca = bancas.find(b => text.toUpperCase().includes(b))

        return {
            salaries: [...new Set(salaries)], // Deduplicate
            banca: foundBanca,
            rawDates: dates.slice(0, 10) // Keep first 10 dates for review
        }
    }
}
