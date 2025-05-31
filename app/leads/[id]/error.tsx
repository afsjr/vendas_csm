"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LeadDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex-1 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/leads">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Leads
          </Link>
        </Button>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Erro ao Carregar Lead
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {error.message.includes("not found")
              ? "O lead que você está procurando não foi encontrado. Pode ter sido removido ou o link está incorreto."
              : "Ocorreu um erro ao carregar os dados do lead."}
          </p>

          <div className="flex gap-2">
            <Button onClick={reset} variant="outline">
              Tentar Novamente
            </Button>
            <Button asChild>
              <Link href="/leads">Voltar para Lista</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
