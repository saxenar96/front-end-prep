import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProblemCardProps } from "./config"
import { CustomTooltip } from "../ui/customTooltip"
import { CircleHelp } from "lucide-react"

export function ProblemCard(props: ProblemCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="inline-flex gap-1">
            <span>{ props.title }</span>
            <span className="inline-flex align-top">
                <CustomTooltip
                    content={props.description}
                >
                    <CircleHelp
                        height={16}
                        width={16}
                        stroke="#3F3F46B2"
                    />
                </CustomTooltip>
            </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  )
}
