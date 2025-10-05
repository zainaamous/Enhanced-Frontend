"use client"

import * as React from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [isConnected, setIsConnected] = React.useState(true)

  // Mock connection status - in real app, this would come from WebSocket or API
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Simulate connection status changes
      setIsConnected(prev => Math.random() > 0.1 ? prev : !prev)
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleNotificationsClick = () => {
    console.log("Notifications clicked")
  }

  const handleSettingsClick = () => {
    console.log("Settings clicked")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isConnected={isConnected}
        onMenuClick={handleMenuClick}
        onNotificationsClick={handleNotificationsClick}
        onSettingsClick={handleSettingsClick}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className={cn(
          "flex-1 overflow-auto transition-all duration-300",
          sidebarOpen ? "ml-0" : "ml-0",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  )
}
