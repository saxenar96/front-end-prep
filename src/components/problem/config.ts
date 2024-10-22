import { ReactNode } from "react";

export interface ProblemDescriptionBlock {
    header?: string;
    content?: string[];
}

export interface ProblemProps {
    children: ReactNode;
    title: string;
    description: ProblemDescriptionBlock[];
    tags?: string[];
}

export interface ProblemCardProps {
    title: string;
    description?: string;
    children: ReactNode;
}