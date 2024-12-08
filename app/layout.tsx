import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Deutscher Bundestag - DIP API Explorer',
  description: 'Explore parliamentary proceedings using the Deutscher Bundestag API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-4 md:p-8`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="mb-8">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
              </li>
              <li>
                <Link href="/statistics" className="text-blue-600 hover:text-blue-800">Statistics</Link>
              </li>
            </ul>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

