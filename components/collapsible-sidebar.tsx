"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileUpload } from './file-upload'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, FileText, Table } from 'lucide-react'
import Link from 'next/link'

export function CollapsibleSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="fixed right-0 top-0 h-full bg-background shadow-lg z-50"
      initial={{ width: "60px" }}
      animate={{ width: isExpanded ? "400px" : "60px" }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="h-full flex flex-col">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronRight /> : <ChevronLeft />}
        </Button>
        {isExpanded && (
          <div className="p-4 mt-12 space-y-4">
            <FileUpload onFileUpload={(file, metadata) => console.log('File uploaded:', file, metadata)} />
            <div className="space-y-2">
              <h3 className="font-semibold">Create New</h3>
              <Link href="/documents/create-doc">
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" /> New Document
                </Button>
              </Link>
              <Link href="/documents/create-sheet">
                <Button className="w-full">
                  <Table className="mr-2 h-4 w-4" /> New Sheet
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

