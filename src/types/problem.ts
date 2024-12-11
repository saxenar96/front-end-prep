/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProblemDescriptionBlock } from "@/components/problem/config";

export enum PROBLEM_DIFFICULTY {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
}

export enum DIFFICULTY_TITLES {
    'easy' = 'Easy',
    'medium' = 'Medium',
    'hard' = 'Hard'
}

export const difficultyList = [PROBLEM_DIFFICULTY.Easy, PROBLEM_DIFFICULTY.Medium, PROBLEM_DIFFICULTY.Hard]

export interface ProblemInfo {
    id: string;
    title: string;
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