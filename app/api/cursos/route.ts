import { NextResponse } from "next/server"
import { mockCourses } from "@/lib/mock-data"

export async function GET() {
  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json({
    success: true,
    data: mockCourses,
    total: mockCourses.length,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Simular criação de novo curso
  const newCourse = {
    id: (mockCourses.length + 1).toString(),
    ...body,
    price: Number.parseFloat(body.price),
    startDate: new Date(body.startDate),
    enrollmentDeadline: new Date(body.enrollmentDeadline),
  }

  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 200))

  return NextResponse.json({
    success: true,
    data: newCourse,
    message: "Curso criado com sucesso",
  })
}
