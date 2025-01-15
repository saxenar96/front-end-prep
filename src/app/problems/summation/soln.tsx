'use client'

import { Button } from '@/components/ui/button'
import './soln.css'
import {useState} from 'react'

export default function Soln(): JSX.Element {
    const [sum, setSum] = useState(0)
    const [input, setInput] = useState<number | undefined>()
    const [nums, setNums] = useState<number[]>([])

    const handleSubmit = () => {
        if (input) {
            setSum((prev) => prev + input)
            setNums((prev) => [...prev, input])
            setInput(0)
        }
    }

    const deleteItem = (index: number) => {
        const newNums = [...nums]
        const removed = newNums.splice(index, 1)
        setNums([...newNums])
        setSum(prev => prev - removed[0])
    }

    return (
        <div className='wrapper'>
            <h1>{sum}</h1>
            <div className='form'>
                <input value={input} type="number" onChange={(e) => setInput(parseInt(e.target.value))} />
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
            <div className='item-wrapper'>
                {
                    nums.map((item, index) => (
                        <div
                            key={`item-${index}`}
                            className='item'
                            onClick={() => deleteItem(index)}
                        >
                            {item}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}