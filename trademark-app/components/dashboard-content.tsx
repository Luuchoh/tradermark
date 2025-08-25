"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Search, MoreHorizontal, Edit, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react"

// Mock data for existing trademarks
const mockTrademarks = [
  {
    id: 1,
    marca: "TechCorp Solutions",
    titular: "Juan Pérez García",
    estado: "Aprobada",
    fechaRegistro: "2024-01-15",
    acciones: ["Actualizar", "Eliminar"],
  },
  {
    id: 2,
    marca: "Innovate Pro",
    titular: "María González López",
    estado: "En Proceso",
    fechaRegistro: "2024-02-20",
    acciones: ["Actualizar", "Eliminar"],
  },
  {
    id: 3,
    marca: "Digital Ventures",
    titular: "Carlos Rodríguez Martín",
    estado: "Pendiente",
    fechaRegistro: "2024-03-10",
    acciones: ["Actualizar", "Eliminar"],
  },
  {
    id: 4,
    marca: "Creative Studio",
    titular: "Ana Fernández Silva",
    estado: "Aprobada",
    fechaRegistro: "2024-01-28",
    acciones: ["Actualizar", "Eliminar"],
  },
]

const getStatusBadge = (estado: string) => {
  switch (estado) {
    case "Aprobada":
      return (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Aprobada
        </Badge>
      )
    case "En Proceso":
      return (
        <Badge variant="secondary">
          <Clock className="w-3 h-3 mr-1" />
          En Proceso
        </Badge>
      )
    case "Pendiente":
      return (
        <Badge variant="outline">
          <AlertCircle className="w-3 h-3 mr-1" />
          Pendiente
        </Badge>
      )
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

export function DashboardContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTrademarks = mockTrademarks.filter(
    (trademark) =>
      trademark.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trademark.titular.toLowerCase().includes(searchTerm.toLowerCase()),
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
            <div className="text-2xl font-bold text-foreground">{mockTrademarks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aprobadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {mockTrademarks.filter((t) => t.estado === "Aprobada").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">En Proceso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {mockTrademarks.filter((t) => t.estado === "En Proceso" || t.estado === "Pendiente").length}
            </div>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-[family-name:var(--font-work-sans)]">Marca</TableHead>
                <TableHead className="font-[family-name:var(--font-work-sans)]">Titular</TableHead>
                <TableHead className="font-[family-name:var(--font-work-sans)]">Estado</TableHead>
                <TableHead className="font-[family-name:var(--font-work-sans)]">Fecha Registro</TableHead>
                <TableHead className="font-[family-name:var(--font-work-sans)]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrademarks.map((trademark) => (
                <TableRow key={trademark.id}>
                  <TableCell className="font-medium">{trademark.marca}</TableCell>
                  <TableCell>{trademark.titular}</TableCell>
                  <TableCell>{getStatusBadge(trademark.estado)}</TableCell>
                  <TableCell>{new Date(trademark.fechaRegistro).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Actualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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
