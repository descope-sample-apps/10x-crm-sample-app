"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCallback } from 'react';
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, DollarSign, BarChart3, Calendar, Settings, LogOut, X } from "lucide-react"
import { useDescope, useSession, useUser } from '@descope/nextjs-sdk/client';
import { useState } from 'react';
import { useTheme } from "next-themes"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: Users,
  },
  {
    title: "Deals",
    href: "/dashboard/deals",
    icon: DollarSign,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface DashboardNavProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

export function DashboardNav({ isSidebarOpen, setIsSidebarOpen }: DashboardNavProps) {
  const pathname = usePathname()
  const sdk = useDescope();
  const router = useRouter();
  const { theme } = useTheme()

  const handleLogout = useCallback(async () => {
		await sdk.logout();
    router.push("/");
	}, [sdk, router]);

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <img 
            src={theme === "dark" ? "/10x_CRM-logo.svg" : "/10xLightMode_CRM.svg"} 
            alt="10x-CRM Logo" 
            className="h-28 w-28" 
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="grid items-start gap-1 px-2 text-sm font-medium">
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary",
                )}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}

