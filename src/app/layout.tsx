import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Study Day Survey',
  description: 'Select your preferred study day - February 9 or 10, 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-medical-light min-h-screen">{children}</body>
    </html>
  )
}
