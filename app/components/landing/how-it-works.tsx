import { UserPlus, ListPlus, PieChart } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Crie sua conta",
    description:
      "Cadastre-se com seu e-mail e senha em menos de 30 segundos. Sem cartão, sem complicações.",
  },
  {
    number: "02",
    icon: ListPlus,
    title: "Lance suas transações",
    description:
      "Registre receitas e despesas avulsas, parceladas ou recorrentes. Configure categorias do seu jeito.",
  },
  {
    number: "03",
    icon: PieChart,
    title: "Acompanhe seus resultados",
    description:
      "Veja seu saldo, evolução mensal e status dos orçamentos no dashboard. Tome decisões com clareza.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Como funciona
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Simples de começar, poderoso de usar
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Três passos para ter o controle total das suas finanças pessoais.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[calc(50%+40px)] top-10 hidden h-px w-[calc(100%-80px)] bg-border md:block" />
              )}

              <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.number}
                </span>
              </div>

              <h3
                className="text-lg font-semibold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
