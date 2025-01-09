import { PROBLEM_DIFFICULTY, ProblemEntry, ProblemInfo } from "@/types/problem";
import FileExplorerSoln from '@/app/problems/file-explorer/soln'
import AccordionSoln from '@/app/problems/accordion/soln'
import CounterSoln from '@/app/problems/counter/soln'
import SummationSoln from '@/app/problems/summation/soln'
import { Plus, SquareSigma, ListCollapse, FolderOpen } from "lucide-react";
import { toKebabCase } from "@/utils/cases";

const problems: ProblemInfo[] = [
    {
        id: 'file-explorer',
        title: 'File Explorer',
        difficulty: PROBLEM_DIFFICULTY.Medium,
        solutionComponent: FileExplorerSoln,
        icon: FolderOpen
    },
    {
        id: 'counter',
        title: 'Counter',
        difficulty: PROBLEM_DIFFICULTY.Easy,
        solutionComponent: CounterSoln,
        icon: Plus
    },
    {
        id: 'summation',
        title: 'Summation',
        difficulty: PROBLEM_DIFFICULTY.Easy,
        solutionComponent: SummationSoln,
        icon: SquareSigma
    },
    {
        id: 'accordion',
        title: 'Accordion',
        difficulty: PROBLEM_DIFFICULTY.Easy,
        solutionComponent: AccordionSoln,
        icon: ListCollapse
    },
]

export function getProblemById(id: string): ProblemEntry | undefined {
    const res = problems.find(item => item.id === id)

    return res ? {
        ...res,
        url: `/${res.difficulty}/${toKebabCase(res.title)}`
    } : undefined
}

export function getProblemsByDifficulty(difficulty: PROBLEM_DIFFICULTY): ProblemEntry[] {
    return problems
        .filter((item) => item.difficulty === difficulty)
        .map(prob => {
            return {
                ...prob,
                url: `/${prob.difficulty}/${toKebabCase(prob.title)}`
            }
        })
}