"use client"

import { create } from "zustand"

export interface TrademarkCreate {
  brand_name: string
  title: string
  status: "enabled" | "disabled"
}

export interface TrademarkUpdate {
  brand_name?: string
  title?: string
  status?: "enabled" | "disabled"
}

export interface Trademark extends TrademarkCreate {
  id: string
  created_at: string
  update_at: string
}


export interface AppState {
  trademarks: Trademark[]
  selectedTrademark: Trademark | undefined
  loading: boolean
  error?: string
  // actions
  getAllTrademarks: () => Promise<void>
  createTrademark: (trademark: TrademarkCreate) => Promise<Trademark>
  updateTrademark: (trademark_id: string, trademark: TrademarkUpdate) => Promise<Trademark>
  deleteTrademark: (trademark_id: string) => Promise<void>
  getOneTrademarkById: (trademark_id: string) => Promise<Trademark>
  getOneTrademarkByBrand: (brand_name: string) => Promise<Trademark>
}

export const useAppStore = create<AppState>((set, get) => ({
  trademarks: [],
  selectedTrademark: undefined,
  loading: false,
  error: undefined,

  getAllTrademarks: async () => {
    set({ loading: true, error: undefined })
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/trademarks`, { cache: "no-store" })
      if (!res.ok) throw new Error("Error al obtener marcas")
      const data = await res.json()
      set({ trademarks: data as Trademark[] })
    } catch (e: any) {
      set({ error: e?.message || "Error desconocido" })
    } finally {
      set({ loading: false })
    }
  },

  createTrademark: async (trademark: TrademarkCreate) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/trademarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trademark),
    })
    if (!res.ok) throw new Error("No se pudo crear la marca")
    const data = await res.json()
    return data as Trademark
  },

  updateTrademark: async (trademark_id: string, trademark: TrademarkUpdate) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/trademarks/${trademark_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trademark),
    })
    if (!res.ok) throw new Error("No se pudo actualizar la marca")
    const data = await res.json()
    return data as Trademark
  },

  deleteTrademark: async (trademark_id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/trademarks/${trademark_id}`, {
      method: "DELETE",
    })
    if (res.status !== 204) throw new Error("No se pudo eliminar la marca")
  },
  
  getOneTrademarkById: async (trademark_id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/trademarks/${trademark_id}`, {
      method: "GET",
    })
    if (!res.ok) throw new Error("Marca no encontrada")
    const data: Trademark = await res.json()
    set({ selectedTrademark: data })
    return data 
  },
  
  getOneTrademarkByBrand: async (brand_name: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/trademarks/${brand_name}`, {
      method: "GET",
    })
    if (!res.ok) throw new Error("Marca no encontrada")
    const data: Trademark = await res.json()
    set({ selectedTrademark: data })
    return data 
  },

}))