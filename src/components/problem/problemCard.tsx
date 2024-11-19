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
  const { title, component: Component } = props

  return (
    <Card className="w-full h-full flex flex-col justify-center items-center">
      {
        title && (
          <CardHeader>
            <CardTitle className="inline-flex gap-1">
                <span>{ title }</span>
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
        )
      }
      <CardContent>
        <Component />
      </CardContent>
    </Card>
  )
}
