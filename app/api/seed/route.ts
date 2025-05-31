import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/seed-data"

export async function POST() {
  try {
    const result = await seedDatabase()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Database seeded successfully",
      })
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Seed API error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
