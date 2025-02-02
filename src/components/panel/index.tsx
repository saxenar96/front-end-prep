'use client'

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { PanelProps, PanelTabProps } from "./config";
import './index.css'

function getTabMap(tabs: PanelTabProps[]) {
    const map = new Map()
    for (const t of tabs) {
        map.set(t.title, t)
    }
    return map
}

export function Panel(props: PanelProps) {
    const { tabs } = props
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
                {
                    tabTitles.map((tab: string, index) => (
                        <TabsContent key={`problem-tab-${index}`} value={tab}>
                            { tabMap.get(tab)?.content }
                        </TabsContent>
                    ))
                }
            </Tabs>
            {/* { currentTabData.content } */}
        </div>
    )
}