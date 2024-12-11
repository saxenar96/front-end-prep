'use client'

import { useState, useEffect } from 'react';
import Problem from "@/components/problem";
import { getProblemById } from "@/const/problems";
import { ProblemEntry } from '@/types/problem';
import axios from 'axios';

export default function ProblemPage({
    params 
}: {
    params: Promise<{ difficulty: string, id: string }>
}) {
    const [problem, setProblem] = useState<ProblemEntry | undefined>(undefined)
    const [problemDesc, setProblemDesc] = useState('')

    const fetchProblemDesc = async () => {
        const p = await params
        const {id, difficulty} = p
        const res = await axios.get(`/${difficulty}/${id}/api`)
        return res.data.content
    }
    
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
    
    useEffect(() => {
        fetchProblemDesc().then((data) => {
            setProblemDesc(data)
        })
    }, [])

    return (
        <>
            {
                problem && (
                    <Problem
                        title={problem.title}
                        description={problemDesc}
                        devComponent={problem.devComponent}
                        solnComponent={problem.solutionComponent}
                    />
                )
            }
        </>
    )
}