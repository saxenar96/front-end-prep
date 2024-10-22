import { useState } from 'react'
import './index.css'

export default function Soln() {
    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount(count + 1)
    }
    return (
        <div className='container'>
            <h1>{ count }</h1>
            <button onClick={handleClick}>Increment</button>
        </div>
    )
}