/* eslint-disable @typescript-eslint/no-explicit-any */

import { PROBLEM_DIFFICULTY, PROBLEM_TYPES } from "@/types/problem";

export interface ProblemDescriptionBlock {
    header?: string;
    content?: string[];
}

export interface ProblemProps {
    title: string;
    description: string;
    solnComponent: () => JSX.Element;
    difficulty: PROBLEM_DIFFICULTY;
    problemType: PROBLEM_TYPES;
    estimatedCompletionTime?: number;
}

export interface TabProps {
    title?: string;
    description?: string;
    component?: () => JSX.Element;
}

export interface ProblemCardProps {
    title?: string;
    description?: string;
    component: () => JSX.Element;
}