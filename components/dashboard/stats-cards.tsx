import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Phone, DollarSign, FileText } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface StatsCardsProps {
  stats: {
    totalLeads: number
    contactedLeads: number
    interestedLeads: number
    totalRevenue: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const statsItems = [
    {
      title: "Total de Leads",
      value: stats?.totalLeads?.toString() || "0",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Contatados",
      value: stats?.contactedLeads?.toString() || "0",
      icon: Phone,
      color: "text-green-600",
    },
    {
      title: "Interessados",
      value: stats?.interestedLeads?.toString() || "0",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      title: "Receita Total",
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsItems.map((stat, index) => (
        <Card key={index} className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
