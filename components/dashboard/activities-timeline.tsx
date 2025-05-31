import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Calendar, GraduationCap, FileText } from "lucide-react"
import { mockActivities } from "@/lib/mock-data"
import { formatDate, formatCurrency } from "@/lib/utils"

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  enrollment: GraduationCap,
  follow_up: FileText,
}

const activityColors = {
  call: "bg-blue-100 text-blue-800",
  email: "bg-green-100 text-green-800",
  meeting: "bg-purple-100 text-purple-800",
  enrollment: "bg-emerald-100 text-emerald-800",
  follow_up: "bg-orange-100 text-orange-800",
}

export function ActivitiesTimeline() {
  const recentActivities = mockActivities.slice(0, 5)

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>Últimas interações e matrículas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = activityIcons[activity.type]
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{activity.leadName}</p>
                    <Badge className={activityColors[activity.type]}>
                      {activity.type === "enrollment"
                        ? "Matrícula"
                        : activity.type === "call"
                          ? "Ligação"
                          : activity.type === "email"
                            ? "Email"
                            : activity.type === "meeting"
                              ? "Reunião"
                              : "Follow-up"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-400">{formatDate(activity.date)}</p>
                    {activity.value && (
                      <p className="text-xs font-medium text-green-600">{formatCurrency(activity.value)}</p>
                    )}
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
