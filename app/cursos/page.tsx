"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CourseCard } from "@/components/courses/course-card"
import { CourseFilters } from "@/components/courses/course-filters"
import { mockCourses } from "@/lib/mock-data"
import Link from "next/link"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("todos")
  const [formatFilter, setFormatFilter] = useState("todos")

  const filteredCourses = useMemo(() => {
    return mockCourses.filter((course) => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLevel = levelFilter === "todos" || course.level === levelFilter
      const matchesFormat = formatFilter === "todos" || course.format === formatFilter

      return matchesSearch && matchesLevel && matchesFormat
    })
  }, [searchTerm, levelFilter, formatFilter])

  const handleClearFilters = () => {
    setSearchTerm("")
    setLevelFilter("todos")
    setFormatFilter("todos")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
          <p className="text-muted-foreground">Gerencie os cursos oferecidos pela instituição</p>
        </div>
        <Button asChild>
          <Link href="/cursos/novo">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Curso
          </Link>
        </Button>
      </div>

      <CourseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        levelFilter={levelFilter}
        onLevelChange={setLevelFilter}
        formatFilter={formatFilter}
        onFormatChange={setFormatFilter}
        onClearFilters={handleClearFilters}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filteredCourses.length} curso(s) encontrado(s)</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum curso encontrado com os filtros aplicados.</p>
          <Button variant="outline" onClick={handleClearFilters} className="mt-4">
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  )
}
