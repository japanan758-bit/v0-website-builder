"use client"

import { useState, useEffect, useContext, createContext, type ReactNode } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client"
import type { User, AuthState, LoginCredentials, RegisterCredentials } from "@/lib/auth/types"

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  const supabase = getSupabaseClient()

  const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      if (!supabase) return null

      const { data, error } = await supabase.from("users").select("*").eq("id", supabaseUser.id).single()

      if (error) {
        console.error("Error fetching user profile:", error)
        return null
      }

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        avatar: data.avatar,
        plan: data.plan,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        emailVerified: data.email_verified,
        preferences: data.preferences || {
          language: "ar",
          theme: "light",
          notifications: {
            email: true,
            push: false,
            marketing: true,
          },
        },
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error)
      return null
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        return { success: false, error: "Authentication is not configured" }
      }

      setState((prev) => ({ ...prev, loading: true, error: null }))

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        setState((prev) => ({ ...prev, loading: false, error: error.message }))
        return { success: false, error: error.message }
      }

      if (data.user) {
        const userProfile = await fetchUserProfile(data.user)
        setState((prev) => ({ ...prev, user: userProfile, loading: false, error: null }))
      }

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع"
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      return { success: false, error: errorMessage }
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        return { success: false, error: "Authentication is not configured" }
      }

      setState((prev) => ({ ...prev, loading: true, error: null }))

      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.name,
            plan: credentials.plan || "free",
          },
        },
      })

      if (error) {
        setState((prev) => ({ ...prev, loading: false, error: error.message }))
        return { success: false, error: error.message }
      }

      if (data.user) {
        const { error: profileError } = await supabase.from("users").insert({
          id: data.user.id,
          email: credentials.email,
          name: credentials.name,
          plan: credentials.plan || "free",
          email_verified: false,
          preferences: {
            language: "ar",
            theme: "light",
            notifications: {
              email: true,
              push: false,
              marketing: true,
            },
          },
        })

        if (profileError) {
          console.error("Error creating user profile:", profileError)
        }

        const userProfile = await fetchUserProfile(data.user)
        setState((prev) => ({ ...prev, user: userProfile, loading: false, error: null }))
      }

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع"
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        setState({ user: null, loading: false, error: null })
        return
      }
      setState((prev) => ({ ...prev, loading: true }))
      await supabase.auth.signOut()
      setState({ user: null, loading: false, error: null })
    } catch (error) {
      console.error("Error during logout:", error)
      setState((prev) => ({ ...prev, loading: false }))
    }
  }

  const resetPassword = async (email: string) => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        return { success: false, error: "Authentication is not configured" }
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع"
      return { success: false, error: errorMessage }
    }
  }

  const updatePassword = async (password: string) => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        return { success: false, error: "Authentication is not configured" }
      }
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع"
      return { success: false, error: errorMessage }
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        return { success: false, error: "Authentication is not configured" }
      }
      if (!state.user) {
        return { success: false, error: "المستخدم غير مسجل الدخول" }
      }

      const { error } = await supabase
        .from("users")
        .update({
          name: data.name,
          avatar: data.avatar,
          preferences: data.preferences,
          updated_at: new Date().toISOString(),
        })
        .eq("id", state.user.id)

      if (error) {
        return { success: false, error: error.message }
      }

      setState((prev) => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...data } : null,
      }))

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع"
      return { success: false, error: errorMessage }
    }
  }

  const refreshUser = async () => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        setState((prev) => ({ ...prev, user: null }))
        return
      }
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const userProfile = await fetchUserProfile(user)
        setState((prev) => ({ ...prev, user: userProfile }))
      } else {
        setState((prev) => ({ ...prev, user: null }))
      }
    } catch (error) {
      console.error("Error refreshing user:", error)
    }
  }

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setState({ user: null, loading: false, error: null })
      return
    }

    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user)
          setState({ user: userProfile, loading: false, error: null })
        } else {
          setState({ user: null, loading: false, error: null })
        }
      } catch (error) {
        console.error("Error getting initial session:", error)
        setState({ user: null, loading: false, error: null })
      }
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const userProfile = await fetchUserProfile(session.user)
        setState({ user: userProfile, loading: false, error: null })
      } else if (event === "SIGNED_OUT") {
        setState({ user: null, loading: false, error: null })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    updateProfile,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
