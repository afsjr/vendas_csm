import type { Lead, Course, Matriculation, Grade } from "./types"

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Import Supabase only if configured
let supabase: any = null
if (isSupabaseConfigured()) {
  try {
    const supabaseModule = require("./supabase")
    supabase = supabaseModule.supabase
  } catch (error) {
    console.warn("Supabase not configured, falling back to mock data")
  }
}

// Import mock data as fallback
import { mockLeads, mockCourses, mockMatriculations, mockGrades } from "./mock-data"

// Transform functions to convert between database and frontend formats
function transformLeadFromDB(lead: any): Lead {
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    status: lead.status,
    lastContact: new Date(lead.last_contact || lead.lastContact),
    nextContact: lead.next_contact || lead.nextContact ? new Date(lead.next_contact || lead.nextContact) : null,
    educationalBackground: lead.educational_background || lead.educationalBackground,
    interestAreas: lead.interest_areas || lead.interestAreas || [],
    preferredCourseTypes: lead.preferred_course_types || lead.preferredCourseTypes || [],
    preferredFormat: lead.preferred_format || lead.preferredFormat || [],
    notes: lead.notes || "",
    interestedCourses: lead.interestedCourses || [],
    financialInfo: lead.financialInfo || {
      paymentPlan: lead.payment_plan || undefined,
      scholarship: lead.scholarship || false,
      scholarshipPercentage: lead.scholarship_percentage,
      paymentStatus: lead.payment_status || "pendente",
    },
    totalValue: Number(lead.total_value || lead.totalValue) || 0,
    createdAt: new Date(lead.created_at || lead.createdAt),
  }
}

function transformCourseFromDB(course: any): Course {
  return {
    id: course.id,
    name: course.name,
    level: course.level,
    format: course.format,
    duration: course.duration,
    price: Number(course.price),
    startDate: new Date(course.start_date || course.startDate),
    enrollmentDeadline: new Date(course.enrollment_deadline || course.enrollmentDeadline),
  }
}

function transformMatriculationFromDB(matriculation: any): Matriculation {
  return {
    id: matriculation.id,
    studentId: matriculation.student_id || matriculation.studentId,
    studentName: matriculation.student_name || matriculation.studentName,
    courseId: matriculation.course_id || matriculation.courseId,
    courseName: matriculation.course_name || matriculation.courseName,
    enrollmentDate: new Date(matriculation.enrollment_date || matriculation.enrollmentDate),
    startDate: new Date(matriculation.start_date || matriculation.startDate),
    endDate: new Date(matriculation.end_date || matriculation.endDate),
    status: matriculation.status,
    paymentStatus: matriculation.payment_status || matriculation.paymentStatus,
    financialGuarantor:
      matriculation.guarantor_name || matriculation.financialGuarantor?.name
        ? {
            name: matriculation.guarantor_name || matriculation.financialGuarantor.name,
            relationship: matriculation.guarantor_relationship || matriculation.financialGuarantor.relationship,
            phone: matriculation.guarantor_phone || matriculation.financialGuarantor.phone,
            email: matriculation.guarantor_email || matriculation.financialGuarantor.email,
          }
        : undefined,
    grades: matriculation.grades || [],
  }
}

function transformGradeFromDB(grade: any): Grade {
  return {
    id: grade.id,
    matriculationId: grade.matriculation_id || grade.matriculationId,
    studentId: grade.student_id || grade.studentId,
    studentName: grade.student_name || grade.studentName,
    courseId: grade.course_id || grade.courseId,
    courseName: grade.course_name || grade.courseName,
    subjectName: grade.subject_name || grade.subjectName,
    period: grade.period,
    grade: Number(grade.grade),
    maxGrade: Number(grade.max_grade || grade.maxGrade),
    status: grade.status,
    date: new Date(grade.date),
  }
}

// Leads
export async function getLeads(): Promise<Lead[]> {
  if (!supabase) {
    // Fallback to mock data
    return mockLeads.map(transformLeadFromDB)
  }

  try {
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return data.map(transformLeadFromDB)
  } catch (error) {
    console.warn("Supabase error, falling back to mock data:", error)
    return mockLeads.map(transformLeadFromDB)
  }
}

