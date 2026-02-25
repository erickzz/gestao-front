import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, TrendingDown, Wallet } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-20 md:pt-28 lg:pt-32">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column - Text content */}
          <div className="flex flex-col items-start">
            <Badge variant="secondary" className="mb-6 gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              API REST documentada
            </Badge>

            <h1
              className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Controle suas{" "}
              <span className="text-primary">finanças</span>{" "}
              em um só lugar
            </h1>

            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              Receitas, despesas, orçamentos e categorias organizados de forma simples.
              Parcelamento automático, recorrência inteligente e um dashboard completo para
              você tomar as melhores decisões.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2 text-base font-semibold">
                Comece gratuitamente
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 text-base font-medium">
                Ver demonstração
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Sem cartão de crédito
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Gratis para sempre
              </span>
            </div>
          </div>

          {/* Right column - Dashboard Preview */}
          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-primary/5">
              {/* Mini Dashboard Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saldo total</p>
                  <p className="text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    R$ 12.450,00
                  </p>
                </div>
                <Badge variant="secondary" className="gap-1 bg-accent text-primary">
                  <TrendingUp className="h-3 w-3" />
                  +12.5%
                </Badge>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Receitas</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-foreground">R$ 8.200</p>
                  <p className="text-xs text-primary">+8.2% este mês</p>
                </div>

                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Despesas</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-foreground">R$ 4.350</p>
                  <p className="text-xs text-destructive">-3.1% este mês</p>
                </div>
              </div>

              {/* Mini chart bars */}
              <div className="mt-5">
                <p className="mb-3 text-xs font-medium text-muted-foreground">Evolução mensal</p>
                <div className="flex items-end gap-2">
                  {[40, 55, 35, 65, 50, 75, 60, 80, 70, 90, 85, 95].map((height, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-sm bg-primary/20 transition-all"
                        style={{ height: `${height}px` }}
                      >
                        <div
                          className="w-full rounded-sm bg-primary"
                          style={{ height: `${height * 0.6}px` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                  <span>Jan</span>
                  <span>Dez</span>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">Orçamento Alimentação</p>
                  <p className="text-xs text-muted-foreground">R$ 850 / R$ 1.200</p>
                </div>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[71%] rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
