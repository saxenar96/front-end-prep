import * as fs from 'fs'
import path from 'path';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const filePath = path.join(process.cwd(), '/src/app/problems', id, '/problem-description.md');
    try {
        const content = fs.readFileSync(filePath, 'utf8')
        return Response.json({
        content
        })
    } catch (e) {
    console.error('Error!', e)
    return Response.error()
    }
}