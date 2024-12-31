import { useState } from 'react'
import { Input } from "@/components/ui/input"

type TextBlockProps = {
  content: string
  isEditing: boolean
  onUpdate: (content: string) => void
}

export function TextBlock({ content, isEditing, onUpdate }: TextBlockProps) {
  const [text, setText] = useState(content)

  if (isEditing) {
    return (
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => onUpdate(text)}
      />
    )
  }

  return <p>{content}</p>
}

