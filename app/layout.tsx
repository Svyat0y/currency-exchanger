import type { Metadata } from 'next'
import '../styles/global.scss'


export const metadata: Metadata = {
  title: 'SwapHub',
  description: 'SwapHub Exchanger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
