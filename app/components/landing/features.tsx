import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRightLeft,
  Tags,
  Target,
  BarChart3,
  RefreshCcw,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: ArrowRightLeft,
    title: "Transações completas",
    description:
      "Lançamentos avulsos, parcelados em até 24x e recorrentes — mensal, trimestral ou anual. Tudo automatizado.",
  },
  {
    icon: Tags,
    title: "Categorias flexíveis",
    description:
      "Categorias padrão do sistema mais categorias personalizadas com subcategorias opcionais para organizar seus gastos.",
  },
  {
    icon: Target,
    title: "Orçamentos inteligentes",
    description:
      "Defina limites por categoria e mês. Acompanhe o uso em tempo real e receba alertas quando estiver perto do limite.",
  },
  {
    icon: BarChart3,
    title: "Dashboard completo",
    description:
      "Saldo, receitas, despesas, evolução mensal e status dos orçamentos em uma visão clara e objetiva.",
  },
  {
    icon: RefreshCcw,
    title: "Recorrência automática",
    description:
      "Configure uma vez e as transações recorrentes são criadas automaticamente. Nunca mais esqueça um lançamento.",
  },
  {
    icon: Shield,
    title: "Seguro e privado",
    description:
      "Cadastro e login com e-mail e senha. Seus dados financeiros são protegidos e só você tem acesso.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border/60 bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Funcionalidades
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tudo que você precisa para controlar seu dinheiro
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Módulos integrados que funcionam juntos para dar a você uma visão
            completa das suas finanças pessoais.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/60 bg-background transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
