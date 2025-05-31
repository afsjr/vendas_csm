"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { LeadCard } from "@/components/leads/lead-card"
import { LeadFilters } from "@/components/leads/lead-filters"
import Link from "next/link"
import { getLeads } from "@/lib/data-service"
import type { Lead } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [courseTypeFilter, setCourseTypeFilter] = useState("todos")
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLeads() {
      try {
        setIsLoading(true)
        const data = await getLeads()
        setLeads(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching leads:", err)
        setError("Falha ao carregar leads. Por favor, tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || lead.status === statusFilter

    const matchesCourseType =
      courseTypeFilter === "todos" || lead.preferredCourseTypes.includes(courseTypeFilter as any)

    return matchesSearch && matchesStatus && matchesCourseType
  })

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("todos")
    setCourseTypeFilter("todos")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Gerencie seus leads e oportunidades de matrícula</p>
        </div>
        <Button asChild>
          <Link href="/leads/novo">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Lead
          </Link>
        </Button>
      </div>

      <LeadFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        courseTypeFilter={courseTypeFilter}
        onCourseTypeChange={setCourseTypeFilter}
        onClearFilters={handleClearFilters}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Carregando leads..." : `${filteredLeads.length} lead(s) encontrado(s)`}
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
          {filteredLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}

      {!isLoading && filteredLeads.length === 0 && !error && (
        <div className="text-center py-12">
          {leads.length === 0 ? (
            <>
              <p className="text-muted-foreground mb-4">Nenhum lead cadastrado ainda.</p>
              <Button asChild>
                <Link href="/leads/novo">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Lead
                </Link>
              </Button>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">Nenhum lead encontrado com os filtros aplicados.</p>
              <Button variant="outline" onClick={handleClearFilters} className="mt-4">
                Limpar Filtros
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
