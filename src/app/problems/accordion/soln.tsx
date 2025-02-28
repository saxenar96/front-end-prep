'use client'

import { useState } from 'react'
import './soln.css'
import { ChevronDown, ChevronUp } from 'lucide-react'

const data = [
    {
        title: 'Iron Man',
        description: `Iron Man is a genius inventor in high-tech armor, using his suit's advanced weaponry and flight capabilities to fight crime and protect the world as a superhero.`
    },
    {
        title: 'Captain America',
        description: `Captain America is a super-soldier with enhanced strength, agility, and an indestructible shield, embodying courage, leadership, and justice as a symbol of hope and freedom.`
    },
    {
        title: 'Thor',
        description: `Thor is the Norse God of Thunder, wielding the mighty hammer Mjolnir to protect Asgard and Earth with his immense strength, lightning powers, and heroic valor.`
    },
]

export default function Soln(): JSX.Element {
    return (
        <div className='flex flex-col gap-4'>
            {
                data.map((item, index) => {
                    return (
                        <AccordionItem key={`item-${index}`} title={item.title} description={item.description} />
                    )
                })
            }
        </div>
    )
}

function AccordionItem(props: {title: string, description: string}): JSX.Element {
    const {title, description} = props
    const [expanded, setExpanded] = useState(false)
    return (
        <div>
            <div
                className='flex justify-between items-center border-b-[1px] border-solid border-black hover:cursor-pointer'
                onClick={() => setExpanded((prev) => !prev)}
            >
                <h3>{title}</h3>
                {
                    expanded ? (
                        <div>-</div>
                    ) : (
                        <div>+</div>
                    )
                }
            </div>
            {
                expanded && (
                    <h4>{description}</h4>
                )
            }
        </div>
    )
}