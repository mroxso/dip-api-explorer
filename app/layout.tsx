import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bundestag Explorer',
  description: 'Explore parliamentary proceedings using the Deutscher Bundestag API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow px-4 md:px-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

