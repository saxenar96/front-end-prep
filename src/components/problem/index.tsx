import { Children, useEffect, useState } from "react";
import { ProblemProps } from "./config";
import './index.css';
import { ProblemCard } from "./problemCard";

export default function Problem(props: ProblemProps) {
    const { title, description } = props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ devComponent, setDevComponent ] = useState<any>(undefined)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ solnComponent, setSolnComponent ] = useState<any>(undefined)

    useEffect(() => {
        Children.forEach(props.children, (child, index) => {
            if (index === 0) {
                setDevComponent(child)
            } else if (index === 1) {
                setSolnComponent(child)
            }
        })
    }, [props.children])
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
                >
                    <div className="problem-space">{devComponent}</div>
                </ProblemCard>
                <ProblemCard
                    title='Solution'
                    description="The expected output from the problem"
                    key='problem_card_soln'
                >
                    <div className="problem-space">{solnComponent}</div>
                </ProblemCard>
            </div>
        </div>
    )
}