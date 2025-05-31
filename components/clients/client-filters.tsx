"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, BookOpen } from "lucide-react"

interface ClientFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  courseTypeFilter?: string
  onCourseTypeChange?: (value: string) => void
  onClearFilters: () => void
}

export function ClientFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  courseTypeFilter = "todos",
  onCourseTypeChange,
  onClearFilters,
}: ClientFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os Status</SelectItem>
          <SelectItem value="prospecto">Prospecto</SelectItem>
          <SelectItem value="contatado">Contatado</SelectItem>
          <SelectItem value="interessado">Interessado</SelectItem>
          <SelectItem value="inscrito">Inscrito</SelectItem>
          <SelectItem value="matriculado">Matriculado</SelectItem>
          <SelectItem value="desistente">Desistente</SelectItem>
        </SelectContent>
      </Select>

      {onCourseTypeChange && (
        <Select value={courseTypeFilter} onValueChange={onCourseTypeChange}>
          <SelectTrigger className="w-full sm:w-48">
            <BookOpen className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Tipo de curso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Cursos</SelectItem>
            <SelectItem value="tecnico">Técnico</SelectItem>
            <SelectItem value="graduacao">Graduação</SelectItem>
            <SelectItem value="pos">Pós-graduação</SelectItem>
            <SelectItem value="especializacao">Especialização</SelectItem>
            <SelectItem value="profissionalizante">Profissionalizante</SelectItem>
          </SelectContent>
        </Select>
      )}

      <Button variant="outline" onClick={onClearFilters}>
        Limpar Filtros
      </Button>
    </div>
  )
}
