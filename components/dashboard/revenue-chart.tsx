import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { monthlyRevenue } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export function RevenueChart() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Evolução da Receita</CardTitle>
        <CardDescription>Receita mensal dos últimos 7 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
