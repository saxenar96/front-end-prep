import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProblemCardProps } from "./config"

export function ProblemCard(props: ProblemCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{ props.title }</CardTitle>
        <CardDescription>{ props.description }</CardDescription>
      </CardHeader>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  )
}
