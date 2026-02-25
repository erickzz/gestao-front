import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Inter, DM_Sans } from 'next/font/google'
import { QueryProvider } from './components/providers/query-provider'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const viewport: Viewport = {
    themeColor: '#3a9a6e',
    userScalable: true,
}

export const metadata: Metadata = {
    title: 'Fintra - Controle suas finanças em um só lugar',
    description: 'App para controle de finanças pessoais: receitas, despesas, orçamentos e categorias em um só lugar. Parcelamento, recorrência e dashboard completo.',
    icons: {
        icon: [
            {
                url: '/icon-light-32x32.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/icon-dark-32x32.png',
                media: '(prefers-color-scheme: dark)',
            },
            {
                url: '/icon.svg',
                type: 'image/svg+xml',
            },
        ],
        apple: '/apple-icon.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={`${_inter.variable} ${_dmSans.variable} font-sans antialiased`} suppressHydrationWarning>
                <QueryProvider>
                    <Suspense fallback={null}>
                        {children}
                    </Suspense>
                </QueryProvider>
            </body>
        </html>
    )
}
