"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Home,
  Car,
  Utensils,
} from "lucide-react"

const budgets = [
  { name: "Alimentação", icon: Utensils, spent: 850, limit: 1200, color: "bg-primary" },
  { name: "Moradia", icon: Home, spent: 2100, limit: 2500, color: "bg-chart-2" },
  { name: "Transporte", icon: Car, spent: 380, limit: 600, color: "bg-chart-3" },
  { name: "Compras", icon: ShoppingCart, spent: 420, limit: 500, color: "bg-chart-5" },
]

const transactions = [
  { name: "Salário", amount: "+R$ 5.200,00", type: "income" as const, date: "01 Fev" },
  { name: "Supermercado", amount: "-R$ 342,50", type: "expense" as const, date: "03 Fev" },
  { name: "Freelance", amount: "+R$ 1.800,00", type: "income" as const, date: "05 Fev" },
  { name: "Aluguel", amount: "-R$ 1.500,00", type: "expense" as const, date: "05 Fev" },
  { name: "Netflix", amount: "-R$ 39,90", type: "expense" as const, date: "07 Fev" },
]

export function DashboardPreview() {
  return (
    <section id="dashboard" className="border-t border-border/60 bg-card px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Dashboard
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Visão completa das suas finanças
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Acompanhe receitas, despesas, evolução mensal e orçamentos em um único painel.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="mt-14 rounded-2xl border border-border bg-background p-4 shadow-xl shadow-primary/5 md:p-6">
          {/* Top stats row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border/60">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Saldo</p>
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-1 text-2xl font-bold text-foreground">R$ 12.450</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-primary">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+12.5% este mês</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Receitas</p>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-1 text-2xl font-bold text-foreground">R$ 8.200</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-primary">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+8.2% este mês</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Despesas</p>
                  <TrendingDown className="h-4 w-4 text-destructive" />
                </div>
                <p className="mt-1 text-2xl font-bold text-foreground">R$ 4.350</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-destructive">
                  <ArrowDownRight className="h-3 w-3" />
                  <span>-3.1% este mês</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Orçamentos</p>
                  <Badge variant="secondary" className="text-xs">4 ativos</Badge>
                </div>
                <p className="mt-1 text-2xl font-bold text-foreground">68%</p>
                <p className="mt-1 text-xs text-muted-foreground">utilizado em média</p>
              </CardContent>
            </Card>
          </div>

          {/* Bottom section */}
          <div className="mt-4 grid gap-4 lg:grid-cols-5">
            {/* Recent transactions */}
            <Card className="border-border/60 lg:col-span-3">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Transações recentes</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex flex-col gap-3">
                  {transactions.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border/40 bg-secondary/30 px-3 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${tx.type === "income" ? "bg-primary/10" : "bg-destructive/10"}`}>
                          {tx.type === "income" ? (
                            <ArrowUpRight className="h-4 w-4 text-primary" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{tx.name}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <p className={`text-sm font-semibold ${tx.type === "income" ? "text-primary" : "text-destructive"}`}>
                        {tx.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Budgets */}
            <Card className="border-border/60 lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Orçamentos do mês</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex flex-col gap-4">
                  {budgets.map((budget) => {
                    const percentage = Math.round((budget.spent / budget.limit) * 100)
                    return (
                      <div key={budget.name} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary">
                              <budget.icon className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{budget.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            R$ {budget.spent.toLocaleString("pt-BR")} / R$ {budget.limit.toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <Progress
                          value={percentage}
                          className="h-2"
                        />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
