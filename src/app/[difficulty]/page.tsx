import { DataTable } from "@/components/dataTable/data-table"
// import { Button } from "@/components/ui/button"
import { columns, DataTableProblemEntry } from "@/const/data-table-columns"
import { getProblemsByDifficulty } from "@/const/problems"
import { DIFFICULTY_TITLES, PROBLEM_DIFFICULTY } from "@/types/problem"
// import { Row } from "@tanstack/react-table"
// import { redirect } from "next/navigation"

// import Link from "next/link"

function getDiffTitle(diff: string) {
    if (diff === 'easy') return DIFFICULTY_TITLES.easy
    if (diff === 'medium') return DIFFICULTY_TITLES.medium
    return DIFFICULTY_TITLES.hard
}

export default async function ProblemPage({
    params,
}: {
    params: Promise<{ difficulty: string }>
}) {
    const { difficulty } = (await params)
    const title = difficulty === 'all-problems' ? undefined : PROBLEM_DIFFICULTY[getDiffTitle(difficulty)]
    const problemSet = getProblemsByDifficulty(title)
    const dataTableEntries: DataTableProblemEntry[] = problemSet.map((entry) => {
        const { id, title, difficulty, problemType, estimatedCompletionTime } = entry

        return {
            id,
            title,
            difficulty,
            problemType,
            estimatedCompletionTime,
            link: id
        }
    })

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-[2em] pb-[0.3em] font-bold">{ `${title ?? 'All'} Problems` }</h1>
            <DataTable columns={columns} data={dataTableEntries} />
        </div>
    )
}