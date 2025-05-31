import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, TrendingUp, Calendar, UserPlus } from "lucide-react"
import { mockAlerts } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"

const alertIcons = {
  no_contact: AlertTriangle,
  deadline: Calendar,
  follow_up: Clock,
  new_lead: UserPlus,
  scholarship: TrendingUp,
}

const alertColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-blue-100 text-blue-800",
}

export function AlertsPanel() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Alertas Inteligentes</CardTitle>
        <CardDescription>Prazos, follow-ups e novos leads</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAlerts.map((alert) => {
            const Icon = alertIcons[alert.type]
            return (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                <div className="flex-shrink-0">
                  <Icon className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{alert.leadName}</p>
                    <Badge className={alertColors[alert.priority]}>{alert.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">{formatDate(alert.date)}</p>
                    <Button size="sm" variant="outline">
                      Ação
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
