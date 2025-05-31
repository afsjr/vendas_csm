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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function NewLeadPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    educationalBackground: "",
    interestAreas: [] as string[],
    preferredCourseTypes: [] as string[],
    preferredFormat: [] as string[],
    notes: "",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name) errors.name = "Nome é obrigatório"
    if (!formData.email) errors.email = "Email é obrigatório"
    if (!formData.phone) errors.phone = "Telefone é obrigatório"
    if (!formData.educationalBackground) errors.educationalBackground = "Formação é obrigatória"

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Email inválido"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, corrija os campos destacados.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simular chamada para API
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          status: "prospecto",
          lastContact: new Date(),
          interestedCourses: [],
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Lead criado com sucesso!",
          description: "O lead foi registrado no sistema.",
        })

        // Redirecionamento após salvar
        setTimeout(() => {
          router.push("/leads")
        }, 1500)
      } else {
        throw new Error(result.message || "Erro ao criar lead")
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o lead. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/leads">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Novo Lead</h1>
          <p className="text-muted-foreground">Preencha os dados para cadastrar um novo lead</p>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          <Check className="mr-2 h-4 w-4" />
          {isSubmitting ? "Salvando..." : "Salvar Lead"}
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome Completo <span className="text-red-500">*</span>
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
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={formErrors.email ? "border-red-500" : ""}
                />
                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Telefone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className={formErrors.phone ? "border-red-500" : ""}
                />
                {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="educationalBackground">
                  Formação Atual <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.educationalBackground}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, educationalBackground: value }))}
                >
                  <SelectTrigger className={formErrors.educationalBackground ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione a formação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ensino Fundamental">Ensino Fundamental</SelectItem>
                    <SelectItem value="Ensino Médio Completo">Ensino Médio Completo</SelectItem>
                    <SelectItem value="Ensino Superior Incompleto">Ensino Superior Incompleto</SelectItem>
                    <SelectItem value="Ensino Superior Completo">Ensino Superior Completo</SelectItem>
                    <SelectItem value="Pós-graduação">Pós-graduação</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.educationalBackground && (
                  <p className="text-sm text-red-500">{formErrors.educationalBackground}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Áreas de Interesse</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {["Tecnologia", "Saúde", "Administração", "Marketing", "Educação", "Engenharia"].map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={`area-${area}`}
                        checked={formData.interestAreas.includes(area)}
                        onCheckedChange={(checked) => handleCheckboxChange("interestAreas", area, checked as boolean)}
                      />
                      <Label htmlFor={`area-${area}`} className="text-sm">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Tipos de Curso Preferidos</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {[
                    { value: "tecnico", label: "Técnico" },
                    { value: "graduacao", label: "Graduação" },
                    { value: "pos", label: "Pós-graduação" },
                    { value: "especializacao", label: "Especialização" },
                    { value: "profissionalizante", label: "Profissionalizante" },
                  ].map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type.value}`}
                        checked={formData.preferredCourseTypes.includes(type.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("preferredCourseTypes", type.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`type-${type.value}`} className="text-sm">
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Formato Preferido</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[
                    { value: "presencial", label: "Presencial" },
                    { value: "hibrido", label: "Híbrido" },
                    { value: "online", label: "Online" },
                  ].map((format) => (
                    <div key={format.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`format-${format.value}`}
                        checked={formData.preferredFormat.includes(format.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("preferredFormat", format.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`format-${format.value}`} className="text-sm">
                        {format.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Informações adicionais sobre o lead..."
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Lead"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
