import { NextResponse } from "next/server"
import { mockLeads, mockMatriculations, mockCourses } from "@/lib/mock-data"

export async function GET() {
  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100))

  const stats = {
    totalLeads: mockLeads.length,
    contactedLeads: mockLeads.filter((l) => l.status === "contatado").length,
    interestedLeads: mockLeads.filter((l) => l.status === "interessado").length,
    enrolledStudents: mockMatriculations.length,
    totalRevenue: mockLeads.reduce((sum, lead) => sum + lead.totalValue, 0),
    activeCourses: mockCourses.length,
    conversionRate: ((mockMatriculations.length / mockLeads.length) * 100).toFixed(1),
  }

  return NextResponse.json({
    success: true,
    data: stats,
  })
}
