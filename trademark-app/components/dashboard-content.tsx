"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Search, MoreHorizontal, Edit, Trash2, CheckCircle, AlertCircle } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"

const getStatusBadge = (status: string) => {
  switch (status) {
    case "enabled":
      return (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Habilitada
        </Badge>
      )
    case "disabled":
      return (
        <Badge variant="secondary">
          <AlertCircle className="w-3 h-3 mr-1" />
          Deshabilitada
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export function DashboardContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const { trademarks, loading, error, getAllTrademarks, deleteTrademark, updateTrademark } = useAppStore()

  useEffect(() => {
    getAllTrademarks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredTrademarks = trademarks.filter(
    (trademark) =>
      trademark.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trademark.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{trademarks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Habilitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{trademarks.filter((t) => t.status === "enabled").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Deshabilitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{trademarks.filter((t) => t.status === "disabled").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Trademarks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-work-sans)]">Registros de Marcas</CardTitle>

          {/* Search Bar */}
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por marca o titular..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading && <div className="text-sm text-muted-foreground py-4">Cargando marcas...</div>}
          {error && <div className="text-sm text-red-600 py-2">Error: {error}</div>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-[family-name:var(--font-work-sans)]">Marca</TableHead>
                <TableHead className="font-[family-name:var(--font-work-sans)]">Titulo</TableHead>
                <TableHead className="font-[family-name:var(--font-work-sans)]">Estado</TableHead>
                <TableHead className="font-[family-name:var(--font-work-sans)]">Fecha Registro</TableHead>
                <TableHead className="font-[family-name:var(--font-work-sans)]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrademarks.map((trademark) => (
                <TableRow key={trademark.id}>
                  <TableCell className="font-medium">{trademark.brand_name}</TableCell>
                  <TableCell>{trademark.title}</TableCell>
                  <TableCell>{getStatusBadge(trademark.status)}</TableCell>
                  <TableCell>{new Date(trademark.created_at).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={async () => {
                            try {
                              await updateTrademark(
                                trademark.id,
                                { status: trademark.status === "enabled" ? "disabled" : "enabled" }
                              )
                              await getAllTrademarks()
                            } catch (e) {
                              console.error(e)
                            }
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Alternar estado
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={async () => {
                            try {
                              if (confirm("¿Deseas eliminar esta marca?")) {
                                await deleteTrademark(trademark.id)
                                await getAllTrademarks()
                              }
                            } catch (e) {
                              console.error(e)
                            }
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredTrademarks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron registros que coincidan con la búsqueda.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
