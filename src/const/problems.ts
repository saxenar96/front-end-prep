import { PROBLEM_DIFFICULTY, ProblemEntry, ProblemInfo } from "@/types/problem";
// import { CounterDev, CounterSoln } from "@/app/problems/Counter";
import CounterDev from '@/app/problems/Counter/dev'
import CounterSoln from '@/app/problems/Counter/soln'
import { Plus } from "lucide-react";
import { toHyphenCase } from "@/utils/cases";

const problems: ProblemInfo[] = [
    {
        id: '1',
        title: 'Counter',
        content: [
            {
                header: 'Description',
                content: [
                    'In this problem, you will be creating a simple counter. You need to build a button that, when clicked, will increment the count value of the component.',
                    'The count value will be shown above the button.'
                ]
            },
            {
                header: 'Style requirements',
                content: [
                    'All elements should be centered',
                    'The button should have a background color of #64748B and border radius of 8px',
                    'The value text should have a font size of 24px and be bolded'
                ]
            }
        ],
        difficulty: PROBLEM_DIFFICULTY.Easy,
        devComponent: CounterDev,
        solutionComponent: CounterSoln,
        icon: Plus
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