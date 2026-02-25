import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Gratis",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar a organizar suas finanças.",
    features: [
      "Até 50 transações/mês",
      "Categorias padrão",
      "Dashboard básico",
      "1 orçamento ativo",
    ],
    cta: "Começar gratis",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "R$ 19,90",
    period: "/mês",
    description: "Para quem quer controle total das suas finanças.",
    features: [
      "Transações ilimitadas",
      "Categorias personalizadas",
      "Dashboard completo",
      "Orçamentos ilimitados",
      "Parcelamento até 24x",
      "Recorrência automática",
      "Acesso à API REST",
    ],
    cta: "Assinar Pro",
    highlighted: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Planos
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Escolha o plano ideal para você
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Comece gratis e faça upgrade quando precisar de mais controle.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden border-border/60 ${
                plan.highlighted
                  ? "border-primary/40 shadow-xl shadow-primary/10"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute right-4 top-4">
                  <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                </div>
              )}
              <CardHeader className="pb-2">
                <p className="text-sm font-semibold text-muted-foreground">{plan.name}</p>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-4xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full ${plan.highlighted ? "bg-primary/10" : "bg-secondary"}`}>
                        <Check className={`h-3 w-3 ${plan.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
