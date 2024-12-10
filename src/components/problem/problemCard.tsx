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
import { Editor } from "@monaco-editor/react"
import { defaultCodeSnippet } from "./const"
import { Button } from "../ui/button"

export function ProblemCard(props: ProblemCardProps) {
  const { title, component: Component, onDevCodeChange } = props

  const [code, setCode] = useState(defaultCodeSnippet)

  const handleRunCode = () => {
    onDevCodeChange(code)
  }

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
              <Button onClick={handleRunCode}>Run</Button>
            </div>
          </CardHeader>
        )
      }
      <Editor
        height="75vh"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value ?? '')}
      />
    </Card>
  )
}
