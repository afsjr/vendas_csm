import { NextResponse } from "next/server"
import { mockLeads } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const lead = mockLeads.find((l) => l.id === params.id)

  if (!lead) {
    return NextResponse.json({ success: false, message: "Lead não encontrado" }, { status: 404 })
  }

  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json({
    success: true,
    data: lead,
  })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const leadIndex = mockLeads.findIndex((l) => l.id === params.id)

  if (leadIndex === -1) {
    return NextResponse.json({ success: false, message: "Lead não encontrado" }, { status: 404 })
  }

  // Simular atualização
  const updatedLead = { ...mockLeads[leadIndex], ...body }

  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 200))

  return NextResponse.json({
    success: true,
    data: updatedLead,
    message: "Lead atualizado com sucesso",
  })
}
