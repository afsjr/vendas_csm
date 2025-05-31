"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CourseCard } from "@/components/courses/course-card"
import { CourseFilters } from "@/components/courses/course-filters"
import Link from "next/link"
import { getCourses } from "@/lib/data-service"
import type { Course } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("todos")
  const [formatFilter, setFormatFilter] = useState("todos")
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true)
        const data = await getCourses()
        setCourses(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching courses:", err)
        setError("Falha ao carregar cursos. Por favor, tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === "todos" || course.level === levelFilter
    const matchesFormat = formatFilter === "todos" || course.format === formatFilter

    return matchesSearch && matchesLevel && matchesFormat
  })

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
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Carregando cursos..." : `${filteredCourses.length} curso(s) encontrado(s)`}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          <p>{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="mt-2">
            Tentar novamente
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[250px] rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {!isLoading && filteredCourses.length === 0 && !error && (
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
