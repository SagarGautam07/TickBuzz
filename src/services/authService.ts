export const authService = {
  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === "admin@tickbuzz.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true")
      localStorage.setItem("adminUser", JSON.stringify({ email, role: "admin" }))
      return { success: true }
    }

    return { success: false, error: "Invalid credentials" }
  },

  async logout(): Promise<void> {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminUser")
  },

  isAuthenticated(): boolean {
    return localStorage.getItem("adminAuth") === "true"
  },

  getCurrentUser(): { email: string; role: string } | null {
    const userStr = localStorage.getItem("adminUser")
    return userStr ? JSON.parse(userStr) : null
  },
}
