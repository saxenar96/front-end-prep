import { CodeEditor } from "@/components/codeEditor";
import { defaultCodeSnippet } from "@/components/codeEditor/const";
import { PanelButtonProps, PanelTabProps } from "@/components/panel/config";
import { ProblemProps } from "@/components/problem/config";
import { ProblemTab } from "@/components/problem/problemTab";
import { generateUniqueClassName, injectScopedCSS } from "@/utils/executeCode";
import { Editor } from "@monaco-editor/react";
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

const editorOptions = {
    minimap: {
        enabled: false
    }
}

export function useProblem(problemProps: ProblemProps) {
    const { title, description, solnComponent: Soln } = problemProps
    const [localStorageProblemKey] = useState(`${title}_FE_Prep`)
    const [localStorageProblemCSSKey] = useState(`${title}_FE_Prep_CSS`)

    const [ problemTabs, setProblemTabs ] = useState<PanelTabProps[]>([])
    const [ codeTabs, setCodeTabs ] = useState<PanelTabProps[]>([])
    const [ outputTabs, setOutputTabs ] = useState<PanelTabProps[]>([])

    const [ codeString, setCodeString ] = useState(localStorage.getItem(localStorageProblemKey) || defaultCodeSnippet)
    const [ codeContent, setCodeContent ] = useState<JSX.Element | null>(null)

    const [ cssString, setCssString ] = useState(localStorage.getItem(localStorageProblemCSSKey) || '')
    
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
                content:  (
                    <ReactMarkdown className="prose markdown-body">
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
                    <div className='flex flex-col gap-[16px] w-full min-w-[490px] h-full'>
                        <Editor
                            height="100%"
                            language="javascript"
                            value={codeString}
                            onChange={(value) => setCodeString(value ?? '')}
                            options={editorOptions}
                        />
                    </div>
                )
            },
            {
                id: "user_css",
                title: "index.css",
                content:  (
                    <div className='flex flex-col gap-[16px] w-full min-w-[490px] h-full'>
                        <Editor
                            height="100%"
                            language="css"
                            value={cssString}
                            onChange={(value) => setCssString(value ?? '')}
                            options={editorOptions}
                        />
                    </div>
                )
            }
        ])
    }, [])

    useEffect(() => {
        setOutputTabs([
            {
                id: "output",
                title: "Output",
                content:  codeContent ? (<div className={uniqueClassName}>{codeContent}</div>) : (<>No Output</>)
            }
        ])
    }, [codeContent])

    const saveInLocalStorage = (codeVal: string) => {
        localStorage.setItem(localStorageProblemKey, codeVal)
    }

    useEffect(() => {
        saveInLocalStorage(codeString)
    }, [codeString])

    return {problemTabs, codeTabs, outputTabs, codeString, codeContent, setCodeContent, cssString, runs, setRuns}
}