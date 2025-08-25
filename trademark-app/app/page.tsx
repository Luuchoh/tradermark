"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { ApplicantsView, ReportsView, SettingsView, RegistrationsView } from "@/components/placeholder-views"
import { TrademarkRegistrationWizard } from "@/components/trademark-registration-wizard"

export default function TrademarkDashboard() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [showWizard, setShowWizard] = useState(false)

  const handleNewRegistration = () => {
    setShowWizard(true)
  }

  const handleCloseWizard = () => {
    setShowWizard(false)
    setCurrentView("dashboard")
  }

  const renderCurrentView = () => {
    if (showWizard) {
      return <TrademarkRegistrationWizard onClose={handleCloseWizard} />
    }

    switch (currentView) {
      case "dashboard":
        return <DashboardContent />
      case "registrations":
        return <RegistrationsView />
      case "applicants":
        return <ApplicantsView />
      case "reports":
        return <ReportsView />
      case "settings":
        return <SettingsView />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} onNewRegistration={handleNewRegistration} />

      <div className="flex-1 flex flex-col">
        {/* Header - only show when not in wizard */}
        {!showWizard && (
          <header className="border-b bg-card px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold font-[family-name:var(--font-work-sans)] text-foreground">
                  {currentView === "dashboard" && "Dashboard Principal"}
                  {currentView === "registrations" && "Gestión de Registros"}
                  {currentView === "applicants" && "Gestión de Solicitantes"}
                  {currentView === "reports" && "Reportes y Estadísticas"}
                  {currentView === "settings" && "Configuración del Sistema"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentView === "dashboard" && "Vista general del sistema de registro de marcas"}
                  {currentView === "registrations" && "Administra todos los registros de marcas"}
                  {currentView === "applicants" && "Gestiona la información de los titulares"}
                  {currentView === "reports" && "Análisis y estadísticas del sistema"}
                  {currentView === "settings" && "Configuraciones y ajustes generales"}
                </p>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">{renderCurrentView()}</main>
      </div>
    </div>
  )
}
