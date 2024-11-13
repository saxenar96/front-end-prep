'use client'

import { useState, useEffect } from 'react';
import Problem from "@/components/problem";
import { getProblemById } from "@/const/problems";
import { ProblemEntry } from '@/types/problem';

export default function ProblemPage({
    params 
}: {
    params: Promise<{ id: string }>
}) {
    const [problem, setProblem] = useState<ProblemEntry | undefined>(undefined)

    useEffect(() => {
        const getId = async function() {
            const p = await params
            return p.id
        }

        getId().then(res => {
            const problemData = getProblemById(res)
            setProblem(problemData)
        })
    }, [params])

    return (
        <>
            {
                problem && (
                    <Problem
                        title={problem.title}
                        description={problem.content}
                        devComponent={problem.devComponent}
                        solnComponent={problem.solutionComponent}
                    />
                )
            }
        </>
    )
}