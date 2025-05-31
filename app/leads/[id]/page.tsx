"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadDetailHeader } from "@/components/leads/lead-detail-header"
import { LeadContactInfo } from "@/components/leads/lead-contact-info"
import { LeadCourseInfo } from "@/components/leads/lead-course-info"
import { LeadFinancialInfo } from "@/components/leads/lead-financial-info"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Lead } from "@/lib/types"
import { getLead } from "@/lib/data-service"
import { Skeleton } from "@/components/ui/skeleton"

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [lead, setLead] = useState<Lead | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("contact")

  const leadId = params.id as string

  useEffect(() => {
    async function fetchLead() {
      try {
        setIsLoading(true)
        const data = await getLead(leadId)
        setLead(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching lead:", err)
        setError("Falha ao carregar dados do lead. Por favor, tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLead()
  }, [leadId])

  const handleEdit = () => {
    // Implementar edição do lead
    console.log("Editar lead:", leadId)
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
        <Skeleton className="h-[50px] w-full rounded-xl mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[300px] rounded-xl" />
          <Skeleton className="h-[300px] rounded-xl" />
        </div>
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">{error || "Lead não encontrado"}</h2>
          <p className="text-muted-foreground mt-2">
            {error ? "Ocorreu um erro ao carregar os dados." : "O lead que você está procurando não existe."}
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/leads">Voltar para a lista de leads</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      <LeadDetailHeader lead={lead} onEdit={handleEdit} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contact">Contato</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-4 mt-4">
          <LeadContactInfo lead={lead} />
        </TabsContent>

        <TabsContent value="courses" className="space-y-4 mt-4">
          <LeadCourseInfo lead={lead} />
        </TabsContent>

        <TabsContent value="financial" className="space-y-4 mt-4">
          <LeadFinancialInfo lead={lead} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
