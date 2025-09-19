import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Clear authentication cookies
    const response = NextResponse.json({ message: "Successfully signed out" }, { status: 200 })

    // Clear all auth-related cookies
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    response.cookies.set("refresh-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    response.cookies.set("user-session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Sign out error:", error)
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Redirect GET requests to POST for sign out
  return NextResponse.redirect(new URL("/login", request.url))
}
