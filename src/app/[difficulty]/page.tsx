export default async function ProblemPage({
    params 
}: {
    params: Promise<{ difficulty: string }>
}) {
    const difficulty = (await params).difficulty
    return (
        <div>
            { difficulty }
        </div>
    )
}