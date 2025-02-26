import { useEffect, useState } from "react"
import { CodeEditorProps } from './config'
import { Editor } from "@monaco-editor/react"

const editorOptions = {
  minimap: {
      enabled: false
  }
}

export function CodeEditor(props: CodeEditorProps) {
  const { onDevCodeChange, defaultCode, language, localStorageKey } = props
  const [code, setCode] = useState(localStorage.getItem(localStorageKey) || defaultCode)

  useEffect(() => {
    onDevCodeChange(code)
  }, [])

  useEffect(() => {
    localStorage.setItem(localStorageKey, code)
    onDevCodeChange(code)
  }, [code])

  return (
    <div className='flex flex-col gap-[16px] w-full min-w-[490px] h-full'>
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={(value) => setCode(value ?? '')}
        options={editorOptions}
      />
    </div>
  )
}
