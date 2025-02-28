import { CodeEditor } from "@/components/codeEditor";
import { CodeEditorLanguages } from "@/components/codeEditor/config";
import { defaultCodeSnippet } from "@/components/codeEditor/const";
import ErrorBoundary from "@/components/errorBoundary/errorBoundary";
import { PanelTabProps } from "@/components/panel/config";
import { ProblemProps } from "@/components/problem/config";
import { ProblemTab } from "@/components/problem/problemTab";
import { generateUniqueClassName, injectScopedCSS } from "@/utils/executeCode";
import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function useProblem(problemProps: ProblemProps) {
    const { title, description, solnComponent: Soln, difficulty, estimatedCompletionTime, problemType } = problemProps

    const [ problemTabs, setProblemTabs ] = useState<PanelTabProps[]>([])
    const [ codeTabs, setCodeTabs ] = useState<PanelTabProps[]>([])
    const [ outputTabs, setOutputTabs ] = useState<PanelTabProps[]>([])

    const [ codeString, setCodeString ] = useState('')
    const [ codeContent, setCodeContent ] = useState<JSX.Element | null>(null)

    const [ cssString, setCssString ] = useState('')
    
    const [ runs, setRuns ] = useState(0)

    // Generate a unique class name for the dynamic component
    const uniqueClassName = useMemo(() => generateUniqueClassName(), []);

    // Inject scoped CSS into the document
    useEffect(() => {
        injectScopedCSS(cssString, uniqueClassName);
    }, [runs, uniqueClassName]);

    useEffect(() => {
        setProblemTabs([
            {
                id: "description",
                title: "Description",
                additionalDetails: {
                    problemTitle: title,
                    difficulty,
                    problemType,
                    estimatedCompletionTime
                },
                content:  (
                    <ReactMarkdown
                        className="prose markdown-body"
                        remarkPlugins={[remarkGfm]}                
                    >
                        { description }
                    </ReactMarkdown>
                )
            },
            {
                id: "solution",
                title: "Solution",
                content:  (
                    <ProblemTab
                        title='Solution'
                        description="The expected output from the problem"
                        key='problem_card_soln'
                        component={Soln}
                    />
                )
            }
        ])
    }, [description, Soln])

    useEffect(() => {
        setCodeTabs([
            {
                id: "user_code",
                title: "App.jsx",
                content:  (
                    <CodeEditor
                        defaultCode={defaultCodeSnippet}
                        language={CodeEditorLanguages.JS}
                        onDevCodeChange={(val) => setCodeString(val)}
                        localStorageKey={`${title}_FE_Prep`}
                    />
                )
            },
            {
                id: "user_css",
                title: "index.css",
                content:  (
                    <CodeEditor
                        defaultCode={''}
                        language={CodeEditorLanguages.CSS}
                        onDevCodeChange={(val) => setCssString(val)}
                        localStorageKey={`${title}_FE_Prep_CSS`}
                    />
                )
            }
        ])
    }, [])

    useEffect(() => {
        setOutputTabs([
            {
                id: "output",
                title: "Output",
                content:  codeContent ? (
                    <ErrorBoundary resets={runs}>
                        <div className={uniqueClassName}>{codeContent}</div>
                    </ErrorBoundary>
                ) : (<>No Output</>)
            }
        ])
    }, [codeContent, runs])

    return {problemTabs, codeTabs, outputTabs, codeString, codeContent, setCodeContent, cssString, runs, setRuns}
}