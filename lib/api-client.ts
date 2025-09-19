interface GenerateWebsiteRequest {
  description: string
  language?: string
  userId?: string
}

interface GenerateWebsiteResponse {
  success: boolean
  sessionId: string
  message: string
  steps: Array<{
    id: string
    title: string
    description: string
    status: "pending" | "processing" | "completed"
    progress: number
  }>
  estimatedTime: string
  status: string
}

interface GenerationStatusResponse {
  sessionId: string
  status: string
  progress: number
  currentStep: string
  message: string
  estimatedTimeRemaining: string
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  async generateWebsite(request: GenerateWebsiteRequest): Promise<GenerateWebsiteResponse> {
    const response = await fetch(`${this.baseUrl}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to generate website")
    }

    return response.json()
  }

  async getGenerationStatus(sessionId: string): Promise<GenerationStatusResponse> {
    const response = await fetch(`${this.baseUrl}/generate?sessionId=${sessionId}`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to get generation status")
    }

    return response.json()
  }

  async pollGenerationStatus(
    sessionId: string,
    onUpdate: (status: GenerationStatusResponse) => void,
    intervalMs = 2000,
  ): Promise<void> {
    const poll = async () => {
      try {
        const status = await this.getGenerationStatus(sessionId)
        onUpdate(status)

        if (status.status === "completed" || status.status === "failed") {
          return
        }

        setTimeout(poll, intervalMs)
      } catch (error) {
        console.error("Polling error:", error)
        setTimeout(poll, intervalMs * 2) // Retry with longer interval
      }
    }

    poll()
  }
}

export const apiClient = new ApiClient()
