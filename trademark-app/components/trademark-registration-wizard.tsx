"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Check, Building2 } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { useToast } from "@/hooks/use-toast"

interface WizardProps {
  onClose: () => void
}

interface FormData {
  marca: string
  titular: string
}

export function TrademarkRegistrationWizard({ onClose }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    marca: "",
    titular: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { createTrademark, getAllTrademarks } = useAppStore()
  const { toast } = useToast()

  const steps = [
    { number: 1, title: "Información de la Marca", description: "Datos básicos de la marca a registrar" },
    { number: 2, title: "Información del Titular", description: "Datos del propietario de la marca" },
    { number: 3, title: "Resumen", description: "Verificación de datos ingresados" },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      await createTrademark({
        brand_name: formData.marca,
        title: formData.titular,
        status: "enabled",
      })
      await getAllTrademarks()
      toast({ title: "Registro creado", description: `La marca "${formData.marca}" fue creada correctamente.` })
      onClose()
    } catch (e: any) {
      toast({ title: "Error", description: e?.message || "No se pudo crear el registro", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold font-[family-name:var(--font-work-sans)] text-foreground">
                Servicios/Registro de Marca
              </h1>
              <p className="text-sm text-muted-foreground">Proceso de registro paso a paso</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold
                    ${
                      currentStep >= step.number
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border"
                    }
                  `}
                  >
                    {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`
                      w-16 h-0.5 mx-4
                      ${currentStep > step.number ? "bg-primary" : "bg-border"}
                    `}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold font-[family-name:var(--font-work-sans)]">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-muted-foreground text-sm">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {/* Step Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="marca" className="text-base font-medium">
                      Marca a Registrar
                    </Label>
                    <Input
                      id="marca"
                      value={formData.marca}
                      onChange={(e) => updateFormData("marca", e.target.value)}
                      placeholder="Ingrese el nombre de la marca"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="titular" className="text-base font-medium">
                      Titular de la marca
                    </Label>
                    <Input
                      id="titular"
                      value={formData.titular}
                      onChange={(e) => updateFormData("titular", e.target.value)}
                      placeholder="Ingrese el nombre del titular"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-work-sans)] mb-4">
                    Resumen del Registro
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Marca a Registrar</Label>
                      <p className="text-base font-medium">{formData.marca || "No especificado"}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Titular de la marca</Label>
                      <p className="text-base font-medium">{formData.titular || "No especificado"}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Atrás
                </Button>
              )}
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>

            <div className="flex space-x-4">
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={(currentStep === 1 && !formData.marca) || (currentStep === 2 && !formData.titular)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                  {isSubmitting ? "Creando..." : "Crear"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
