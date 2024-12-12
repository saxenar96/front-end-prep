/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ProblemDescriptionBlock {
    header?: string;
    content?: string[];
}

export interface ProblemProps {
    title: string;
    description: string;
    solnComponent: () => JSX.Element;
    tags?: string[];
}

export interface TabProps {
    title: string;
    description: string;
    component?: () => JSX.Element;
}

export interface ProblemCardProps {
    title?: string;
    description?: string;
    component: () => JSX.Element;
}