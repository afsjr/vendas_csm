"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Database, Users, AlertCircle, CheckCircle, Copy } from "lucide-react"
import { useState, useEffect } from "react"

export default function TestSupabasePage() {
  const [isRunning, setIsRunning] = useState(false)
  const [isConfigured, setIsConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if Supabase environment variables are configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    setIsConfigured(!!(supabaseUrl && supabaseKey))
    setIsLoading(false)
  }, [])

  async function runTests() {
    setIsRunning(true)
    try {
      const response = await fetch("/api/test-supabase", { method: "POST" })
      const result = await response.json()
      if (result.success) {
        alert("Testes executados com sucesso!")
      } else {
        alert("Erro ao executar testes: " + result.message)
      }
    } catch (error) {
      alert("Erro ao executar testes: " + error)
    } finally {
      setIsRunning(false)
    }
  }

  async function seedDatabase() {
    try {
      const response = await fetch("/api/seed", { method: "POST" })
      const result = await response.json()
      if (result.success) {
        alert("Banco de dados populado com sucesso!")
      } else {
        alert("Erro ao popular banco: " + result.message)
      }
    } catch (error) {
      alert("Erro ao popular banco: " + error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copiado para a área de transferência!")
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verificando configuração...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuração do Supabase</h1>
        <p className="text-muted-foreground">Configure e teste a conexão com o banco de dados</p>
      </div>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Status da Configuração
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            {isConfigured ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Supabase configurado</span>
                <Badge className="bg-green-100 text-green-800">Conectado</Badge>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <span>Supabase não configurado</span>
                <Badge className="bg-orange-100 text-orange-800">Desconectado</Badge>
              </>
            )}
          </div>

          {!isConfigured && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h3 className="font-medium text-yellow-800 mb-2">Como configurar o Supabase:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
                  <li>
                    Crie uma conta no{" "}
                    <a href="https://supabase.com" target="_blank" className="underline" rel="noreferrer">
                      Supabase
                    </a>
                  </li>
                  <li>Crie um novo projeto</li>
                  <li>Vá para Settings → API</li>
                  <li>Copie a URL do projeto e a chave anônima</li>
                  <li>Configure as variáveis de ambiente:</li>
                </ol>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                    NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
                  </code>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard("NEXT_PUBLIC_SUPABASE_URL=")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
                  </code>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard("NEXT_PUBLIC_SUPABASE_ANON_KEY=")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Adicione essas variáveis ao seu arquivo .env.local na raiz do projeto.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button onClick={runTests} disabled={isRunning || !isConfigured}>
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Executando Testes...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Executar Testes
                </>
              )}
            </Button>

            <Button variant="outline" onClick={seedDatabase} disabled={!isConfigured}>
              <Users className="mr-2 h-4 w-4" />
              Popular Banco
            </Button>
          </div>

          {!isConfigured && (
            <p className="text-sm text-muted-foreground mt-2">
              Configure o Supabase primeiro para habilitar essas ações.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {isConfigured
              ? "O sistema está usando o Supabase como banco de dados. Todos os dados são persistidos."
              : "O sistema está usando dados simulados (mock data). Os dados não são persistidos entre sessões."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
