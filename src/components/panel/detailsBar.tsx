import React, { useState } from 'react';
import { PanelTabAdditionalDetailsProps } from "./config";
import { Clock, BicepsFlexed, Atom, Code } from 'lucide-react';
import { PROBLEM_TYPES } from '@/types/problem';

function cleanDiffString(str?: string): string | undefined {
    return str !== undefined ? str.charAt(0).toUpperCase() + String(str).slice(1) : undefined
}

export function DetailsBar(props: Partial<PanelTabAdditionalDetailsProps>) {
    const [difficultyString ] = useState<string | undefined>(cleanDiffString(props.difficulty))
    return (
        <div className='w-full flex gap-16 py-2'>
            <div className='flex gap-2'>
                <BicepsFlexed />
                { difficultyString }
            </div>
            <div className='flex gap-2'>
                <Clock />
                { props.estimatedCompletionTime } min
            </div>
            {
                props.problemType && (
                    <div className='flex gap-2'>
                        {
                            props.problemType === PROBLEM_TYPES.Javascript ? (
                                <>
                                    <Code />
                                    { PROBLEM_TYPES.Javascript }
                                </>
                            ) : (
                                <>
                                    <Atom />
                                    { PROBLEM_TYPES.React }
                                </>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}