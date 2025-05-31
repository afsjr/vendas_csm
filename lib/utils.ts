import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CourseLevel, CourseFormat } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("pt-BR").format(dateObj)
}

export function getStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    pendente: "Pendente",
    contatado: "Contatado",
    interessado: "Interessado",
    cotacao: "Em Cotação",
    matriculado: "Matriculado",
    desistente: "Desistente",
  }
  return statusMap[status] || status
}

export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pendente: "bg-gray-100 text-gray-800",
    contatado: "bg-blue-100 text-blue-800",
    interessado: "bg-yellow-100 text-yellow-800",
    cotacao: "bg-orange-100 text-orange-800",
    matriculado: "bg-green-100 text-green-800",
    desistente: "bg-red-100 text-red-800",
  }
  return colorMap[status] || "bg-gray-100 text-gray-800"
}

export function getPaymentStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    pendente: "Pendente",
    aprovado: "Aprovado",
    rejeitado: "Rejeitado",
    pago: "Pago",
  }
  return statusMap[status] || status
}

export function getPaymentStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pendente: "bg-yellow-100 text-yellow-800",
    aprovado: "bg-green-100 text-green-800",
    rejeitado: "bg-red-100 text-red-800",
    pago: "bg-blue-100 text-blue-800",
  }
  return colorMap[status] || "bg-gray-100 text-gray-800"
}

export function calculateAge(birthDate: Date | string): number {
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function getDaysUntil(date: Date | string): number {
  const targetDate = typeof date === "string" ? new Date(date) : date
  const today = new Date()
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getCourseLevelLabel(level: CourseLevel): string {
  const labels: Record<CourseLevel, string> = {
    tecnico: "Técnico",
    graduacao: "Graduação",
    pos: "Pós-graduação",
    especializacao: "Especialização",
    profissionalizante: "Profissionalizante",
  }
  return labels[level]
}

export function getCourseFormatLabel(format: CourseFormat): string {
  const labels: Record<CourseFormat, string> = {
    presencial: "Presencial",
    hibrido: "Híbrido",
    online: "Online",
  }
  return labels[format]
}
