'use client'

import React from 'react'
import './soln.css'
import { Button } from '@/components/ui/button'

export default function Soln(): JSX.Element {
    const [count, setCount] = React.useState(0)

    return (
        <div className='wrapper'>
            <h1>{count}</h1>
            <Button onClick={() => setCount((prev) => prev + 1)}>Increment</Button>
        </div>
    )
}