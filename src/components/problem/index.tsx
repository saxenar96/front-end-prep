'use client'

import { useState, useEffect, ReactElement } from "react";
import { ProblemProps } from "./config";
import './index.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProblemTab } from "./problemTab";
import { renderComponentFromString } from "@/utils/executeCode";
import { CodeEditor } from "../codeEditor";
import { defaultCodeSnippet } from "../codeEditor/const";
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import { Card, CardContent } from "../ui/card";
import { Panel } from "../panel";
import { PanelTabProps } from "../panel/config";
import { useProblem } from "@/hooks/use-problem";

export default function Problem(props: ProblemProps) {
    const { title, description, solnComponent: Soln } = props
    const { problemTabs, codeTabs, codeButtons, outputTabs } = useProblem(props)

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