import React from 'react';
import { PanelTabAdditionalDetailsProps } from "./config";
import { Clock, BicepsFlexed, Atom, Code } from 'lucide-react';
import { PROBLEM_TYPES } from '@/types/problem';

export function DetailsBar(props: Partial<PanelTabAdditionalDetailsProps>) {
    return (
        <div className='w-full flex justify-between py-2'>
            <div className='flex gap-2'>
                <BicepsFlexed />
                { props.difficulty }
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