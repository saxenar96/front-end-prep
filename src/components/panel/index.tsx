'use client'

import { useState, useEffect, act } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { PanelProps, PanelTabProps } from "./config";
import './index.css'
import { Button } from "../ui/button";
import { DetailsBar } from "./detailsBar";

function getTabMap(tabs: PanelTabProps[]) {
    const map = new Map()
    for (const t of tabs) {
        map.set(t.title, t)
    }
    return map
}

export function Panel(props: PanelProps) {
    const { tabs, actions } = props
    const [ tabMap, setTabMap ] = useState<Map<string, PanelTabProps>>(getTabMap(tabs))
    const [ tabTitles, setTabTitles ] = useState<string[]>([])
    const [ currentTab, setCurrentTab ] = useState(tabTitles[0])
    const [ currentTabData, setCurrentTabData ] = useState<JSX.Element>(tabs[0]?.content)

    useEffect(() => {
        setTabMap(getTabMap(tabs))
    }, [tabs])

    useEffect(() => {
        setTabTitles(Array.from(tabMap.keys()))
    }, [tabMap])

    useEffect(() => {
        setCurrentTab(tabTitles[0])
    }, [tabTitles])

    useEffect(() => {
        setCurrentTabData(tabMap.get(currentTab)?.content ?? tabs[0]?.content)
    }, [currentTab, tabMap, tabs])

    return (
        <div className={['problem-desc rounded-xl border bg-card text-card-foreground shadow', props.large ? 'large-panel' : ''].join(' ')}>
            <Tabs
                className="h-full w-full flex flex-col"
                value={currentTab}
                onValueChange={(selectedTab) => setCurrentTab(selectedTab)}
            >
                <div className="w-full flex justify-between">
                    <TabsList className="mb-4">
                        {
                            tabTitles.map(tabName => (
                                <TabsTrigger key={tabName} value={tabName}>{tabName}</TabsTrigger>
                            ))
                        }
                    </TabsList>
                    <div className="actionbar">
                        {
                            actions.map(action => (
                                <Button onClick={action.onClick}>{action.title}</Button>
                            ))
                        }
                    </div>
                </div>
                <div className="h-full w-full">
                    {
                        tabTitles.map(tabName => {
                            return (
                                <TabsContent className="h-full" value={tabName}>
                                    <div className="flex flex-col gap-4 h-full">
                                        {
                                            tabMap.get(currentTab)?.additionalDetails?.problemTitle && (
                                                <div className="text-4xl font-bold text-[#1F2328] pb-[1rem] border-solid border-slate-200 border-b-[1px]">
                                                    { tabMap.get(currentTab)?.additionalDetails?.problemTitle }
                                                </div>
                                            )
                                        }
                                        {
                                            tabMap.get(currentTab)?.additionalDetails && (
                                                <DetailsBar
                                                    {...tabMap.get(currentTab)?.additionalDetails}
                                                />
                                            )
                                        }
                                        {tabMap.get(currentTab)?.content}
                                    </div>
                                </TabsContent>
                            )
                        })
                    }
                </div>
            </Tabs>
        </div>
    )
}