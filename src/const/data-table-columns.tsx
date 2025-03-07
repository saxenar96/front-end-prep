"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DIFFICULTY_TITLES, PROBLEM_DIFFICULTY, PROBLEM_TYPES, ProblemInfo } from "@/types/problem"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, BicepsFlexed, Clock } from "lucide-react"
import './general.css'

export type DataTableProblemEntry = Omit<ProblemInfo, 'icon' | 'solutionComponent'> & { link: string }

export const columns: ColumnDef<DataTableProblemEntry>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <BicepsFlexed />
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const difficulty: PROBLEM_DIFFICULTY = row.getValue('difficulty')
      return (<Badge className={difficulty} variant={"outline"}>{ DIFFICULTY_TITLES[difficulty] }</Badge>)
    }
  },
  {
    accessorKey: "problemType",
    header: () => {
      return (
        <div>
          Problem Type
        </div>
      )
    },
    cell: ({ row }) => {
      const problemType: PROBLEM_TYPES = row.getValue('problemType')
      return problemType === PROBLEM_TYPES.Javascript ? (
        <Badge variant='secondary'>{ problemType }</Badge>
      ) : (
        <Badge variant='primary'>{ problemType }</Badge>
      )
    }
  },
  {
    accessorKey: "estimatedCompletionTime",
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className="p-0"
        >
          <Clock />
          Estimated Completion Time
        </Button>
      )
    },
    cell: ({ row }) => <div>{ row.getValue('estimatedCompletionTime') } min</div>
  },
  {
    accessorKey: 'id',
    header: () => null,
    cell: () => null
  }
]
