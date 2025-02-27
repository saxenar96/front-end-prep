import { PROBLEM_DIFFICULTY, PROBLEM_TYPES, ProblemEntry, ProblemInfo } from "@/types/problem";
import { SummationSoln, CounterSoln } from "@/app/problems"; 
import WordleSoln from '@/app/problems/wordle/soln'
import TransferListSoln from '@/app/problems/transfer-list/soln'
import TrafficLightSoln from '@/app/problems/traffic-light/soln'
import ImageCarouselSoln from '@/app/problems/image-carousel/soln'
import FileExplorerSoln from '@/app/problems/file-explorer/soln'
import AccordionSoln from '@/app/problems/accordion/soln'
import { ListCollapse, WholeWord, FolderSync, FolderOpen, Images, OctagonMinus, SquareSigma, Plus } from "lucide-react";
import { toKebabCase } from "@/utils/cases";

const problems: ProblemInfo[] = [
    {
        id: 'summation',
        title: 'Summation',
        difficulty: PROBLEM_DIFFICULTY.Easy,
        solutionComponent: SummationSoln,
        problemType: PROBLEM_TYPES.React,
        estimatedCompletionTime: 10,
        icon: SquareSigma,
    },
    {
        id: 'counter',
        title: 'Counter',
        difficulty: PROBLEM_DIFFICULTY.Easy,
        solutionComponent: CounterSoln,
        problemType: PROBLEM_TYPES.React,
        estimatedCompletionTime: 5,
        icon: Plus,
    },
    {
        id: 'wordle',
        title: 'Wordle',
        difficulty: PROBLEM_DIFFICULTY.Hard,
        solutionComponent: WordleSoln,
        problemType: PROBLEM_TYPES.React,
        estimatedCompletionTime: 45,
        icon: WholeWord,
    },
    {
        id: 'transfer-list',
        title: 'Transfer List',
        difficulty: PROBLEM_DIFFICULTY.Medium,
        solutionComponent: TransferListSoln,
        problemType: PROBLEM_TYPES.React,
        estimatedCompletionTime: 30,
        icon: FolderSync,
    },
    {
        id: 'traffic-light',
        title: 'Traffic Light',
        difficulty: PROBLEM_DIFFICULTY.Medium,
        solutionComponent: TrafficLightSoln,
        problemType: PROBLEM_TYPES.React,
        estimatedCompletionTime: 20,
        icon: OctagonMinus,
    },
    {
        id: 'image-carousel',
        title: 'Image Carousel',
        difficulty: PROBLEM_DIFFICULTY.Medium,
        solutionComponent: ImageCarouselSoln,
        problemType: PROBLEM_TYPES.React,
        estimatedCompletionTime: 20,
        icon: Images,
    },
    {
        id: 'file-explorer',
        title: 'File Explorer',
        difficulty: PROBLEM_DIFFICULTY.Medium,
        solutionComponent: FileExplorerSoln,
        problemType: PROBLEM_TYPES.React,
        estimatedCompletionTime: 20,
        icon: FolderOpen,
    },
    {
        id: 'accordion',
        title: 'Accordion',
        difficulty: PROBLEM_DIFFICULTY.Easy,
        solutionComponent: AccordionSoln,
        problemType: PROBLEM_TYPES.React,
        estimatedCompletionTime: 15,
        icon: ListCollapse,
    },
]

export function getProblemById(id: string): ProblemEntry | undefined {
    const res = problems.find(item => item.id === id)

    return res ? {
        ...res,
        url: `/${res.difficulty}/${toKebabCase(res.title)}`
    } : undefined
}

export function getProblemsByDifficulty(difficulty?: PROBLEM_DIFFICULTY): ProblemEntry[] {
    if (!difficulty) {
        return problems.map(prob => {
            return {
                ...prob,
                url: `/${prob.difficulty}/${toKebabCase(prob.title)}`
            }
        })
    }

    return problems
        .filter((item) => item.difficulty === difficulty)
        .map(prob => {
            return {
                ...prob,
                url: `/${prob.difficulty}/${toKebabCase(prob.title)}`
            }
        })
}