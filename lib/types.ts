export type CourseLevel = "tecnico" | "graduacao" | "pos" | "especializacao" | "profissionalizante"
export type CourseFormat = "presencial" | "hibrido" | "online"
export type PaymentStatus = "pendente" | "parcial" | "completo" | "bolsa"

export interface Course {
  id: string
  name: string
  level: CourseLevel
  format: CourseFormat
  duration: string
  price: number
  startDate: Date
  enrollmentDeadline: Date
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  status: "prospecto" | "contatado" | "interessado" | "inscrito" | "matriculado" | "desistente"
  lastContact: Date
  nextContact: Date | null
  educationalBackground: string
  interestAreas: string[]
  preferredCourseTypes: CourseLevel[]
  preferredFormat: CourseFormat[]
  notes: string
  interestedCourses: {
    courseId: string
    courseName: string
    interestLevel: "baixo" | "medio" | "alto"
  }[]
  financialInfo: {
    paymentPlan?: "avista" | "parcelado" | "financiamento"
    scholarship?: boolean
    scholarshipPercentage?: number
    paymentStatus: PaymentStatus
  }
  totalValue: number
  createdAt: Date
}

export interface Activity {
  id: string
  leadId: string
  leadName: string
  type: "call" | "email" | "meeting" | "enrollment" | "follow_up"
  description: string
  date: Date
  value?: number
}

export interface Alert {
  id: string
  type: "no_contact" | "deadline" | "follow_up" | "new_lead" | "scholarship"
  leadId: string
  leadName: string
  message: string
  priority: "low" | "medium" | "high"
  date: Date
}

export interface Matriculation {
  id: string
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  enrollmentDate: Date
  startDate: Date
  endDate: Date
  status: "ativa" | "trancada" | "concluida" | "cancelada"
  paymentStatus: PaymentStatus
  financialGuarantor?: {
    name: string
    relationship: string
    phone: string
    email: string
  }
  grades?: Grade[]
}

export interface Grade {
  id: string
  matriculationId: string
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  subjectName: string
  period: string
  grade: number
  maxGrade: number
  status: "aprovado" | "reprovado" | "em_andamento"
  date: Date
}

export interface AppSettings {
  theme: "light" | "dark" | "system"
  language: "pt-BR" | "en-US" | "es-ES"
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  defaultCurrency: "BRL" | "USD" | "EUR"
  reportSettings: {
    defaultPeriod: "day" | "week" | "month" | "quarter" | "year"
    showInactiveStudents: boolean
  }
}
