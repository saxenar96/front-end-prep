import { PROBLEM_DIFFICULTY, PROBLEM_TYPES } from "@/types/problem";

export interface PanelTabProps {
    id: string
    title: string
    content: JSX.Element
    additionalDetails?: Partial<PanelTabAdditionalDetailsProps>
}

export interface PanelTabAdditionalDetailsProps {
    difficulty: PROBLEM_DIFFICULTY;
    problemType: PROBLEM_TYPES;
    problemTitle: string;
    estimatedCompletionTime?: number;
}

export interface PanelButtonProps {
    title: string
    url?: string
    onClick?: (...args: unknown[]) => void
}

export interface PanelProps {
    tabs: PanelTabProps[]
    actions: PanelButtonProps[]
    large?: boolean
}