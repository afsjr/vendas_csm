"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { mockMatriculations } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

export default function MatriculasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const filteredMatriculations = useMemo(() => {
    return mockMatriculations.filter((matriculation) => {
      const matchesSearch =
        matriculation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matriculation.courseName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || matriculation.status === statusFilter
      const matchesPayment = paymentFilter === "all" || matriculation.paymentStatus === paymentFilter

      return matchesSearch && matchesStatus && matchesPayment
    })
  }, [searchTerm, statusFilter, paymentFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativa":
        return <Badge className="bg-green-100 text-green-800">Ativa</Badge>
      case "trancada":
        return <Badge className="bg-yellow-100 text-yellow-800">Trancada</Badge>
      case "concluida":
        return <Badge className="bg-blue-100 text-blue-800">Concluída</Badge>
      case "cancelada":
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "completo":
        return <Badge className="bg-green-100 text-green-800">Completo</Badge>
      case "parcial":
        return <Badge className="bg-yellow-100 text-yellow-800">Parcial</Badge>
      case "bolsa":
        return <Badge className="bg-purple-100 text-purple-800">Bolsa</Badge>
      case "pendente":
        return <Badge className="bg-red-100 text-red-800">Pendente</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Matrículas</h1>
          <p className="text-muted-foreground">Gerencie as matrículas dos alunos</p>
        </div>
        <Button asChild>
          <Link href="/matriculas/nova">
            <Plus className="mr-2 h-4 w-4" />
            Nova Matrícula
          </Link>
        </Button>
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
                placeholder="Buscar por aluno ou curso..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="trancada">Trancada</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os pagamentos</SelectItem>
                <SelectItem value="completo">Completo</SelectItem>
                <SelectItem value="parcial">Parcial</SelectItem>
                <SelectItem value="bolsa">Bolsa</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
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
                  <TableHead>Data de Matrícula</TableHead>
                  <TableHead>Início do Curso</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Pagamento</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatriculations.length > 0 ? (
                  filteredMatriculations.map((matriculation) => (
                    <TableRow key={matriculation.id}>
                      <TableCell className="font-medium">{matriculation.studentName}</TableCell>
                      <TableCell>{matriculation.courseName}</TableCell>
                      <TableCell>{formatDate(matriculation.enrollmentDate)}</TableCell>
                      <TableCell>{formatDate(matriculation.startDate)}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(matriculation.status)}</TableCell>
                      <TableCell className="text-center">{getPaymentBadge(matriculation.paymentStatus)}</TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/matriculas/${matriculation.id}`}>Ver Detalhes</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Nenhuma matrícula encontrada com os filtros aplicados.
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
