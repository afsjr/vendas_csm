import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data: leads, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    // Transform data to match frontend expectations
    const transformedLeads =
      leads?.map((lead) => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        status: lead.status,
        lastContact: new Date(lead.last_contact),
        nextContact: lead.next_contact ? new Date(lead.next_contact) : null,
        educationalBackground: lead.educational_background,
        interestAreas: lead.interest_areas || [],
        preferredCourseTypes: lead.preferred_course_types || [],
        preferredFormat: lead.preferred_format || [],
        notes: lead.notes || "",
        interestedCourses: [], // This would need a separate table/query
        financialInfo: {
          paymentStatus: "pendente",
        },
        totalValue: Number(lead.total_value) || 0,
        createdAt: new Date(lead.created_at),
      })) || []

    return NextResponse.json({
      success: true,
      data: transformedLeads,
      total: transformedLeads.length,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data: newLead, error } = await supabase
      .from("leads")
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        status: body.status || "prospecto",
        educational_background: body.educationalBackground,
        interest_areas: body.interestAreas || [],
        preferred_course_types: body.preferredCourseTypes || [],
        preferred_format: body.preferredFormat || [],
        notes: body.notes || "",
        total_value: body.totalValue || 0,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: newLead,
      message: "Lead criado com sucesso",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
