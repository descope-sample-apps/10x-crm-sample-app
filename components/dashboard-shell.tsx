"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"
import { useState } from "react"

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="relative flex min-h-screen w-full">
      {/* Mobile sidebar toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed left-4 top-4 z-[60] md:hidden",
          isSidebarOpen && "hidden"
        )}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <PanelLeft className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-[280px] transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <DashboardNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-x-hidden",
        "p-4 md:p-8",
        "pt-16 md:pt-8",
        "min-h-screen", // Ensure full height
        className
      )}>
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}

