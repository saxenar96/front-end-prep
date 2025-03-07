'use client'

import { useEffect, useState } from 'react'
import './soln.css'
import { Button } from '@/components/ui/button'

const list1 = ['Iron Man', 'Black Panther', 'Spider-Man', 'Black Widow']
const list2 = ['Captain America', 'Ant-Man', 'Hawkeye', 'Winter Soldier']

export default function Soln(): JSX.Element {
    const [leftList, setLeftList] = useState<string[]>(list1.sort())
    const [rightList, setRightList] = useState<string[]>(list2.sort())

    const [leftTransferList, setLeftTransferList] = useState<number[]>([])
    const [rightTransferList, setRightTransferList] = useState<number[]>([])

    const removeFromList = (list: string[], removeList: number[]): string[] => {
        const newList = []
        for (let i = 0; i < list.length; i++) {
            if (!removeList.includes(i)) {
                newList.push(list[i])
            }
        }

        return newList
    }

    const addToList = (list: string[], addList: string[]) => {
        list.push(...addList)
    }

    const getList = (list: string[], indeces: number[]) => {
        const res = []
        for (const i of indeces) {
            res.push(list[i])
        }
        return res
    }

    const swap = () => {
        const newLeftList = removeFromList(leftList, leftTransferList)
        addToList(newLeftList, getList(rightList, rightTransferList))

        const newRightList = removeFromList(rightList, rightTransferList)
        addToList(newRightList, getList(leftList, leftTransferList))

        setLeftList(newLeftList.sort())
        setRightList(newRightList.sort())
    }
    
    return (
        <div className='flex items-center justify-center gap-4'>
            <CheckList
                items={leftList}
                onChange={(vals) => setLeftTransferList(vals)}
            />
            <Button onClick={swap}>Transfer</Button>
            <CheckList
                items={rightList}
                onChange={(vals) => setRightTransferList(vals)}
            />
        </div>
    )
}

function CheckList(props: {items: string[], onChange: (selections: number[]) => void}) {
    const { items, onChange } = props
    const [selected, setSelected] = useState<number[]>([])

    useEffect(() => {
        setSelected([])
    }, [items])

    useEffect(() => {
        onChange(selected)
    }, [selected])

    const handleSelection = (index: number, checked: boolean) => {
        let newSelected = [...selected]
        if (checked) {
            newSelected.push(index)
        } else {
            newSelected.splice(index, 1)
        }
        setSelected(newSelected)
    }

    return (
        <div className='flex flex-col gap-2'>
            {
                items.map((item, index) => (
                    <div className='flex items-center gap-2 w-fit'>
                        <input type='checkbox' checked={selected.includes(index)} key={`right-${index}`} value={index} onChange={(e) => handleSelection(index, e.currentTarget.checked)} />
                        <span>{ item }</span>
                    </div>
                ))
            }
        </div>
    )
}