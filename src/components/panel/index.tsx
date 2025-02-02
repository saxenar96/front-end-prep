'use client'

import { useState, useEffect, act } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { PanelProps, PanelTabProps } from "./config";
import './index.css'
import { Button } from "../ui/button";

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
        <div className='problem-desc rounded-xl border bg-card text-card-foreground shadow'>
            <div className="toolbar">
                <Tabs
                    value={currentTab}
                    onValueChange={(selectedTab) => setCurrentTab(selectedTab)}
                >
                    <TabsList className="mb-[24px]">
                        {
                            tabTitles.map(tabName => (
                                <TabsTrigger key={tabName} value={tabName}>{tabName}</TabsTrigger>
                            ))
                        }
                    </TabsList>
                    {/* {
                        tabTitles.map((tab: string, index) => (
                            <TabsContent key={`problem-tab-${index}`} value={tab}>
                                { tabMap.get(tab)?.content }
                            </TabsContent>
                        ))
                    } */}
                </Tabs>
                <div className="actionbar">
                    {
                        actions.map(action => (
                            <Button onClick={action.onClick}>{action.title}</Button>
                        ))
                    }
                </div>
            </div>
            <div>
                {tabMap.get(currentTab)?.content}
            </div>
        </div>
    )
}