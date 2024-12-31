"use client"

import React, { useState, useCallback } from 'react'
import Tree from 'react-d3-tree'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type OrgNode = {
  name: string
  attributes?: { 
    title?: string
    user?: string
    description?: string
  }
  children?: OrgNode[]
}

type User = {
  id: string
  name: string
}

const initialOrgChartData: OrgNode = {
  name: 'Church Leadership',
  attributes: { description: 'Oversees all church operations and ministries' },
  children: [
    {
      name: 'Senior Pastor',
      attributes: { title: 'John Doe', description: 'Leads the church and provides spiritual guidance' },
      children: [
        {
          name: 'Worship',
          attributes: { description: 'Coordinates music and worship services' },
          children: [
            { name: 'Worship Leader', attributes: { description: 'Leads worship team and plans music' } },
            { name: 'Tech Team Lead', attributes: { description: 'Manages audio/visual equipment' } }
          ]
        },
        {
          name: 'Youth Ministry',
          attributes: { description: 'Oversees programs for teenagers' },
          children: [
            { name: 'Youth Pastor', attributes: { description: 'Leads youth group and mentors teens' } },
            { name: 'Youth Coordinator', attributes: { description: 'Organizes youth events and activities' } }
          ]
        },
        {
          name: 'Children\'s Ministry',
          attributes: { description: 'Manages programs for children' },
          children: [
            { name: 'Children\'s Director', attributes: { description: 'Oversees all children\'s programs' } },
            { name: 'Nursery Coordinator', attributes: { description: 'Manages care for infants and toddlers' } }
          ]
        }
      ]
    }
  ]
}

const colors = [
  '#FFCCCB', // Soft Red
  '#FFD8B1', // Peach
  '#FFFACD', // Lemon Chiffon
  '#E0FFFF', // Light Cyan
  '#D8BFD8', // Thistle
  '#DCDCDC', // Gainsboro (Light Grey)
]

const getColor = (depth: number) => colors[depth % colors.length]

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  handleNodeClick
}: any) => (
  <g>
    <circle r={15} fill={getColor(nodeDatum.depth)} />
    <foreignObject {...foreignObjectProps}>
      <Card 
        style={{ background: getColor(nodeDatum.depth) }} 
        className="cursor-pointer"
        onClick={() => handleNodeClick(nodeDatum)}
      >
        <CardContent className="p-2">
          <h3 className="text-sm font-semibold">{nodeDatum.name}</h3>
          {nodeDatum.attributes?.title && (
            <p className="text-xs">{nodeDatum.attributes.title}</p>
          )}
          {nodeDatum.attributes?.user && (
            <p className="text-xs italic">Assigned: {nodeDatum.attributes.user}</p>
          )}
        </CardContent>
      </Card>
    </foreignObject>
  </g>
)

export function OrgChart() {
  const [orgChartData, setOrgChartData] = useState<OrgNode>(initialOrgChartData)
  const [newSectionName, setNewSectionName] = useState('')
  const [newDepartmentName, setNewDepartmentName] = useState('')
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
    // Add more users as needed
  ])

  const addNewSection = useCallback(() => {
    if (newSectionName) {
      setOrgChartData(prevData => ({
        ...prevData,
        children: [
          ...(prevData.children || []),
          { name: newSectionName, attributes: { description: '' }, children: [] }
        ]
      }))
      setNewSectionName('')
    }
  }, [newSectionName])

  const addNewDepartment = useCallback(() => {
    if (newDepartmentName) {
      setOrgChartData(prevData => ({
        ...prevData,
        children: prevData.children?.map(child => 
          child.name === 'Senior Pastor' 
            ? {
                ...child,
                children: [
                  ...(child.children || []),
                  { 
                    name: newDepartmentName,
                    attributes: { description: '' },
                    children: [{ name: 'Department Lead', attributes: { description: '' } }]
                  }
                ]
              }
            : child
        )
      }))
      setNewDepartmentName('')
    }
  }, [newDepartmentName])

  const handleNodeClick = (node: OrgNode) => {
    setSelectedNode(node)
    setIsDialogOpen(true)
  }

  const updateNodeData = (updatedNode: OrgNode) => {
    const updateTree = (node: OrgNode): OrgNode => {
      if (node.name === updatedNode.name && node.attributes?.title === updatedNode.attributes?.title) {
        return updatedNode
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateTree)
        }
      }
      return node
    }

    setOrgChartData(updateTree(orgChartData))
    setSelectedNode(null)
    setIsDialogOpen(false)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex space-x-4 p-4">
        <div>
          <Label htmlFor="newSection">New Section</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="newSection"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Enter new section name"
            />
            <Button onClick={addNewSection}>Add Section</Button>
          </div>
        </div>
        <div>
          <Label htmlFor="newDepartment">New Department</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="newDepartment"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              placeholder="Enter new department name"
            />
            <Button onClick={addNewDepartment}>Add Department</Button>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
        <Tree
          data={orgChartData}
          orientation="vertical"
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps: { width: 220, height: 100, x: -110, y: -50 }, handleNodeClick })
          }
          separation={{ siblings: 2, nonSiblings: 2 }}
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedNode?.name}</DialogTitle>
            <DialogDescription>{selectedNode?.attributes?.title}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={selectedNode?.attributes?.description || ''}
                onChange={(e) => setSelectedNode(prev => prev ? {...prev, attributes: {...prev.attributes, description: e.target.value}} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user" className="text-right">
                Assigned User
              </Label>
              <Select
                value={selectedNode?.attributes?.user || ''}
                onValueChange={(value) => setSelectedNode(prev => prev ? {...prev, attributes: {...prev.attributes, user: value}} : null)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.name}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => selectedNode && updateNodeData(selectedNode)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

