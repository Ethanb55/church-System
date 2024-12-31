import { useState } from 'react'
import { TextBlock } from './text-block'
import { ImageBlock } from './image-block'
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

type Block = {
  id: string
  type: 'text' | 'image'
  content: string
  alt?: string
}

type PageBuilderProps = {
  initialBlocks: Block[]
  onSave: (blocks: Block[]) => void
}

export function PageBuilder({ initialBlocks, onSave }: PageBuilderProps) {
  const [blocks, setBlocks] = useState(initialBlocks)
  const [isEditing, setIsEditing] = useState(false)

  const addBlock = (type: 'text' | 'image') => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'New text block' : 'https://placekitten.com/300/200',
      alt: type === 'image' ? 'New image' : undefined,
    }
    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (id: string, content: string, alt?: string) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, content, alt } : block
    ))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBlocks(items)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Preview' : 'Edit'}
        </Button>
        <div className="space-x-2">
          <Button onClick={() => addBlock('text')}>Add Text</Button>
          <Button onClick={() => addBlock('image')}>Add Image</Button>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4"
                    >
                      {block.type === 'text' ? (
                        <TextBlock
                          content={block.content}
                          isEditing={isEditing}
                          onUpdate={(content) => updateBlock(block.id, content)}
                        />
                      ) : (
                        <ImageBlock
                          src={block.content}
                          alt={block.alt || ''}
                          isEditing={isEditing}
                          onUpdate={(src, alt) => updateBlock(block.id, src, alt)}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={() => onSave(blocks)}>Save Page</Button>
    </div>
  )
}

