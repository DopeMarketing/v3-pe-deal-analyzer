import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'V3 PE Deal Analyzer',
  description: 'Private equity deal analysis and portfolio management platform',
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-900">V3 PE Analyzer</h1>
              <div className="flex space-x-4">
                <a href="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</a>
                <a href="/deals" className="text-blue-600 hover:text-blue-800">Deals</a>
                <a href="/portfolio" className="text-blue-600 hover:text-blue-800">Portfolio</a>
                <a href="/reports" className="text-blue-600 hover:text-blue-800">Reports</a>
              </div>
            </div>
          </nav>
          <main className="container mx-auto px-6 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}