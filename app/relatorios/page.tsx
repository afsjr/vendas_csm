"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { FileDown, Printer } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function RelatoriosPage() {
  const [reportType, setReportType] = useState("matriculas")
  const [periodFilter, setPeriodFilter] = useState("month")
  const [courseFilter, setCourseFilter] = useState("all")
  const [representativeFilter, setRepresentativeFilter] = useState("all")

  // Dados simulados para os relatórios
  const matriculationsByMonth = [
    { month: "Jan", count: 12 },
    { month: "Fev", count: 8 },
    { month: "Mar", count: 15 },
    { month: "Abr", count: 10 },
    { month: "Mai", count: 9 },
    { month: "Jun", count: 14 },
  ]

  const revenueByMonth = [
    { month: "Jan", value: 120000 },
    { month: "Fev", value: 80000 },
    { month: "Mar", value: 150000 },
    { month: "Abr", value: 100000 },
    { month: "Mai", value: 90000 },
    { month: "Jun", value: 140000 },
  ]

  const leadConversionRate = [
    { status: "Prospecto", count: 120 },
    { status: "Contatado", count: 95 },
    { status: "Interessado", count: 70 },
    { status: "Inscrito", count: 45 },
    { status: "Matriculado", count: 30 },
  ]

  const exportReport = () => {
    toast({
      title: "Exportando relatório...",
      description: "O arquivo será baixado em breve.",
    })
    
    // Simulação de exportação
    setTimeout(() => {
      toast({
        title: "Relatório exportado com sucesso!",
        description: "O arquivo foi baixado.",
      })
    }, 1500)
  }

  const printReport = () => {
    toast({
      title: "Preparando impressão...",
      description: "A janela de impressão será aberta em breve.",
    })
    
    // Simulação de impressão
    setTimeout(() => {
      window.print()
    }, 1000)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Análise de desempenho e métricas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportReport}>
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" onClick={printReport}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Diário</SelectItem>
                <SelectItem value="week">Semanal</SelectItem>
                <SelectItem value="month">Mensal</SelectItem>
                <SelectItem value="quarter">Trimestral</SelectItem>
                <SelectItem value="year">Anual</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os cursos</SelectItem>
                <SelectItem value="tecnico">Técnico</SelectItem\
