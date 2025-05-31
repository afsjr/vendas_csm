import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Calendar, BookOpen, GraduationCap } from "lucide-react"
import type { Lead } from "@/lib/types"
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils"
import Link from "next/link"

interface LeadCardProps {
  lead: Lead
}

export function LeadCard({ lead }: LeadCardProps) {
  // Debug log to help identify issues
  console.log("LeadCard - Lead ID:", lead.id, "Lead Name:", lead.name)

  return (
    <Card className="animate-fade-in hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{lead.name}</h3>
            <p className="text-sm text-muted-foreground">{lead.email}</p>
          </div>
          <Badge className={getStatusColor(lead.status)}>{getStatusLabel(lead.status)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{lead.phone}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span>{lead.educationalBackground}</span>
        </div>

        {lead.interestedCourses.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{lead.interestedCourses[0].courseName}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Último contato: {formatDate(lead.lastContact)}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          {lead.totalValue > 0 ? (
            <span className="text-sm font-medium">Valor: {formatCurrency(lead.totalValue)}</span>
          ) : (
            <span className="text-sm text-muted-foreground">Sem matrícula</span>
          )}
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Mail className="h-4 w-4" />
            </Button>
            <Button size="sm" asChild>
              <Link href={`/leads/${encodeURIComponent(lead.id)}`}>Ver Detalhes</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
