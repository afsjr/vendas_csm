"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function NewCoursePage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    level: "",
    format: "",
    duration: "",
    price: "",
    startDate: "",
    enrollmentDeadline: "",
    description: "",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name) errors.name = "Nome do curso é obrigatório"
    if (!formData.level) errors.level = "Nível do curso é obrigatório"
    if (!formData.format) errors.format = "Formato do curso é obrigatório"
    if (!formData.duration) errors.duration = "Duração do curso é obrigatória"
    if (!formData.price) errors.price = "Valor do curso é obrigatório"
    if (!formData.startDate) errors.startDate = "Data de início é obrigatória"
    if (!formData.enrollmentDeadline) errors.enrollmentDeadline = "Prazo de inscrição é obrigatório"

    // Validar se o prazo de inscrição é anterior à data de início
    if (formData.startDate && formData.enrollmentDeadline) {
      const start = new Date(formData.startDate)
      const deadline = new Date(formData.enrollmentDeadline)
      if (deadline > start) {
        errors.enrollmentDeadline = "O prazo de inscrição deve ser anterior à data de início"
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, corrija os campos destacados.",
        variant: "destructive",
      })
      return
    }

    // Simulação de salvamento
    toast({
      title: "Curso salvo com sucesso!",
      description: "O curso foi registrado no sistema.",
    })

    // Redirecionamento após salvar
    setTimeout(() => {
      router.push("/cursos")
    }, 1500)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/cursos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Novo Curso</h1>
          <p className="text-muted-foreground">Preencha os dados para cadastrar um novo curso</p>
        </div>
        <Button onClick={handleSubmit}>
          <Check className="mr-2 h-4 w-4" />
          Salvar Curso
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome do Curso <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">
                  Nível <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.level} onValueChange={(value) => handleSelectChange("level", value)}>
                  <SelectTrigger className={formErrors.level ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="graduacao">Graduação</SelectItem>
                    <SelectItem value="pos">Pós-graduação</SelectItem>
                    <SelectItem value="especializacao">Especialização</SelectItem>
                    <SelectItem value="profissionalizante">Profissionalizante</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.level && <p className="text-sm text-red-500">{formErrors.level}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">
                  Formato <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.format} onValueChange={(value) => handleSelectChange("format", value)}>
                  <SelectTrigger className={formErrors.format ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="hibrido">Híbrido</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.format && <p className="text-sm text-red-500">{formErrors.format}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">
                  Duração <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Ex: 2 anos, 6 meses, etc."
                  className={formErrors.duration ? "border-red-500" : ""}
                />
                {formErrors.duration && <p className="text-sm text-red-500">{formErrors.duration}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Valor (R$) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className={formErrors.price ? "border-red-500" : ""}
                />
                {formErrors.price && <p className="text-sm text-red-500">{formErrors.price}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Data de Início <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={formErrors.startDate ? "border-red-500" : ""}
                />
                {formErrors.startDate && <p className="text-sm text-red-500">{formErrors.startDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="enrollmentDeadline">
                  Prazo de Inscrição <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="enrollmentDeadline"
                  name="enrollmentDeadline"
                  type="date"
                  value={formData.enrollmentDeadline}
                  onChange={handleChange}
                  className={formErrors.enrollmentDeadline ? "border-red-500" : ""}
                />
                {formErrors.enrollmentDeadline && (
                  <p className="text-sm text-red-500">{formErrors.enrollmentDeadline}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Salvar Curso</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
