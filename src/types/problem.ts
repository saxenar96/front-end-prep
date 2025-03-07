/* eslint-disable @typescript-eslint/no-explicit-any */
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
    problemType: PROBLEM_TYPES;
    estimatedCompletionTime?: number; // Number in minutes
    icon?: any;
}

export interface ProblemEntry extends ProblemInfo {
    url: string
}

export enum PROBLEM_TYPES {
    All = 'All',
    Javascript = 'Javascript',
    React = 'React'
}