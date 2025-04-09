"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { UserProfile } from '@descope/nextjs-sdk';
import { useDescope } from '@descope/nextjs-sdk/client';

export default function SettingsPage() {
  const sdk = useDescope();
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    await sdk.logout();
    router.push("/");
  }, [sdk, router]);
  return (
    
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences." />

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your basic account settings and information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <UserProfile
            widgetId="user-profile-widget"
            onLogout={() => {
              handleLogout();
              window.location.href = "/login";
            }}
          />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