export async function getLead(id: string): Promise<Lead> {
  if (!supabase) {
    // Fallback to mock data
    const lead = mockLeads.find((l) => l.id === id)
    if (!lead) {
      // Return a more descriptive error or create a default lead
      console.warn(`Lead with id ${id} not found in mock data`)
      throw new Error(`Lead with id ${id} not found`)
    }
    return transformLeadFromDB(lead)
  }

  try {
    const { data, error } = await supabase.from("leads").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error(`Lead with id ${id} not found`)
      }
      throw error
    }

    return transformLeadFromDB(data)
  } catch (error) {
    console.warn("Supabase error:", error)
    // Try fallback to mock data
    const lead = mockLeads.find((l) => l.id === id)
    if (!lead) {
      throw new Error(`Lead with id ${id} not found`)
    }
    return transformLeadFromDB(lead)
  }
}

export async function createLead(lead: Partial<Lead>): Promise<Lead> {
  if (!supabase) {
    // Simulate creation with mock data
    const newLead = {
      id: Math.random().toString(36).substr(2, 9),
      ...lead,
      createdAt: new Date(),
      lastContact: lead.lastContact || new Date(),
      totalValue: lead.totalValue || 0,
      interestedCourses: [],
      financialInfo: {
        paymentStatus: "pendente",
      },
    } as Lead
    return newLead
  }

  try {
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        status: lead.status || "prospecto",
        last_contact: lead.lastContact?.toISOString() || new Date().toISOString(),
        next_contact: lead.nextContact?.toISOString() || null,
        educational_background: lead.educationalBackground,
        interest_areas: lead.interestAreas || [],
        preferred_course_types: lead.preferredCourseTypes || [],
        preferred_format: lead.preferredFormat || [],
        notes: lead.notes || "",
        total_value: lead.totalValue || 0,
      })
      .select()
      .single()

    if (error) throw error

    return transformLeadFromDB(data)
  } catch (error) {
    console.warn("Supabase error:", error)
    throw error
  }
}

