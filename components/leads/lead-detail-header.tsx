"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Calendar, Edit, FileText } from "lucide-react"
import type { Lead } from "@/lib/types"
import { getStatusColor, getStatusLabel } from "@/lib/utils"

interface LeadDetailHeaderProps {
  lead: Lead
  onEdit: () => void
}

export function LeadDetailHeader({ lead, onEdit }: LeadDetailHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{lead.name}</h1>
          <Badge className={getStatusColor(lead.status)}>{getStatusLabel(lead.status)}</Badge>
        </div>
        <p className="text-muted-foreground">
          {lead.email} • {lead.phone}
        </p>
      </div>
      <div className="flex gap-2 self-end md:self-auto">
        <Button size="sm" variant="outline">
          <Phone className="h-4 w-4 mr-2" />
          Ligar
        </Button>
        <Button size="sm" variant="outline">
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
        <Button size="sm" variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Agendar
        </Button>
        <Button size="sm" variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Nova Cotação
        </Button>
        <Button size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>
    </div>
  )
}
