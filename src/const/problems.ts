import { PROBLEM_DIFFICULTY, ProblemEntry, ProblemInfo } from "@/types/problem";
// import { CounterDev, CounterSoln } from "@/app/problems/Counter";
import CounterDev from '@/app/problems/Counter/dev'
import CounterSoln from '@/app/problems/Counter/soln'
import SummationDev from '@/app/problems/Summation/dev'
import SummationSoln from '@/app/problems/Summation/soln'
import { Plus, SquareSigma } from "lucide-react";
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
    },
    {
        id: '2',
        title: 'Summation',
        content: [
            {
                header: 'Description',
                content: [
                    'In this problem, you will displaying the sum of a list of elements.',
                'The user will have an option to enter a number in a text field. When they click ENTER, you must display the item in the list under the input. When a new item is added to the list, the sum value should be updated to reflect that value',
                'Each item in the list also has a button to delete it. After deleting an item, that value should be subtracted from the total sum.'
                ]
            },
            {
                header: 'Style requirements',
                content: [
                    'Each item in the list should have a border around it with a padding of 4px. And delete button (indicated by an X), to the right side',
                    'The items should be rendered in vertical columns. Each column may consist of 5 items. After 5, render the next item in a new columns.',
                    'The value text should be centered, have a font size of 24px, and be bolded'
                ]
            }
        ],
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