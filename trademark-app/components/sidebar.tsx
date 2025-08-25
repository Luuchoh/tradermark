"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Building2, Home, FileText, Users, Settings, BarChart3, ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
  onNewRegistration: () => void
}

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    description: "Vista general del sistema",
  },
  {
    id: "registrations",
    label: "Registros",
    icon: FileText,
    description: "Gestión de marcas registradas",
  },
  {
    id: "applicants",
    label: "Solicitantes",
    icon: Users,
    description: "Gestión de titulares",
  },
  {
    id: "reports",
    label: "Reportes",
    icon: BarChart3,
    description: "Estadísticas y análisis",
  },
  {
    id: "settings",
    label: "Configuración",
    icon: Settings,
    description: "Ajustes del sistema",
  },
]

export function Sidebar({ currentView, onViewChange, onNewRegistration }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-sidebar-primary" />
            <div>
              <h1 className="text-lg font-bold font-[family-name:var(--font-work-sans)] text-sidebar-foreground">
                Registro Marcas
              </h1>
              <p className="text-xs text-sidebar-foreground/70">Sistema de gestión</p>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0 hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-sidebar-foreground" />
          )}
        </Button>
      </div>

      {/* Quick Action */}
      <div className="p-4 border-b border-sidebar-border">
        <Button
          onClick={onNewRegistration}
          className={cn(
            "w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground",
            isCollapsed && "px-2",
          )}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Nuevo Registro</span>}
        </Button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id

            return (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                    isCollapsed && "px-2",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {!isCollapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                </Button>

                {!isCollapsed && isActive && (
                  <p className="text-xs text-sidebar-foreground/70 mt-1 ml-7">{item.description}</p>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/70 text-center">
            <p>Sistema de Registro de Marcas</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        )}
      </div>
    </div>
  )
}
