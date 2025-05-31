"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ClientCard } from "@/components/clients/client-card"
import { ClientFilters } from "@/components/clients/client-filters"
import { mockLeads } from "@/lib/mock-data"
import Link from "next/link"

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "todos" || lead.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("todos")
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

      <ClientFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filteredLeads.length} lead(s) encontrado(s)</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLeads.map((lead) => (
          <ClientCard key={lead.id} client={lead} />
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum lead encontrado com os filtros aplicados.</p>
          <Button variant="outline" onClick={handleClearFilters} className="mt-4">
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  )
}
