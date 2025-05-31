"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockGrades, mockMatriculations } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, FileDown, BarChart } from "lucide-react"

export default function NotasPage() {
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

  const filteredGrades = mockGrades.filter((grade) => {
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

  const handleSaveGrade = () => {
    // Validação básica
    if (!newGrade.matriculationId || !newGrade.subjectName || !newGrade.grade) {
      toast({
        title: "Erro ao salvar nota",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Simulação de salvamento
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
                      {mockMatriculations.map((matriculation) => (
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
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveGrade}>Salvar Nota</Button>
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
                {mockMatriculations.map((matriculation) => (
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

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
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
                      <TableCell className="text-center">{new Date(grade.date).toLocaleDateString("pt-BR")}</TableCell>
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
