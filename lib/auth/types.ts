export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: "free" | "pro" | "enterprise"
  createdAt: string
  updatedAt: string
  emailVerified: boolean
  preferences: {
    language: "ar" | "en"
    theme: "light" | "dark" | "auto"
    notifications: {
      email: boolean
      push: boolean
      marketing: boolean
    }
  }
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
  plan?: "free" | "pro" | "enterprise"
}

export interface ResetPasswordData {
  email: string
}

export interface UpdatePasswordData {
  password: string
  confirmPassword: string
}
