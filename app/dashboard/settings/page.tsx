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

      <div className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your basic account settings and information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="overflow-x-auto">
              <div className="min-w-[280px]">
                <UserProfile
                  widgetId="user-profile-widget"
                  onLogout={() => {
                    handleLogout();
                    window.location.href = "/login";
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

