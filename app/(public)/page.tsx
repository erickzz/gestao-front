import { redirect } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { Pricing } from "@/components/landing/pricing"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default async function Home() {
  const { data: session } = await authClient.getSession()
  if (session) {
    redirect("/home")
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        {/* <Pricing /> */}
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
