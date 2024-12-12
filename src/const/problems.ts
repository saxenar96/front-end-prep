import { PROBLEM_DIFFICULTY, ProblemEntry, ProblemInfo } from "@/types/problem";
import CounterDev from '@/app/problems/counter/dev'
import CounterSoln from '@/app/problems/counter/soln'
import SummationDev from '@/app/problems/summation/dev'
import SummationSoln from '@/app/problems/summation/soln'
import { Plus, SquareSigma } from "lucide-react";
import { toHyphenCase } from "@/utils/cases";

const problems: ProblemInfo[] = [
    {
        id: 'counter',
        title: 'Counter',
        difficulty: PROBLEM_DIFFICULTY.Easy,
        devComponent: CounterDev,
        solutionComponent: CounterSoln,
        icon: Plus
    },
    {
        id: 'summation',
        title: 'Summation',
        difficulty: PROBLEM_DIFFICULTY.Easy,
        devComponent: SummationDev,
        solutionComponent: SummationSoln,
        icon: SquareSigma
    }
]

export function getProblemById(id: string): ProblemEntry | undefined {
    const res = problems.find(item => item.id === id)

    return res ? {
        ...res,
        url: `/${res.difficulty}/${toHyphenCase(res.title)}`
    } : undefined
}

export function getProblemsByDifficulty(difficulty: PROBLEM_DIFFICULTY): ProblemEntry[] {
    return problems
        .filter((item) => item.difficulty === difficulty)
        .map(prob => {
            return {
                ...prob,
                url: `/${prob.difficulty}/${toHyphenCase(prob.title)}`
            }
        })
}