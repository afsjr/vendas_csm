import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Calendar, GraduationCap } from "lucide-react"
import type { Lead } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface LeadContactInfoProps {
  lead: Lead
}

export function LeadContactInfo({ lead }: LeadContactInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações de Contato</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Telefone</p>
            <p className="text-sm text-muted-foreground">{lead.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{lead.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Último Contato</p>
            <p className="text-sm text-muted-foreground">{formatDate(lead.lastContact)}</p>
          </div>
        </div>
        {lead.nextContact && (
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Próximo Contato</p>
              <p className="text-sm text-muted-foreground">{formatDate(lead.nextContact)}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Formação</p>
            <p className="text-sm text-muted-foreground">{lead.educationalBackground}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
