export interface CodeEditorProps {
    defaultCode: string;
    language: CodeEditorLanguages;
    onDevCodeChange: (code: string) => void;
    localStorageKey: string;
}

export enum CodeEditorLanguages {
    JS = 'javascript',
    CSS = 'css'
}