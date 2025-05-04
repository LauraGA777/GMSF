import type { Beneficiary, BeneficiaryFormData, Membership } from "../types/beneficiary"
import { mockBeneficiaries, availableMemberships } from "../data/mockBeneficiaries"

// Simulación de un servicio de API para beneficiarios
class BeneficiaryService {
  private beneficiaries: Beneficiary[] = [...mockBeneficiaries]
  private memberships: Membership[] = [...availableMemberships]
  private localStorageKey = "gym_beneficiaries"

  constructor() {
    // Cargar datos del localStorage si existen
    this.loadFromLocalStorage()
  }

  private loadFromLocalStorage() {
    try {
      const storedBeneficiaries = localStorage.getItem(this.localStorageKey)
      if (storedBeneficiaries) {
        this.beneficiaries = JSON.parse(storedBeneficiaries)
      }
    } catch (error) {
      console.error("Error loading beneficiaries from localStorage:", error)
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.beneficiaries))
    } catch (error) {
      console.error("Error saving beneficiaries to localStorage:", error)
    }
  }

  async getBeneficiaries(): Promise<Beneficiary[]> {
    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.beneficiaries
  }

  async getBeneficiaryById(id: string): Promise<Beneficiary | undefined> {
    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.beneficiaries.find((beneficiary) => beneficiary.id === id)
  }

  async createBeneficiary(beneficiaryData: BeneficiaryFormData): Promise<Beneficiary> {
    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newBeneficiary: Beneficiary = {
      id: Date.now().toString(),
      ...beneficiaryData,
      createdAt: new Date(),
    }

    this.beneficiaries.push(newBeneficiary)
    this.saveToLocalStorage()
    return newBeneficiary
  }

  async updateBeneficiary(id: string, beneficiaryData: BeneficiaryFormData): Promise<Beneficiary> {
    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.beneficiaries.findIndex((beneficiary) => beneficiary.id === id)
    if (index === -1) {
      throw new Error(`Beneficiary with id ${id} not found`)
    }

    const updatedBeneficiary: Beneficiary = {
      ...this.beneficiaries[index],
      ...beneficiaryData,
    }

    this.beneficiaries[index] = updatedBeneficiary
    this.saveToLocalStorage()
    return updatedBeneficiary
  }

  async deleteBeneficiary(id: string): Promise<void> {
    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.beneficiaries.findIndex((beneficiary) => beneficiary.id === id)
    if (index === -1) {
      throw new Error(`Beneficiary with id ${id} not found`)
    }

    this.beneficiaries.splice(index, 1)
    this.saveToLocalStorage()
  }

  async freezeMembership(id: string, freezeDetails: string): Promise<Beneficiary> {
    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.beneficiaries.findIndex((beneficiary) => beneficiary.id === id)
    if (index === -1) {
      throw new Error(`Beneficiary with id ${id} not found`)
    }

    const updatedBeneficiary = {
      ...this.beneficiaries[index],
      status: "frozen" as const,
      freezeDetails,
    }

    this.beneficiaries[index] = updatedBeneficiary
    this.saveToLocalStorage()
    return updatedBeneficiary
  }

  async unfreezeMembership(id: string): Promise<Beneficiary> {
    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.beneficiaries.findIndex((beneficiary) => beneficiary.id === id)
    if (index === -1) {
      throw new Error(`Beneficiary with id ${id} not found`)
    }

    const updatedBeneficiary = {
      ...this.beneficiaries[index],
      status: "active" as const,
      freezeDetails: "",
    }

    this.beneficiaries[index] = updatedBeneficiary
    this.saveToLocalStorage()
    return updatedBeneficiary
  }

  async getMemberships(): Promise<Membership[]> {
    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.memberships
  }
}

// Crear una instancia del servicio
const beneficiaryServiceInstance = new BeneficiaryService()

// Exportar el servicio
export const beneficiaryService = {
  getBeneficiaries: () => beneficiaryServiceInstance.getBeneficiaries(),
  getBeneficiaryById: (id: string) => beneficiaryServiceInstance.getBeneficiaryById(id),
  createBeneficiary: (data: BeneficiaryFormData) => beneficiaryServiceInstance.createBeneficiary(data),
  updateBeneficiary: (id: string, data: BeneficiaryFormData) => beneficiaryServiceInstance.updateBeneficiary(id, data),
  deleteBeneficiary: (id: string) => beneficiaryServiceInstance.deleteBeneficiary(id),
  freezeMembership: (id: string, freezeDetails: string) =>
    beneficiaryServiceInstance.freezeMembership(id, freezeDetails),
  unfreezeMembership: (id: string) => beneficiaryServiceInstance.unfreezeMembership(id),
  getMemberships: () => beneficiaryServiceInstance.getMemberships(),
}
