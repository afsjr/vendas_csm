"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, AlertCircle, CheckCircle } from "lucide-react"

export function SupabaseStatus() {
  const [isConfigured, setIsConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if Supabase environment variables are configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    setIsConfigured(!!(supabaseUrl && supabaseKey))
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Status do Banco de Dados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isConfigured ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Supabase configurado</span>
                <Badge className="bg-green-100 text-green-800">Conectado</Badge>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <span>Usando dados simulados</span>
                <Badge className="bg-orange-100 text-orange-800">Mock Data</Badge>
              </>
            )}
          </div>
          {!isConfigured && (
            <Button variant="outline" size="sm" asChild>
              <a href="/test-supabase" target="_blank" rel="noreferrer">
                Configurar Supabase
              </a>
            </Button>
          )}
        </div>
        {!isConfigured && (
          <p className="text-sm text-muted-foreground mt-2">
            Para usar dados reais, configure as variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e
            NEXT_PUBLIC_SUPABASE_ANON_KEY.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
