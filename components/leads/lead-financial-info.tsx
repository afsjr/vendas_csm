import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, CreditCard, Award } from "lucide-react"
import type { Lead } from "@/lib/types"
import { formatCurrency, getPaymentStatusLabel, getPaymentStatusColor } from "@/lib/utils"

interface LeadFinancialInfoProps {
  lead: Lead
}

export function LeadFinancialInfo({ lead }: LeadFinancialInfoProps) {
  const { financialInfo } = lead

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Financeiras</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Valor Total</p>
              <p className="text-sm">{formatCurrency(lead.totalValue)}</p>
            </div>
          </div>
          <Badge className={getPaymentStatusColor(financialInfo.paymentStatus)}>
            {getPaymentStatusLabel(financialInfo.paymentStatus)}
          </Badge>
        </div>

        {financialInfo.paymentPlan && (
          <div className="flex items-center gap-3">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Plano de Pagamento</p>
              <p className="text-sm text-muted-foreground">
                {financialInfo.paymentPlan === "avista"
                  ? "À vista"
                  : financialInfo.paymentPlan === "parcelado"
                    ? "Parcelado"
                    : "Financiamento"}
              </p>
            </div>
          </div>
        )}

        {financialInfo.scholarship && (
          <div className="flex items-center gap-3">
            <Award className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Bolsa de Estudos</p>
              <p className="text-sm text-muted-foreground">{financialInfo.scholarshipPercentage}% de desconto</p>
            </div>
          </div>
        )}

        {lead.status === "matriculado" && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800">Matrícula Confirmada</p>
            <p className="text-xs text-green-700">Lead convertido em aluno com sucesso.</p>
          </div>
        )}

        {lead.status === "desistente" && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-800">Lead Desistente</p>
            <p className="text-xs text-red-700">Este lead desistiu do processo de matrícula.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
