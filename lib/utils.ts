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

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(date)
}

export function getStatusColor(status: string): string {
  const colors = {
    prospecto: "bg-red-100 text-red-800",
    contatado: "bg-yellow-100 text-yellow-800",
    interessado: "bg-blue-100 text-blue-800",
    inscrito: "bg-purple-100 text-purple-800",
    matriculado: "bg-green-100 text-green-800",
    desistente: "bg-gray-100 text-gray-800",
  }
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
}

export function getStatusLabel(status: string): string {
  const labels = {
    prospecto: "Prospecto",
    contatado: "Contatado",
    interessado: "Interessado",
    inscrito: "Inscrito",
    matriculado: "Matriculado",
    desistente: "Desistente",
  }
  return labels[status as keyof typeof labels] || status
}

export function getCourseLevelLabel(level: CourseLevel): string {
  const labels = {
    tecnico: "Técnico",
    graduacao: "Graduação",
    pos: "Pós-graduação",
    especializacao: "Especialização",
    profissionalizante: "Profissionalizante",
  }
  return labels[level]
}

export function getCourseFormatLabel(format: CourseFormat): string {
  const labels = {
    presencial: "Presencial",
    hibrido: "Híbrido",
    online: "Online",
  }
  return labels[format]
}

export function getPaymentStatusLabel(status: string): string {
  const labels = {
    pendente: "Pendente",
    parcial: "Parcial",
    completo: "Completo",
    bolsa: "Bolsa de Estudos",
  }
  return labels[status as keyof typeof labels] || status
}

export function getPaymentStatusColor(status: string): string {
  const colors = {
    pendente: "bg-red-100 text-red-800",
    parcial: "bg-yellow-100 text-yellow-800",
    completo: "bg-green-100 text-green-800",
    bolsa: "bg-purple-100 text-purple-800",
  }
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
}

export function getDaysUntil(date: Date): number {
  const today = new Date()
  const diffTime = date.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
