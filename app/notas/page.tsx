"use client"
import { useState, useEffect } from "react"
import { DialogTrigger } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getGrades, getMatriculations, createGrade } from "@/lib/data-service"
import type { Grade, Matriculation } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Search, FileDown, BarChart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function NotasPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [matriculationFilter, setMatriculationFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newGrade, setNewGrade] = useState({
    matriculationId: "",
    subjectName: "",
    period: "",
    grade: "",
    maxGrade: "10",
    status: "em_andamento",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [grades, setGrades] = useState<Grade[]>([])
  const [matriculations, setMatriculations] = useState<Matriculation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const [gradesData, matriculationsData] = await Promise.all([getGrades(), getMatriculations()])
        setGrades(gradesData)
        setMatriculations(matriculationsData)
        setError(null)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Falha ao carregar dados. Por favor, tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredGrades = grades.filter((grade) => {
    const matchesSearch =
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.subjectName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMatriculation = matriculationFilter === "all" || grade.matriculationId === matriculationFilter
    const matchesStatus = statusFilter === "all" || grade.status === statusFilter

    return matchesSearch && matchesMatriculation && matchesStatus
  })

  const handleNewGradeChange = (field: string, value: string) => {
    setNewGrade((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveGrade = async () => {
    // Validação básica
    if (!newGrade.matriculationId || !newGrade.subjectName || !newGrade.grade) {
      toast({
        title: "Erro ao salvar nota",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Find the matriculation to get student and course details
      const matriculation = matriculations.find((m) => m.id === newGrade.matriculationId)

      if (!matriculation) {
        throw new Error("Matrícula não encontrada")
      }

      // Create the grade
      const savedGrade = await createGrade({
        matriculationId: newGrade.matriculationId,
        studentId: matriculation.studentId,
        studentName: matriculation.studentName,
        courseId: matriculation.courseId,
        courseName: matriculation.courseName,
        subjectName: newGrade.subjectName,
        period: newGrade.period,
        grade: Number(newGrade.grade),
        maxGrade: Number(newGrade.maxGrade),
        status: newGrade.status,
        date: new Date(),
      })

      // Add the new grade to the state
      setGrades((prev) => [savedGrade, ...prev])

      toast({
        title: "Nota salva com sucesso!",
        description: "A nota foi registrada no sistema.",
      })

      setIsDialogOpen(false)

      // Reset do formulário
      setNewGrade({
        matriculationId: "",
        subjectName: "",
        period: "",
        grade: "",
        maxGrade: "10",
        status: "em_andamento",
      })
    } catch (err) {
      console.error("Error saving grade:", err)
      toast({
        title: "Erro ao salvar nota",
        description: "Ocorreu um erro ao salvar a nota. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
      case "reprovado":
        return <Badge className="bg-red-100 text-red-800">Reprovado</Badge>
      case "em_andamento":
        return <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const exportGrades = () => {
    toast({
      title: "Exportando notas...",
      description: "O arquivo será baixado em breve.",
    })

    // Simulação de exportação
    setTimeout(() => {
      toast({
        title: "Notas exportadas com sucesso!",
        description: "O arquivo foi baixado.",
      })
    }, 1500)
  }

  const generateReport = () => {
    toast({
      title: "Gerando relatório...",
      description: "O relatório está sendo preparado.",
    })

    // Simulação de geração de relatório
    setTimeout(() => {
      toast({
        title: "Relatório gerado com sucesso!",
        description: "O relatório está disponível para visualização.",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Notas</h1>
          <p className="text-muted-foreground">Cadastre e consulte notas dos alunos</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Nota
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Nova Nota</DialogTitle>
                <DialogDescription>Preencha os dados para registrar uma nova nota.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="matriculationId">Matrícula</Label>
                  <Select
                    value={newGrade.matriculationId}
                    onValueChange={(value) => handleNewGradeChange("matriculationId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma matrícula" />
                    </SelectTrigger>
                    <SelectContent>
                      {matriculations.map((matriculation) => (
                        <SelectItem key={matriculation.id} value={matriculation.id}>
                          {matriculation.studentName} - {matriculation.courseName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subjectName">Disciplina</Label>
                  <Input
                    id="subjectName"
                    value={newGrade.subjectName}
                    onChange={(e) => handleNewGradeChange("subjectName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Período</Label>
                  <Input
                    id="period"
                    value={newGrade.period}
                    onChange={(e) => handleNewGradeChange("period", e.target.value)}
                    placeholder="Ex: 2024.1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Nota</Label>
                    <Input
                      id="grade"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={newGrade.grade}
                      onChange={(e) => handleNewGradeChange("grade", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxGrade">Nota Máxima</Label>
                    <Input
                      id="maxGrade"
                      type="number"
                      min="1"
                      value={newGrade.maxGrade}
                      onChange={(e) => handleNewGradeChange("maxGrade", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newGrade.status} onValueChange={(value) => handleNewGradeChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aprovado">Aprovado</SelectItem>
                      <SelectItem value="reprovado">Reprovado</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveGrade} disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Salvar Nota"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={exportGrades}>
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>

          <Button variant="outline" onClick={generateReport}>
            <BarChart className="mr-2 h-4 w-4" />
            Relatório
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por aluno ou disciplina..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={matriculationFilter} onValueChange={setMatriculationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por matrícula" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as matrículas</SelectItem>
                {matriculations.map((matriculation) => (
                  <SelectItem key={matriculation.id} value={matriculation.id}>
                    {matriculation.studentName} - {matriculation.courseName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="reprovado">Reprovado</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          <p>{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="mt-2">
            Tentar novamente
          </Button>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-4">
                <Skeleton className="h-[300px] w-full rounded-xl" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead className="text-center">Nota</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.length > 0 ? (
                    filteredGrades.map((grade) => (
                      <TableRow key={grade.id}>
                        <TableCell className="font-medium">{grade.studentName}</TableCell>
                        <TableCell>{grade.courseName}</TableCell>
                        <TableCell>{grade.subjectName}</TableCell>
                        <TableCell>{grade.period}</TableCell>
                        <TableCell className="text-center">
                          {grade.grade} / {grade.maxGrade}
                        </TableCell>
                        <TableCell className="text-center">{getStatusBadge(grade.status)}</TableCell>
                        <TableCell className="text-center">{formatDate(grade.date)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        Nenhuma nota encontrada com os filtros aplicados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
