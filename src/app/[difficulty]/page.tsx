import { Button } from "@/components/ui/button"
import { getProblemsByDifficulty } from "@/const/problems"
import { DIFFICULTY_TITLES, PROBLEM_DIFFICULTY } from "@/types/problem"
import Link from "next/link"

function getDiffTitle(diff: string) {
    if (diff === 'easy') return DIFFICULTY_TITLES.easy
    if (diff === 'medium') return DIFFICULTY_TITLES.medium
    return DIFFICULTY_TITLES.hard
}

export default async function ProblemPage({
    params 
}: {
    params: Promise<{ difficulty: string }>
}) {
    const { difficulty } = (await params)
    const title = getDiffTitle(difficulty)
    const problemSet = getProblemsByDifficulty(PROBLEM_DIFFICULTY[title])
    
    return (
        <div>
            <h1 className="text-[2em] pb-[0.3em] font-bold">{ `${title} Problems` }</h1>
            <div className="flex flex-col justify-start items-start">
                {
                    problemSet.map(problem => (
                        <Button key={problem.id} variant="link" asChild>
                            <Link href={problem.url}>
                                <>
                                    {problem.icon && (<problem.icon />)}
                                    {problem.title}
                                </>
                            </Link>
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}