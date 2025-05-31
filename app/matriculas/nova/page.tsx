"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockCourses } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Check, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const calculateAge = (birthDate: Date): number => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export default function MatriculasNovaPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    studentName: "",
    birthDate: "",
    age: 0,
    address: "",
    phone: "",
    email: "",
    courseId: "",
    paymentMethod: "parcelado",
    needsGuarantor: false,
    guarantorName: "",
    guarantorRelationship: "",
    guarantorPhone: "",
    guarantorEmail: "",
  })

  const [isMinor, setIsMinor] = useState(false)
  const [activeTab, setActiveTab] = useState("student")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthDateValue = e.target.value

    if (birthDateValue) {
      const birthDate = new Date(birthDateValue)
      const age = calculateAge(birthDate)

      setFormData((prev) => ({
        ...prev,
        birthDate: birthDateValue,
        age: age,
      }))

      const needsGuarantor = age < 18
      setIsMinor(needsGuarantor)
      setFormData((prev) => ({
        ...prev,
        needsGuarantor: needsGuarantor,
      }))
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.studentName) errors.studentName = "Nome do aluno é obrigatório"
    if (!formData.birthDate) errors.birthDate = "Data de nascimento é obrigatória"
    if (!formData.phone) errors.phone = "Telefone é obrigatório"
    if (!formData.email) errors.email = "Email é obrigatório"
    if (!formData.courseId) errors.courseId = "Curso é obrigatório"

    if (isMinor || formData.needsGuarantor) {
      if (!formData.guarantorName) errors.guarantorName = "Nome do responsável é obrigatório"
      if (!formData.guarantorRelationship) errors.guarantorRelationship = "Relação com o aluno é obrigatória"
      if (!formData.guarantorPhone) errors.guarantorPhone = "Telefone do responsável é obrigatório"
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
      title: "Matrícula salva com sucesso!",
      description: "A matrícula foi registrada no sistema.",
    })

    // Redirecionamento após salvar
    setTimeout(() => {
      router.push("/matriculas")
    }, 1500)
  }

  const generateContract = () => {
    if (!validateForm()) {
      toast({
        title: "Erro no formulário",
        description: "Complete todos os campos obrigatórios antes de gerar o contrato.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Gerando contrato...",
      description: "O contrato será disponibilizado em breve para download.",
    })

    // Simulação de geração de contrato
    setTimeout(() => {
      toast({
        title: "Contrato gerado com sucesso!",
        description: "O contrato está pronto para download.",
      })
    }, 2000)
  }

  const selectedCourse = formData.courseId ? mockCourses.find((course) => course.id === formData.courseId) : null

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Nova Matrícula</h1>
          <p className="text-muted-foreground">Preencha os dados para registrar uma nova matrícula</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateContract}>
            <FileText className="mr-2 h-4 w-4" />
            Gerar Contrato
          </Button>
          <Button onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" />
            Salvar Matrícula
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="student">Dados do Aluno</TabsTrigger>
          <TabsTrigger value="course">Curso e Pagamento</TabsTrigger>
          <TabsTrigger value="guarantor" disabled={!isMinor && !formData.needsGuarantor}>
            Responsável Financeiro
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">
                    Nome Completo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className={formErrors.studentName ? "border-red-500" : ""}
                  />
                  {formErrors.studentName && <p className="text-sm text-red-500">{formErrors.studentName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">
                    Data de Nascimento <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleBirthDateChange}
                    className={formErrors.birthDate ? "border-red-500" : ""}
                  />
                  {formErrors.birthDate && <p className="text-sm text-red-500">{formErrors.birthDate}</p>}
                  {formData.age > 0 && <p className="text-sm text-muted-foreground">Idade: {formData.age} anos</p>}
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
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
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

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                </div>
              </div>

              {isMinor && (
                <Alert className="mt-4 bg-amber-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Aluno menor de idade</AlertTitle>
                  <AlertDescription>
                    É necessário preencher os dados do responsável financeiro na aba correspondente.
                  </AlertDescription>
                </Alert>
              )}

              <div className="mt-4 flex justify-end">
                <Button onClick={() => setActiveTab("course")}>Próximo</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="course" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="courseId">
                    Curso <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.courseId} onValueChange={(value) => handleSelectChange("courseId", value)}>
                    <SelectTrigger className={formErrors.courseId ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecione um curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.courseId && <p className="text-sm text-red-500">{formErrors.courseId}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avista">À Vista</SelectItem>
                      <SelectItem value="parcelado">Parcelado</SelectItem>
                      <SelectItem value="financiamento">Financiamento</SelectItem>
                      <SelectItem value="bolsa">Bolsa de Estudos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedCourse && (
                  <div className="md:col-span-2 p-4 border rounded-md bg-muted/50">
                    <h3 className="font-medium mb-2">Informações do Curso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Valor:</p>
                        <p className="text-sm">{formatCurrency(selectedCourse.price)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Duração:</p>
                        <p className="text-sm">{selectedCourse.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Início das Aulas:</p>
                        <p className="text-sm">{new Date(selectedCourse.startDate).toLocaleDateString("pt-BR")}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="needsGuarantor"
                      checked={formData.needsGuarantor || isMinor}
                      onChange={(e) => {
                        if (!isMinor) {
                          setFormData((prev) => ({
                            ...prev,
                            needsGuarantor: e.target.checked,
                          }))
                        }
                      }}
                      disabled={isMinor}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="needsGuarantor">
                      {isMinor
                        ? "Responsável financeiro obrigatório (menor de idade)"
                        : "Adicionar responsável financeiro"}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("student")}>
                  Voltar
                </Button>
                {isMinor || formData.needsGuarantor ? (
                  <Button onClick={() => setActiveTab("guarantor")}>Próximo</Button>
                ) : (
                  <Button onClick={handleSubmit}>Finalizar Matrícula</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guarantor" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guarantorName">
                    Nome do Responsável <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="guarantorName"
                    name="guarantorName"
                    value={formData.guarantorName}
                    onChange={handleChange}
                    className={formErrors.guarantorName ? "border-red-500" : ""}
                  />
                  {formErrors.guarantorName && <p className="text-sm text-red-500">{formErrors.guarantorName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guarantorRelationship">
                    Relação com o Aluno <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.guarantorRelationship}
                    onValueChange={(value) => handleSelectChange("guarantorRelationship", value)}
                  >
                    <SelectTrigger className={formErrors.guarantorRelationship ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecione a relação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pai">Pai</SelectItem>
                      <SelectItem value="mae">Mãe</SelectItem>
                      <SelectItem value="irmao">Irmão/Irmã</SelectItem>
                      <SelectItem value="tio">Tio/Tia</SelectItem>
                      <SelectItem value="avo">Avô/Avó</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.guarantorRelationship && (
                    <p className="text-sm text-red-500">{formErrors.guarantorRelationship}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guarantorPhone">
                    Telefone do Responsável <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="guarantorPhone"
                    name="guarantorPhone"
                    value={formData.guarantorPhone}
                    onChange={handleChange}
                    className={formErrors.guarantorPhone ? "border-red-500" : ""}
                  />
                  {formErrors.guarantorPhone && <p className="text-sm text-red-500">{formErrors.guarantorPhone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guarantorEmail">Email do Responsável</Label>
                  <Input
                    id="guarantorEmail"
                    name="guarantorEmail"
                    type="email"
                    value={formData.guarantorEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("course")}>
                  Voltar
                </Button>
                <Button onClick={handleSubmit}>Finalizar Matrícula</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
