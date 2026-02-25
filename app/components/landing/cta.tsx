import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="border-t border-border/60 bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Pronto para transformar suas finanças?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
          Junte-se a milhares de pessoas que já organizam suas finanças com o Fintra.
          Comece gratis, sem cartão de crédito.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="gap-2 text-base font-semibold">
            Criar minha conta
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="text-base font-medium">
            Falar com o time
          </Button>
        </div>
      </div>
    </section>
  )
}
