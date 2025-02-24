'use client'

import { useState, useEffect, ReactElement, useCallback, useMemo } from "react";
import { ProblemProps } from "./config";
import './index.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProblemTab } from "./problemTab";
import { executeCode } from "@/utils/executeCode";
import { CodeEditor } from "../codeEditor";
import { defaultCodeSnippet } from "../codeEditor/const";
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import { Card, CardContent } from "../ui/card";
import { Panel } from "../panel";
import { PanelButtonProps, PanelTabProps } from "../panel/config";
import { useProblem } from "@/hooks/use-problem";
import { OutputView } from "../output";

export default function Problem(props: ProblemProps) {
    const { title, description, solnComponent: Soln } = props
    const { codeString, codeContent, setCodeContent, problemTabs, codeTabs, outputTabs } = useProblem(props)
    const [ codeButtons, setCodeButtons ] = useState<PanelButtonProps[]>([])
    const [ runs, setRuns ] = useState(0)

    const MyComponent = useMemo(() => executeCode(codeString), [runs]);
    
    useEffect(() => {
        if (MyComponent) {
            setCodeContent(<MyComponent />);
        }
    }, [MyComponent]);

    const onRun = useCallback(() => {
        setRuns(prev => prev + 1)
    }, [setRuns])
    
    useEffect(() => {
        setCodeButtons([
            {
                title: "Run",
                onClick: onRun
            }
        ])
    }, [onRun])

    return(
        <div className='problem'>
            {
                (description && description !== '') ? (
                    <Panel
                        tabs={problemTabs}
                        actions={[]}
                    />
                ) : (<div>Loading...</div>)
            }
            <Panel
                tabs={codeTabs}
                actions={codeButtons}
            />
            <Panel
                tabs={outputTabs}
                actions={[]}
            />
        </div>
    )
}