import { useState } from 'react'
import { Input } from "@/components/ui/input"
import Image from 'next/image'

type ImageBlockProps = {
  src: string
  alt: string
  isEditing: boolean
  onUpdate: (src: string, alt: string) => void
}

export function ImageBlock({ src, alt, isEditing, onUpdate }: ImageBlockProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [imageAlt, setImageAlt] = useState(alt)

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Input
          value={imageSrc}
          onChange={(e) => setImageSrc(e.target.value)}
          onBlur={() => onUpdate(imageSrc, imageAlt)}
          placeholder="Image URL"
        />
        <Input
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
          onBlur={() => onUpdate(imageSrc, imageAlt)}
          placeholder="Image alt text"
        />
      </div>
    )
  }

  return <Image src={src} alt={alt} width={300} height={200} />
}

