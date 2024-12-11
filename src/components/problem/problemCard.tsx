import react, { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProblemCardProps } from "./config"
import { CustomTooltip } from "../ui/customTooltip"
import { CircleHelp } from "lucide-react"
import { defaultCodeSnippet } from "./const"

export function ProblemCard(props: ProblemCardProps) {
  const { title, component: Component } = props

  const [code, setCode] = useState(defaultCodeSnippet)

  return (
    <Card className="w-full h-full">
      {
        title && (
          <CardHeader>
            <div className="w-full flex justify-between items-center">
              <CardTitle className="inline-flex gap-2">
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
            </div>
          </CardHeader>
        )
      }
      <CardContent>
        <Component />
      </CardContent>
    </Card>
  )
}
