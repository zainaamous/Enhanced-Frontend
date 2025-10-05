import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YOUMNA AI - Executive Intelligence Assistant",
  description: "Your intelligent executive assistant powered by advanced AI technology. Manage conversations, documents, and workflows with ease.",
  keywords: ["AI", "Executive Assistant", "RAG", "Knowledge Management", "Workflow Automation"],
  authors: [{ name: "YOUMNA AI Team" }],
  creator: "YOUMNA AI",
  publisher: "YOUMNA AI",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youmna-ai.com",
    title: "YOUMNA AI - Executive Intelligence Assistant",
    description: "Your intelligent executive assistant powered by advanced AI technology.",
    siteName: "YOUMNA AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "YOUMNA AI - Executive Intelligence Assistant",
    description: "Your intelligent executive assistant powered by advanced AI technology.",
    creator: "@youmna_ai",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
