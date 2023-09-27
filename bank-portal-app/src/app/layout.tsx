import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/common/Navbar'

import "@fontsource/space-grotesk";
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{fontFamily:'Space Grotesk'}}>
        <Providers>
        <Navbar/>
          {children}
        </Providers>
        </body>
    </html>
  )
}
