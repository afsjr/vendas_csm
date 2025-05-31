"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, Layout } from "lucide-react"

interface CourseFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  levelFilter: string
  onLevelChange: (value: string) => void
  formatFilter: string
  onFormatChange: (value: string) => void
  onClearFilters: () => void
}

export function CourseFilters({
  searchTerm,
  onSearchChange,
  levelFilter,
  onLevelChange,
  formatFilter,
  onFormatChange,
  onClearFilters,
}: CourseFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome do curso..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={levelFilter} onValueChange={onLevelChange}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Nível do curso" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os Níveis</SelectItem>
          <SelectItem value="tecnico">Técnico</SelectItem>
          <SelectItem value="graduacao">Graduação</SelectItem>
          <SelectItem value="pos">Pós-graduação</SelectItem>
          <SelectItem value="especializacao">Especialização</SelectItem>
          <SelectItem value="profissionalizante">Profissionalizante</SelectItem>
        </SelectContent>
      </Select>

      <Select value={formatFilter} onValueChange={onFormatChange}>
        <SelectTrigger className="w-full sm:w-48">
          <Layout className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Formato do curso" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os Formatos</SelectItem>
          <SelectItem value="presencial">Presencial</SelectItem>
          <SelectItem value="hibrido">Híbrido</SelectItem>
          <SelectItem value="online">Online</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={onClearFilters}>
        Limpar Filtros
      </Button>
    </div>
  )
}
