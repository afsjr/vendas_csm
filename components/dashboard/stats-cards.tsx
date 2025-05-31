import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Phone, DollarSign, FileText } from "lucide-react"
import { mockLeads } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export function StatsCards() {
  const totalLeads = mockLeads.length
  const contactedLeads = mockLeads.filter((c) => c.status === "contatado").length
  const interestedLeads = mockLeads.filter((c) => c.status === "interessado").length
  const totalRevenue = mockLeads.reduce((sum, lead) => sum + lead.totalValue, 0)

  const stats = [
    {
      title: "Total de Leads",
      value: totalLeads.toString(),
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Contatados",
      value: contactedLeads.toString(),
      icon: Phone,
      color: "text-green-600",
    },
    {
      title: "Interessados",
      value: interestedLeads.toString(),
      icon: FileText,
      color: "text-orange-600",
    },
    {
      title: "Receita Total",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
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
