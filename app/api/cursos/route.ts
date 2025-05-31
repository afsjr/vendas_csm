import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    // Transform data to match frontend expectations
    const transformedCourses =
      courses?.map((course) => ({
        id: course.id,
        name: course.name,
        level: course.level,
        format: course.format,
        duration: course.duration,
        price: Number(course.price),
        startDate: new Date(course.start_date),
        enrollmentDeadline: new Date(course.enrollment_deadline),
        description: course.description,
      })) || []

    return NextResponse.json({
      success: true,
      data: transformedCourses,
      total: transformedCourses.length,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data: newCourse, error } = await supabase
      .from("courses")
      .insert({
        name: body.name,
        level: body.level,
        format: body.format,
        duration: body.duration,
        price: Number(body.price),
        start_date: body.startDate,
        enrollment_deadline: body.enrollmentDeadline,
        description: body.description || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: newCourse,
      message: "Curso criado com sucesso",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
