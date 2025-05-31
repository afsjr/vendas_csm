"use client"

import { useState, useEffect } from "react"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SalesFunnelChart } from "@/components/dashboard/sales-funnel-chart"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { CourseDistributionChart } from "@/components/dashboard/course-distribution-chart"
import { ActivitiesTimeline } from "@/components/dashboard/activities-timeline"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { ActionCards } from "@/components/dashboard/action-cards"
import { SupabaseStatus } from "@/components/supabase-status"
import { getDashboardStats } from "@/lib/data-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true)
        const data = await getDashboardStats()
        setStats(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching dashboard stats:", err)
        setError("Falha ao carregar estatísticas. Por favor, tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das vendas de cursos educacionais</p>
      </div>

      {/* Supabase Status */}
      <SupabaseStatus />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          <p>{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="mt-2">
            Tentar novamente
          </Button>
        </div>
      )}

      {/* Stats Cards */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[100px] rounded-xl" />
          ))}
        </div>
      ) : (
        <StatsCards stats={stats} />
      )}

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-[300px] rounded-xl" />
            <Skeleton className="h-[300px] rounded-xl" />
          </>
        ) : (
          <>
            <SalesFunnelChart />
            <RevenueChart />
          </>
        )}
      </div>

      {/* Course Distribution Chart */}
      <div>{isLoading ? <Skeleton className="h-[300px] rounded-xl" /> : <CourseDistributionChart />}</div>

      {/* Activities and Alerts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-[300px] rounded-xl" />
            <Skeleton className="h-[300px] rounded-xl" />
          </>
        ) : (
          <>
            <ActivitiesTimeline />
            <AlertsPanel />
          </>
        )}
      </div>

      {/* Action Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Ações Necessárias</h2>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[150px] rounded-xl" />
            ))}
          </div>
        ) : (
          <ActionCards />
        )}
      </div>
    </div>
  )
}
