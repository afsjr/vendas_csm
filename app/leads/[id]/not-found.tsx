import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserX, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LeadNotFound() {
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
          <CardTitle className="flex items-center gap-2">
            <UserX className="h-5 w-5" />
            Lead Não Encontrado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">O lead que você está procurando não existe ou foi removido.</p>

          <div className="flex gap-2">
            <Button asChild>
              <Link href="/leads">Ver Todos os Leads</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/leads/novo">Criar Novo Lead</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
