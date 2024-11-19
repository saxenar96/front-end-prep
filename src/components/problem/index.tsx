'use client'

import { useState, useEffect, ReactElement } from "react";
import { ProblemProps } from "./config";
import './index.css';
import { ProblemCard } from "./problemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SolutionTab from "./problemTab";

const problemTabs = ['Description', 'Output', 'Solution', 'Editorial']

export default function Problem(props: ProblemProps) {
    const { title, description, devComponent: Dev, solnComponent: Soln } = props
    const [ leftTab, setLeftTab ] = useState(problemTabs[0])
    const [ leftTabContent, setLeftTabContent ] = useState<ReactElement | null>(null)

    const updateCurrentTab = (data: string) => {
        setLeftTab(data)
    }

    useEffect(() => {
        let content = null
        switch(leftTab) {
            case 'Description':
                content = (
                    <>
                        <h1>{ title }</h1>
                        {
                            description.map((block, index) => {
                                const {header, content} = block
                                return (
                                    <>
                                        {header && (<h2 className='my-4'>{header}</h2>)}
                                        {content?.map(text => (<h3 key={`desc_${index}`}>{ text }</h3>))}
                                    </>
                                )
                            })
                        }
                    </>
                )
                break;
            case 'Solution':
                content = (
                    <SolutionTab
                        title='Solution'
                        description="The expected output from the problem"
                        key='problem_card_soln'
                        component={Soln}
                    />
                )
                break;
            default:
                content = (
                    <>Something Else</>
                )
        }

        setLeftTabContent(content)
    }, [leftTab])

    return(
        <div className='problem'>
            <div className='problem-desc rounded-xl border bg-card text-card-foreground shadow'>
                <Tabs
                    value={leftTab}
                    onValueChange={updateCurrentTab}
                >
                    <TabsList>
                        {
                            problemTabs.map(problem => (
                                <TabsTrigger value={problem}>
                                    <TabsContent value={leftTab}>
                                        { problem }
                                    </TabsContent>
                                </TabsTrigger>
                            ))
                        }
                    </TabsList>
                </Tabs>
                { leftTabContent }
            </div>
            <div className='flex flex-col gap-[16px] w-full min-w-[490px]'>
                <ProblemCard
                    title='Your Output'
                    description="The output of your code for this problem"
                    key='problem_card_dev'
                    component={Dev}
                />
            </div>
        </div>
    )
}