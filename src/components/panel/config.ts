export interface PanelTabProps {
    id: string
    title: string
    content: JSX.Element
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