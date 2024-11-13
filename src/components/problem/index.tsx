'use client'

import { useEffect } from "react";
import { ProblemProps } from "./config";
import './index.css';
import { ProblemCard } from "./problemCard";

export default function Problem(props: ProblemProps) {
    const { title, description, devComponent: Dev, solnComponent: Soln } = props

    return(
        <div className='problem'>
            <div className='problem-desc rounded-xl border bg-card text-card-foreground shadow'>
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
            </div>
            <div className='flex flex-col gap-[16px]'>
                <ProblemCard
                    title='Your Output'
                    description="The output of your code for this problem"
                    key='problem_card_dev'
                    component={Dev}
                />
                <ProblemCard
                    title='Solution'
                    description="The expected output from the problem"
                    key='problem_card_soln'
                    component={Soln}
                />
            </div>
        </div>
    )
}