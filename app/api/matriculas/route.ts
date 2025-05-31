import { NextResponse } from "next/server"
import { mockMatriculations } from "@/lib/mock-data"

export async function GET() {
  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json({
    success: true,
    data: mockMatriculations,
    total: mockMatriculations.length,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Simular criação de nova matrícula
  const newMatriculation = {
    id: (mockMatriculations.length + 1).toString(),
    ...body,
    enrollmentDate: new Date(),
    status: "ativa",
    grades: [],
  }

  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 200))

  return NextResponse.json({
    success: true,
    data: newMatriculation,
    message: "Matrícula criada com sucesso",
  })
}
