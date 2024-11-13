/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProblemDescriptionBlock } from "@/components/problem/config";

export enum PROBLEM_DIFFICULTY {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard'
}

export const difficultyList = [PROBLEM_DIFFICULTY.Easy, PROBLEM_DIFFICULTY.Medium, PROBLEM_DIFFICULTY.Hard]

export interface ProblemInfo {
    id: string;
    title: string;
    content: ProblemDescriptionBlock[];
    difficulty: PROBLEM_DIFFICULTY;
    solutionComponent: () => JSX.Element;
    devComponent: () => JSX.Element;
    icon?: any;
}

export interface ProblemEntry extends ProblemInfo {
    url: string
}

export interface ProblemContextValue {
    dev?: () => JSX.Element;
    soln?: () => JSX.Element;
}