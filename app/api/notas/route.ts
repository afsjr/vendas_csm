import { NextResponse } from "next/server"
import { mockGrades } from "@/lib/mock-data"

export async function GET() {
  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json({
    success: true,
    data: mockGrades,
    total: mockGrades.length,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Simular criação de nova nota
  const newGrade = {
    id: (mockGrades.length + 1).toString(),
    ...body,
    grade: Number.parseFloat(body.grade),
    maxGrade: Number.parseFloat(body.maxGrade),
    date: new Date(),
  }

  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 200))

  return NextResponse.json({
    success: true,
    data: newGrade,
    message: "Nota registrada com sucesso",
  })
}
