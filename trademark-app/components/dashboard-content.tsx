"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Search, MoreHorizontal, Edit, Trash2, CheckCircle, AlertCircle, Check, X } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { useToast } from "@/hooks/use-toast"

interface EditableCellProps {
  value: string
  onSave: (newValue: string) => Promise<void>
  className?: string
}

const EditableCell = ({ value, onSave, className = "" }: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    if (inputValue.trim() === value) {
      setIsEditing(false)
      return
    }

    try {
      setIsSaving(true)
      await onSave(inputValue)
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el campo",
        variant: "destructive",
      })
      setInputValue(value) // Revert to original value on error
    } finally {
      setIsSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setInputValue(value)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          disabled={isSaving}
          className="h-8"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            setInputValue(value)
            setIsEditing(false)
          }}
          disabled={isSaving}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div 
      className={`cursor-pointer hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded ${className}`}
      onClick={() => setIsEditing(true)}
    >
      {value}
    </div>
  )
}

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
  const { toast } = useToast()

  useEffect(() => {
    getAllTrademarks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredTrademarks = trademarks.filter(
    (trademark) =>
      trademark.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trademark.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUpdateField = async (id: string, field: 'brand_name' | 'title', value: string) => {
    if (!value.trim()) {
      toast({
        title: "Error",
        description: `El campo no puede estar vacío`,
        variant: "destructive",
      })
      throw new Error("Field cannot be empty")
    }
    
    await updateTrademark(id, { [field]: value })
    await getAllTrademarks()
    toast({
      title: "Actualizado",
      description: `El campo se ha actualizado correctamente`,
    })
  }

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
                placeholder="Buscar por marca o titulo..."
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
                  <TableCell className="font-medium">
                    <EditableCell
                      value={trademark.brand_name}
                      onSave={(newValue) => handleUpdateField(trademark.id, 'brand_name', newValue)}
                    />
                  </TableCell>
                  <TableCell>
                    <EditableCell
                      value={trademark.title}
                      onSave={(newValue) => handleUpdateField(trademark.id, 'title', newValue)}
                    />
                  </TableCell>
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
                              toast({
                                title: "Estado actualizado",
                                description: `El estado se ha cambiado a ${trademark.status === "enabled" ? "deshabilitado" : "habilitado"}`,
                              })
                            } catch (e) {
                              console.error(e)
                              toast({
                                title: "Error",
                                description: "No se pudo actualizar el estado",
                                variant: "destructive",
                              })
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
                                toast({
                                  title: "Marca eliminada",
                                  description: "La marca ha sido eliminada correctamente",
                                })
                              }
                            } catch (e) {
                              console.error(e)
                              toast({
                                title: "Error",
                                description: "No se pudo eliminar la marca",
                                variant: "destructive",
                              })
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
