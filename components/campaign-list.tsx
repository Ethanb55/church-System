import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Campaign = {
  id: string
  name: string
  objective: string
  targetAudience: string
  keyMessage: string
  timeline: string
  budget: string
  status: 'planning' | 'active' | 'completed'
}

type CampaignListProps = {
  campaigns: Campaign[]
  onSelect: (campaign: Campaign) => void
}

export function CampaignList({ campaigns, onSelect }: CampaignListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Objective</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell>{campaign.name}</TableCell>
            <TableCell>{campaign.objective}</TableCell>
            <TableCell>{campaign.status}</TableCell>
            <TableCell>
              <Button onClick={() => onSelect(campaign)}>View Details</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

