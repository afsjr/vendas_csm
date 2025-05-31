import { NextResponse } from "next/server"
import { mockLeads } from "@/lib/mock-data"

export async function GET() {
  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json({
    success: true,
    data: mockLeads,
    total: mockLeads.length,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Simular criação de novo lead
  const newLead = {
    id: (mockLeads.length + 1).toString(),
    ...body,
    createdAt: new Date(),
    totalValue: 0,
    financialInfo: {
      paymentStatus: "pendente",
    },
  }

  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 200))

  return NextResponse.json({
    success: true,
    data: newLead,
    message: "Lead criado com sucesso",
  })
}
