'use client'

import Problem from "@/components/problem";
import Dev from "./dev/dev";
import Soln from "./soln/soln";
import { ProblemDescriptionBlock } from "@/components/problem/config";

export default function Counter() {
    const description: ProblemDescriptionBlock[] = [
        {
            header: 'Description',
            content: [
                'In this problem, you will be creating a simple counter. You need to build a button that, when clicked, will increment the count value of the component.',
                'The count value will be shown above the button.'
            ]
        },
        {
            header: 'Style requirements',
            content: [
                'All elements should be centered',
                'The button should have a background color of #64748B and border radius of 8px',
                'The value text should have a font size of 24px and be bolded'
            ]
        }
    ]
    return (
        <Problem
            title="Counter"
            description={description}
        >
            <Dev />
            <Soln />
        </Problem>
    )
}