export async function updateLead(id: string, lead: Partial<Lead>): Promise<Lead> {
  if (!supabase) {
    // Simulate update with mock data
    const existingLead = mockLeads.find((l) => l.id === id)
    if (!existingLead) throw new Error("Lead not found")

    const updatedLead = { ...existingLead, ...lead }
    return transformLeadFromDB(updatedLead)
  }

  try {
    const { data, error } = await supabase
      .from("leads")
      .update({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        status: lead.status,
        last_contact: lead.lastContact?.toISOString(),
        next_contact: lead.nextContact?.toISOString(),
        educational_background: lead.educationalBackground,
        interest_areas: lead.interestAreas,
        preferred_course_types: lead.preferredCourseTypes,
        preferred_format: lead.preferredFormat,
        notes: lead.notes,
        total_value: lead.totalValue,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return transformLeadFromDB(data)
  } catch (error) {
    console.warn("Supabase error:", error)
    throw error
  }
}

export async function deleteLead(id: string): Promise<boolean> {
  if (!supabase) {
    // Simulate deletion
    return true
  }

  try {
    const { error } = await supabase.from("leads").delete().eq("id", id)

    if (error) throw error

    return true
  } catch (error) {
    console.warn("Supabase error:", error)
    throw error
  }
}

// Courses
export async function getCourses(): Promise<Course[]> {
  if (!supabase) {
    // Fallback to mock data
    return mockCourses.map(transformCourseFromDB)
  }

  try {
    const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return data.map(transformCourseFromDB)
  } catch (error) {
    console.warn("Supabase error, falling back to mock data:", error)
    return mockCourses.map(transformCourseFromDB)
  }
}

export async function getCourse(id: string): Promise<Course> {
  if (!supabase) {
    // Fallback to mock data
    const course = mockCourses.find((c) => c.id === id)
    if (!course) throw new Error("Course not found")
    return transformCourseFromDB(course)
  }

  try {
    const { data, error } = await supabase.from("courses").select("*").eq("id", id).single()

    if (error) throw error

    return transformCourseFromDB(data)
  } catch (error) {
    console.warn("Supabase error, falling back to mock data:", error)
    const course = mockCourses.find((c) => c.id === id)
    if (!course) throw new Error("Course not found")
    return transformCourseFromDB(course)
  }
}

export async function createCourse(course: Partial<Course>): Promise<Course> {
  if (!supabase) {
    // Simulate creation with mock data
    const newCourse = {
      id: Math.random().toString(36).substr(2, 9),
      ...course,
    } as Course
    return newCourse
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .insert({
        name: course.name,
        level: course.level,
        format: course.format,
        duration: course.duration,
        price: course.price,
        start_date: course.startDate?.toISOString().split("T")[0],
        enrollment_deadline: course.enrollmentDeadline?.toISOString().split("T")[0],
        description: course.description || null,
      })
      .select()
      .single()

    if (error) throw error

    return transformCourseFromDB(data)
  } catch (error) {
    console.warn("Supabase error:", error)
    throw error
  }
}

export async function updateCourse(id: string, course: Partial<Course>): Promise<Course> {
  if (!supabase) {
    // Simulate update with mock data
    const existingCourse = mockCourses.find((c) => c.id === id)
    if (!existingCourse) throw new Error("Course not found")

    const updatedCourse = { ...existingCourse, ...course }
    return transformCourseFromDB(updatedCourse)
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .update({
        name: course.name,
        level: course.level,
        format: course.format,
        duration: course.duration,
        price: course.price,
        start_date: course.startDate?.toISOString().split("T")[0],
        enrollment_deadline: course.enrollmentDeadline?.toISOString().split("T")[0],
        description: course.description || null,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return transformCourseFromDB(data)
  } catch (error) {
    console.warn("Supabase error:", error)
    throw error
  }
}

export async function deleteCourse(id: string): Promise<boolean> {
  if (!supabase) {
    // Simulate deletion
    return true
  }

  try {
    const { error } = await supabase.from("courses").delete().eq("id", id)

    if (error) throw error

    return true
  } catch (error) {
    console.warn("Supabase error:", error)
    throw error
  }
}

// Matriculations
export async function getMatriculations(): Promise<Matriculation[]> {
  if (!supabase) {
    // Fallback to mock data
    return mockMatriculations.map(transformMatriculationFromDB)
  }

  try {
    const { data, error } = await supabase.from("matriculations").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return data.map(transformMatriculationFromDB)
  } catch (error) {
    console.warn("Supabase error, falling back to mock data:", error)
    return mockMatriculations.map(transformMatriculationFromDB)
  }
}

export async function getMatriculation(id: string): Promise<Matriculation> {
  if (!supabase) {
    // Fallback to mock data
    const matriculation = mockMatriculations.find((m) => m.id === id)
    if (!matriculation) throw new Error("Matriculation not found")
    return transformMatriculationFromDB(matriculation)
  }

  try {
    const { data, error } = await supabase.from("matriculations").select("*").eq("id", id).single()

    if (error) throw error

    return transformMatriculationFromDB(data)
  } catch (error) {
    console.warn("Supabase error, falling back to mock data:", error)
    const matriculation = mockMatriculations.find((m) => m.id === id)
    if (!matriculation) throw new Error("Matriculation not found")
    return transformMatriculationFromDB(matriculation)
  }
}

export async function createMatriculation(matriculation: Partial<Matriculation>): Promise<Matriculation> {
  if (!supabase) {
    // Simulate creation with mock data
    const newMatriculation = {
      id: Math.random().toString(36).substr(2, 9),
      ...matriculation,
      enrollmentDate: matriculation.enrollmentDate || new Date(),
      status: matriculation.status || "ativa",
      paymentStatus: matriculation.paymentStatus || "pendente",
      grades: [],
    } as Matriculation
    return newMatriculation
  }

  try {
    const { data, error } = await supabase
      .from("matriculations")
      .insert({
        student_id: matriculation.studentId,
        student_name: matriculation.studentName,
        course_id: matriculation.courseId,
        course_name: matriculation.courseName,
        enrollment_date: matriculation.enrollmentDate?.toISOString() || new Date().toISOString(),
        start_date: matriculation.startDate?.toISOString().split("T")[0],
        end_date: matriculation.endDate?.toISOString().split("T")[0],
        status: matriculation.status || "ativa",
        payment_status: matriculation.paymentStatus || "pendente",
        guarantor_name: matriculation.financialGuarantor?.name || null,
        guarantor_relationship: matriculation.financialGuarantor?.relationship || null,
        guarantor_phone: matriculation.financialGuarantor?.phone || null,
        guarantor_email: matriculation.financialGuarantor?.email || null,
      })
      .select()
      .single()

    if (error) throw error

    return transformMatriculationFromDB(data)
  } catch (error) {
    console.warn("Supabase error:", error)
    throw error
  }
}

// Grades
export async function getGrades(): Promise<Grade[]> {
  if (!supabase) {
    // Fallback to mock data
    return mockGrades.map(transformGradeFromDB)
  }

  try {
    const { data, error } = await supabase.from("grades").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return data.map(transformGradeFromDB)
  } catch (error) {
    console.warn("Supabase error, falling back to mock data:", error)
    return mockGrades.map(transformGradeFromDB)
  }
}

export async function getGradesByMatriculation(matriculationId: string): Promise<Grade[]> {
  if (!supabase) {
    // Fallback to mock data
    return mockGrades.filter((g) => g.matriculationId === matriculationId).map(transformGradeFromDB)
  }

  try {
    const { data, error } = await supabase
      .from("grades")
      .select("*")
      .eq("matriculation_id", matriculationId)
      .order("date", { ascending: false })

    if (error) throw error

    return data.map(transformGradeFromDB)
  } catch (error) {
    console.warn("Supabase error, falling back to mock data:", error)
    return mockGrades.filter((g) => g.matriculationId === matriculationId).map(transformGradeFromDB)
  }
}

export async function createGrade(grade: Partial<Grade>): Promise<Grade> {
  if (!supabase) {
    // Simulate creation with mock data
    const newGrade = {
      id: Math.random().toString(36).substr(2, 9),
      ...grade,
      date: grade.date || new Date(),
      maxGrade: grade.maxGrade || 10,
      status: grade.status || "em_andamento",
    } as Grade
    return newGrade
  }

  try {
    const { data, error } = await supabase
      .from("grades")
      .insert({
        matriculation_id: grade.matriculationId,
        student_id: grade.studentId,
        student_name: grade.studentName,
        course_id: grade.courseId,
        course_name: grade.courseName,
        subject_name: grade.subjectName,
        period: grade.period,
        grade: grade.grade,
        max_grade: grade.maxGrade || 10,
        status: grade.status || "em_andamento",
        date: grade.date?.toISOString() || new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return transformGradeFromDB(data)
  } catch (error) {
    console.warn("Supabase error:", error)
    throw error
  }
}

// Dashboard stats
export async function getDashboardStats() {
  if (!supabase) {
    // Fallback to mock data calculations
    const totalLeads = mockLeads.length
    const contactedLeads = mockLeads.filter((l) => l.status === "contatado").length
    const interestedLeads = mockLeads.filter((l) => l.status === "interessado").length
    const enrolledStudents = mockMatriculations.length
    const totalRevenue = mockLeads.reduce((sum, lead) => sum + lead.totalValue, 0)
    const activeCourses = mockCourses.length
    const conversionRate = totalLeads ? ((enrolledStudents / totalLeads) * 100).toFixed(1) : "0.0"

    return {
      totalLeads,
      contactedLeads,
      interestedLeads,
      enrolledStudents,
      totalRevenue,
      activeCourses,
      conversionRate,
    }
  }

  try {
    // Get leads count
    const { count: totalLeads, error: leadsError } = await supabase.from("leads").select("*", { count: "exact" })

    if (leadsError) throw leadsError

    // Get contacted leads count
    const { count: contactedLeads, error: contactedError } = await supabase
      .from("leads")
      .select("*", { count: "exact" })
      .eq("status", "contatado")

    if (contactedError) throw contactedError

    // Get interested leads count
    const { count: interestedLeads, error: interestedError } = await supabase
      .from("leads")
      .select("*", { count: "exact" })
      .eq("status", "interessado")

    if (interestedError) throw interestedError

    // Get matriculations count
    const { count: enrolledStudents, error: matriculationsError } = await supabase
      .from("matriculations")
      .select("*", { count: "exact" })

    if (matriculationsError) throw matriculationsError

    // Get total revenue
    const { data: revenueData, error: revenueError } = await supabase.from("leads").select("total_value")

    if (revenueError) throw revenueError

    const totalRevenue = revenueData.reduce((sum, lead) => sum + Number(lead.total_value), 0)

    // Get active courses count
    const { count: activeCourses, error: coursesError } = await supabase.from("courses").select("*", { count: "exact" })

    if (coursesError) throw coursesError

    // Calculate conversion rate
    const conversionRate = totalLeads ? ((enrolledStudents / totalLeads) * 100).toFixed(1) : "0.0"

    return {
      totalLeads,
      contactedLeads,
      interestedLeads,
      enrolledStudents,
      totalRevenue,
      activeCourses,
      conversionRate,
    }
  } catch (error) {
    console.warn("Supabase error, falling back to mock data:", error)
    // Fallback to mock data calculations
    const totalLeads = mockLeads.length
    const contactedLeads = mockLeads.filter((l) => l.status === "contatado").length
    const interestedLeads = mockLeads.filter((l) => l.status === "interessado").length
    const enrolledStudents = mockMatriculations.length
    const totalRevenue = mockLeads.reduce((sum, lead) => sum + lead.totalValue, 0)
    const activeCourses = mockCourses.length
    const conversionRate = totalLeads ? ((enrolledStudents / totalLeads) * 100).toFixed(1) : "0.0"

    return {
      totalLeads,
      contactedLeads,
      interestedLeads,
      enrolledStudents,
      totalRevenue,
      activeCourses,
      conversionRate,
    }
  }
}
