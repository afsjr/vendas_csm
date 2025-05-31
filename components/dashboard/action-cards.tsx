import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, FileText, Calendar, AlertCircle } from "lucide-react"
import { mockLeads, mockAlerts, mockCourses } from "@/lib/mock-data"
import { getDaysUntil } from "@/lib/utils"

export function ActionCards() {
  const leadsToCall = mockLeads.filter((c) => c.status === "prospecto").length
  const interestedLeads = mockLeads.filter((c) => c.status === "interessado").length

  // Encontrar cursos com prazo de inscrição próximo (menos de 15 dias)
  const today = new Date()
  const upcomingDeadlines = mockCourses.filter((course) => {
    const daysUntil = getDaysUntil(course.enrollmentDeadline)
    return daysUntil > 0 && daysUntil <= 15
  }).length

  const urgentAlerts = mockAlerts.filter((a) => a.priority === "high").length

  const actions = [
    {
      title: "Leads para Contatar",
      count: leadsToCall,
      description: "Leads sem contato inicial",
      icon: Phone,
      color: "text-blue-600",
      action: "Ligar Agora",
    },
    {
      title: "Leads Interessados",
      count: interestedLeads,
      description: "Aguardando próximos passos",
      icon: FileText,
      color: "text-orange-600",
      action: "Ver Detalhes",
    },
    {
      title: "Prazos Próximos",
      count: upcomingDeadlines,
      description: "Inscrições a vencer",
      icon: Calendar,
      color: "text-green-600",
      action: "Ver Prazos",
    },
    {
      title: "Alertas Urgentes",
      count: urgentAlerts,
      description: "Requerem atenção imediata",
      icon: AlertCircle,
      color: "text-red-600",
      action: "Ver Alertas",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {actions.map((action, index) => (
        <Card key={index} className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{action.title}</CardTitle>
            <action.icon className={`h-4 w-4 ${action.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{action.count}</div>
            <p className="text-xs text-muted-foreground mb-3">{action.description}</p>
            <Button size="sm" className="w-full">
              {action.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
