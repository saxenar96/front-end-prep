'use client'

import { useState, useEffect, ReactElement } from "react";
import { ProblemProps } from "./config";
import './index.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SolutionTab from "./problemTab";
import { renderComponentFromString } from "@/utils/executeCode";
import { CodeEditor } from "../codeEditor";
import { defaultCodeSnippet } from "../codeEditor/const";
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import { Card, CardContent } from "../ui/card";

const problemTabs = ['Description', 'Output', 'Solution']

interface TabMapType {
    [key: string]: JSX.Element
}

export default function Problem(props: ProblemProps) {
    const { title, description, solnComponent: Soln } = props
    const [ leftTab, setLeftTab ] = useState(problemTabs[0])
    const localStorageProblemKey = `${title}_FE_Prep`

    const [ codeString, setCodeString ] = useState(localStorage.getItem(localStorageProblemKey) || defaultCodeSnippet)
    const [ codeContent, setCodeContent ] = useState<ReactElement | null>(null)

    const updateCurrentTab = (data: string) => {
        setLeftTab(data)
    }

    const tabMap: TabMapType = {
        'Description': (
            <ReactMarkdown className="prose markdown-body">
                { description }
            </ReactMarkdown>
        ),
        'Solution': (
            <SolutionTab
                title='Solution'
                description="The expected output from the problem"
                key='problem_card_soln'
                component={Soln}
            />
        ),
        'Output': (
            <Card>
                <CardContent>
                    {codeContent}
                </CardContent>
            </Card>
        )
    }

    useEffect(() => {
        saveInLocalStorage(codeString)
        const content = renderComponentFromString(codeString)
        if (content) {
            setCodeContent(content)
            setLeftTab(problemTabs[1])
        }
    }, [codeString])

    const saveInLocalStorage = (codeVal: string) => {
        localStorage.setItem(localStorageProblemKey, codeVal)
    }

    const handleDevCodeChange = (code: string) => {
        setCodeString(code)
    }

    useEffect(() => {
        setLeftTab(problemTabs[0])
    }, [])

    return(
        <div className='problem'>
            <div className='problem-desc rounded-xl border bg-card text-card-foreground shadow'>
                <Tabs
                    value={leftTab}
                    onValueChange={updateCurrentTab}
                >
                    <TabsList className="mb-[24px]">
                        {
                            problemTabs.map(tabName => (
                                <TabsTrigger key={tabName} value={tabName}>{tabName}</TabsTrigger>
                            ))
                        }
                    </TabsList>
                    {
                        problemTabs.map((tab: string, index) => (
                            <TabsContent key={`problem-tab-${index}`} value={tab}>
                                { tabMap[tab] }
                            </TabsContent>
                        ))
                    }
                </Tabs>
            </div>
            <div className='flex flex-col gap-[16px] w-full min-w-[490px]'>
                <CodeEditor
                    defaultCode={codeString}
                    onDevCodeChange={handleDevCodeChange}
                />
            </div>
        </div>
    )
}