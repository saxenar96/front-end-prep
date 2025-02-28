'use client'

import { useState, useEffect, useCallback, useMemo } from "react";
import { ProblemProps } from "./config";
import './index.css';
import { executeCode } from "@/utils/executeCode";
import 'github-markdown-css';
import { Panel } from "../panel";
import { PanelButtonProps } from "../panel/config";
import { useProblem } from "@/hooks/use-problem";

export default function Problem(props: ProblemProps) {
    const { description } = props
    const { codeString, setCodeContent, problemTabs, codeTabs, outputTabs, cssString, runs, setRuns } = useProblem(props)
    const [ codeButtons, setCodeButtons ] = useState<PanelButtonProps[]>([])

    const MyComponent = useMemo(() => {
        try {
            if (codeString) {
                return executeCode(codeString, cssString)
            } else {
                return undefined
            }
        } catch(e) {
            console.log('Error with code', e)
            return undefined
        }
    }, [runs]);
    
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
                large={true}
            />
            <Panel
                tabs={outputTabs}
                actions={[]}
            />
        </div>
    )
}