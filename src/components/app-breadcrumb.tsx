'use client'

import React, { useEffect, useState } from 'react'
import { kebabToPascalWithSpaces } from "@/utils/cases"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./ui/breadcrumb"
import { usePathname } from "next/navigation"

export function AppBreadcrumb() {
    const pathname = usePathname()
    const [pathFragments, setPathFragments] = useState<string[]>([])

    useEffect(() => {
        const fragments = pathname.split('/')
        setPathFragments(fragments.slice(1))
    }, [pathname])

    return pathname !== '/home' ? (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    (pathFragments.length > 0 && pathname !== '/home') && (
                        <>
                            <BreadcrumbItem key={`nav-path-item-home`} className="hidden md:block">
                                <BreadcrumbLink key={`nav-path-item-home-link`} href={`/home`}>
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator key={`home-sep`} className="hidden md:block" />
                        </>
                    )
                }
                {
                    pathFragments.map((path, index) => {
                        return (
                            <>
                                <BreadcrumbItem key={`nav-path-item-${path}-${index}`} className="hidden md:block">
                                    <BreadcrumbLink key={`nav-path-item-${path}-${index}-link`} href={`/${pathFragments.slice(0, index + 1).join('/')}`}>
                                    { kebabToPascalWithSpaces(path) }
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {
                                    index !== pathFragments.length - 1 && (
                                    <BreadcrumbSeparator key={`sep-${index}`} className="hidden md:block" />
                                    )
                                }
                            </>
                        )
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>
    ) : (<></>)
}