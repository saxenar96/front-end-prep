'use client'
import { useEffect, useState } from 'react'
import './soln.css'

function NumItem(props) {
    const { num, onDelete } = props

    return (
        <div className='flex gap-4 items-center justify-center border-solid border-2 border-black p-2'>
            {num}
            <button onClick={onDelete}>X</button>
        </div>
    )
}

export default function Soln() {
    const [sum, setSum] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const [entries, setEntries] = useState([])

    const handleInputKeydown = (e) => {
        if (e.key === 'Enter') {
            const currVal = parseInt(inputValue)
            setSum(sum + currVal)

            const newEntries = [...entries]
            newEntries.push(inputValue)
            setEntries(newEntries)
            
            setInputValue('')
        }    
    }

    const deleteItem = (index) => {
        setSum(sum - entries[index])
        const newEntries = [...entries.slice(0, index), ...entries.slice(index + 1)]
        setEntries(newEntries)
    }

    return (
        <div className='container'>
            <h1>{ sum }</h1>
            <div>
                <input 
                    className='border-solid border-2 border-black p-[4px]'
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeydown}
                />
            </div>
            <div>
                {
                    entries.map((item, index) => {
                        return (
                            <NumItem
                                num={item}
                                key={`num_${index}`}
                                onDelete={() => deleteItem(index)}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}