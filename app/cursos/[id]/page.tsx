"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockCourses, mockMatriculations } from "@/lib/mock-data"
import { formatCurrency, formatDate, getCourseLevelLabel, getCourseFormatLabel } from "@/lib/utils"
import { ArrowLeft, Calendar, Clock, DollarSign, Edit, GraduationCap, Users } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("info")

  const courseId = params.id as string
  const course = mockCourses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Curso não encontrado</h2>
          <p className="text-muted-foreground mt-2">O curso que você está procurando não existe.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/cursos">Voltar para a lista de cursos</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Filtrar matrículas para este curso
  const courseMatriculations = mockMatriculations.filter((m) => m.courseId === courseId)

  const daysUntilStart = Math.ceil(
    (new Date(course.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )
  const daysUntilDeadline = Math.ceil(
    (new Date(course.enrollmentDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{course.name}</h1>
            <Badge className="bg-blue-100 text-blue-800">{formatCurrency(course.price)}</Badge>
          </div>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline">{getCourseLevelLabel(course.level)}</Badge>
            <Badge variant="outline">{getCourseFormatLabel(course.format)}</Badge>
          </div>
        </div>
        <div className="flex gap-2 self-end md:self-auto">
          <Button size="sm" variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Ver Matrículas
          </Button>
          <Button size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Editar Curso
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="matriculas">Matrículas</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Duração</p>
                    <p className="text-sm text-muted-foreground">{course.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Data de Início</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(course.startDate)}{" "}
                      {daysUntilStart > 0 && <span className="text-green-600">({daysUntilStart} dias)</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Prazo de Inscrição</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(course.enrollmentDeadline)}{" "}
                      {daysUntilDeadline > 0 ? (
                        <span className={daysUntilDeadline <= 7 ? "text-red-600" : "text-yellow-600"}>
                          ({daysUntilDeadline} dias)
                        </span>
                      ) : (
                        <span className="text-red-600">(Encerrado)</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Valor do Curso</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(course.price)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Total de Matrículas</p>
                    <p className="text-sm text-muted-foreground">{courseMatriculations.length}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Matrículas Ativas</p>
                    <p className="text-sm text-muted-foreground">
                      {courseMatriculations.filter((m) => m.status === "ativa").length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Receita Total</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(course.price * courseMatriculations.length)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matriculas" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Matrículas</CardTitle>
            </CardHeader>
            <CardContent>
              {courseMatriculations.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aluno</TableHead>
                        <TableHead>Data de Matrícula</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pagamento</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courseMatriculations.map((matriculation) => (
                        <TableRow key={matriculation.id}>
                          <TableCell className="font-medium">{matriculation.studentName}</TableCell>
                          <TableCell>{formatDate(matriculation.enrollmentDate)}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                matriculation.status === "ativa"
                                  ? "bg-green-100 text-green-800"
                                  : matriculation.status === "trancada"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : matriculation.status === "concluida"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-red-100 text-red-800"
                              }
                            >
                              {matriculation.status.charAt(0).toUpperCase() + matriculation.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                matriculation.paymentStatus === "completo"
                                  ? "bg-green-100 text-green-800"
                                  : matriculation.paymentStatus === "parcial"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : matriculation.paymentStatus === "bolsa"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-red-100 text-red-800"
                              }
                            >
                              {matriculation.paymentStatus.charAt(0).toUpperCase() +
                                matriculation.paymentStatus.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/matriculas/${matriculation.id}`}>Ver Detalhes</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Nenhuma matrícula encontrada para este curso.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financeiro" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Financeiras</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <p className="text-sm font-medium">Valor do Curso</p>
                  <p className="text-2xl font-bold">{formatCurrency(course.price)}</p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-sm font-medium">Receita Total</p>
                  <p className="text-2xl font-bold">{formatCurrency(course.price * courseMatriculations.length)}</p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-sm font-medium">Receita Média por Aluno</p>
                  <p className="text-2xl font-bold">
                    {courseMatriculations.length > 0 ? formatCurrency(course.price) : formatCurrency(0)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Distribuição de Pagamentos</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Valor Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Completo</TableCell>
                        <TableCell>
                          {courseMatriculations.filter((m) => m.paymentStatus === "completo").length}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(
                            course.price * courseMatriculations.filter((m) => m.paymentStatus === "completo").length,
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Parcial</TableCell>
                        <TableCell>
                          {courseMatriculations.filter((m) => m.paymentStatus === "parcial").length}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(
                            course.price *
                              courseMatriculations.filter((m) => m.paymentStatus === "parcial").length *
                              0.5,
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bolsa</TableCell>
                        <TableCell>{courseMatriculations.filter((m) => m.paymentStatus === "bolsa").length}</TableCell>
                        <TableCell>
                          {formatCurrency(
                            course.price * courseMatriculations.filter((m) => m.paymentStatus === "bolsa").length * 0.2,
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pendente</TableCell>
                        <TableCell>
                          {courseMatriculations.filter((m) => m.paymentStatus === "pendente").length}
                        </TableCell>
                        <TableCell>{formatCurrency(0)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
