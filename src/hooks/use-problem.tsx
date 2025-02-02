import { CodeEditor } from "@/components/codeEditor";
import { defaultCodeSnippet } from "@/components/codeEditor/const";
import { PanelButtonProps, PanelTabProps } from "@/components/panel/config";
import { ProblemProps } from "@/components/problem/config";
import { ProblemTab } from "@/components/problem/problemTab";
import { renderComponentFromString } from "@/utils/executeCode";
import { Editor } from "@monaco-editor/react";
import { ReactElement, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export function useProblem(problemProps: ProblemProps) {
    const { title, description, solnComponent: Soln } = problemProps
    const [localStorageProblemKey] = useState(`${title}_FE_Prep`)
    const [localStorageProblemCSSKey] = useState(`${title}_FE_Prep_CSS`)

    const [ problemTabs, setProblemTabs ] = useState<PanelTabProps[]>([])
    const [ codeTabs, setCodeTabs ] = useState<PanelTabProps[]>([])
    const [ outputTabs, setOutputTabs ] = useState<PanelTabProps[]>([])

    const [ codeButtons, setCodeButtons ] = useState<PanelButtonProps[]>([])

    const [ codeString, setCodeString ] = useState(localStorage.getItem(localStorageProblemKey) || defaultCodeSnippet)
    const [ codeContent, setCodeContent ] = useState<ReactElement | null>(null)

    const [ cssString, setCssString ] = useState(localStorage.getItem(localStorageProblemCSSKey) || '')
    
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
                    <div className='flex flex-col gap-[16px] w-full min-w-[490px]'>
                        <Editor
                            height="75vh"
                            defaultLanguage="javascript"
                            value={codeString}
                            onChange={(value) => setCodeString(value ?? '')}
                        />
                    </div>
                )
            },
            {
                id: "user_css",
                title: "index.css",
                content:  (
                    <div className='flex flex-col gap-[16px] w-full min-w-[490px]'>
                        <Editor
                            height="75vh"
                            defaultLanguage="css"
                            value={cssString}
                            onChange={(value) => setCssString(value ?? '')}
                        />
                    </div>
                )
            }
        ])

        setCodeButtons([
            {
                title: "Run",
                onClick: () => {
                    const content = renderComponentFromString(codeString)
                    if (content) {
                        setCodeContent(content)
                    }
                }
            }
        ])
    }, [])

    useEffect(() => {
        setOutputTabs([
            {
                id: "output",
                title: "Output",
                content:  codeContent ? (
                    <ProblemTab
                        title='Solution'
                        description="The expected output from the problem"
                        key='problem_card_soln'
                        component={codeContent}
                    />
                ) : (<>No Output</>)
            }
        ])
    }, [codeContent])

    const saveInLocalStorage = (codeVal: string) => {
        localStorage.setItem(localStorageProblemKey, codeVal)
    }

    useEffect(() => {
        saveInLocalStorage(codeString)
    }, [codeString])

    return {problemTabs, codeTabs, outputTabs, codeButtons, codeString, codeContent}
}