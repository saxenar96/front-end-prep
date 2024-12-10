import react, { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CodeEditorProps } from './config'
import { Editor } from "@monaco-editor/react"
import { defaultCodeSnippet } from './const'
import { Button } from "../ui/button"

export function CodeEditor(props: CodeEditorProps) {
  const { onDevCodeChange } = props

  const [code, setCode] = useState(defaultCodeSnippet)

  const handleRunCode = () => {
    onDevCodeChange(code)
  }

  return (
    <Card className="w-full h-full">
        <CardHeader>
            <div className="w-full flex justify-between items-center">
                <CardTitle className="inline-flex gap-2">
                    <span>Your Code</span>
                </CardTitle>
                <Button onClick={handleRunCode}>Run</Button>
            </div>
        </CardHeader>
        <Editor
            height="75vh"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value ?? '')}
        />
    </Card>
  )
}
