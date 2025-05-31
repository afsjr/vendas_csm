import { supabase } from "./supabase"
import { mockLeads, mockCourses, mockMatriculations, mockGrades } from "./mock-data"

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")

    // Clear existing data
    await supabase.from("grades").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("matriculations").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("leads").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("courses").delete().neq("id", "00000000-0000-0000-0000-000000000000")

    // Seed courses
    const coursesData = mockCourses.map((course) => ({
      id: course.id,
      name: course.name,
      level: course.level,
      format: course.format,
      duration: course.duration,
      price: course.price,
      start_date: course.startDate.toISOString().split("T")[0],
      enrollment_deadline: course.enrollmentDeadline.toISOString().split("T")[0],
      description: `Curso de ${course.name}`,
    }))

    const { error: coursesError } = await supabase.from("courses").insert(coursesData)

    if (coursesError) throw coursesError
    console.log("✅ Courses seeded successfully")

    // Seed leads
    const leadsData = mockLeads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
      last_contact: lead.lastContact.toISOString(),
      next_contact: lead.nextContact?.toISOString() || null,
      educational_background: lead.educationalBackground,
      interest_areas: lead.interestAreas,
      preferred_course_types: lead.preferredCourseTypes,
      preferred_format: lead.preferredFormat,
      notes: lead.notes,
      total_value: lead.totalValue,
    }))

    const { error: leadsError } = await supabase.from("leads").insert(leadsData)

    if (leadsError) throw leadsError
    console.log("✅ Leads seeded successfully")

    // Seed matriculations
    const matriculationsData = mockMatriculations.map((matriculation) => ({
      id: matriculation.id,
      student_id: matriculation.studentId,
      student_name: matriculation.studentName,
      course_id: matriculation.courseId,
      course_name: matriculation.courseName,
      enrollment_date: matriculation.enrollmentDate.toISOString(),
      start_date: matriculation.startDate.toISOString().split("T")[0],
      end_date: matriculation.endDate.toISOString().split("T")[0],
      status: matriculation.status,
      payment_status: matriculation.paymentStatus,
      guarantor_name: matriculation.financialGuarantor?.name || null,
      guarantor_relationship: matriculation.financialGuarantor?.relationship || null,
      guarantor_phone: matriculation.financialGuarantor?.phone || null,
      guarantor_email: matriculation.financialGuarantor?.email || null,
    }))

    const { error: matriculationsError } = await supabase.from("matriculations").insert(matriculationsData)

    if (matriculationsError) throw matriculationsError
    console.log("✅ Matriculations seeded successfully")

    // Seed grades
    const gradesData = mockGrades.map((grade) => ({
      id: grade.id,
      matriculation_id: grade.matriculationId,
      student_id: grade.studentId,
      student_name: grade.studentName,
      course_id: grade.courseId,
      course_name: grade.courseName,
      subject_name: grade.subjectName,
      period: grade.period,
      grade: grade.grade,
      max_grade: grade.maxGrade,
      status: grade.status,
      date: grade.date.toISOString(),
    }))

    const { error: gradesError } = await supabase.from("grades").insert(gradesData)

    if (gradesError) throw gradesError
    console.log("✅ Grades seeded successfully")

    console.log("🎉 Database seeding completed successfully!")
    return { success: true, message: "Database seeded successfully" }
  } catch (error: any) {
    console.error("❌ Error seeding database:", error)
    return { success: false, message: error.message }
  }
}
