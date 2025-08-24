"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BarChart3, Settings, FileText } from "lucide-react"

export function ApplicantsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-work-sans)]">Gestión de Solicitantes</h2>
          <p className="text-muted-foreground">Administra los titulares de las marcas registradas</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximamente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta sección permitirá gestionar la información de los solicitantes y titulares de marcas.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function ReportsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BarChart3 className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-work-sans)]">Reportes y Estadísticas</h2>
          <p className="text-muted-foreground">Análisis detallado del sistema de registro de marcas</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximamente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta sección incluirá gráficos, estadísticas y reportes detallados sobre los registros de marcas.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-work-sans)]">Configuración del Sistema</h2>
          <p className="text-muted-foreground">Ajustes y configuraciones generales</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximamente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta sección permitirá configurar parámetros del sistema, usuarios y permisos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function RegistrationsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-work-sans)]">Gestión de Registros</h2>
          <p className="text-muted-foreground">Vista detallada de todos los registros de marcas</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximamente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta sección incluirá funcionalidades avanzadas para la gestión completa de registros de marcas.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
