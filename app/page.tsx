import { StatsCards } from "@/components/dashboard/stats-cards"
import { SalesFunnelChart } from "@/components/dashboard/sales-funnel-chart"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { CourseDistributionChart } from "@/components/dashboard/course-distribution-chart"
import { ActivitiesTimeline } from "@/components/dashboard/activities-timeline"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { ActionCards } from "@/components/dashboard/action-cards"

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das vendas de cursos educacionais</p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <SalesFunnelChart />
        <RevenueChart />
      </div>

      {/* Course Distribution Chart */}
      <div>
        <CourseDistributionChart />
      </div>

      {/* Activities and Alerts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <ActivitiesTimeline />
        <AlertsPanel />
      </div>

      {/* Action Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Ações Necessárias</h2>
        <ActionCards />
      </div>
    </div>
  )
}
