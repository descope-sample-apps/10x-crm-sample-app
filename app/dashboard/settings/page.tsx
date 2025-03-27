"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCallback } from 'react';

import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { UserProfile } from '@descope/nextjs-sdk';
import { useDescope, useSession, useUser } from '@descope/nextjs-sdk/client';

export default function SettingsPage() {
  const sdk = useDescope();
  const handleLogout = useCallback(() => {
		sdk.logout();
	}, [sdk]);
  return (
    
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences." />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
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
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your CRM.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="h-12 w-12 rounded-md bg-white border border-gray-200 cursor-pointer" />
                    <span className="text-sm">Light</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="h-12 w-12 rounded-md bg-gray-900 border border-gray-700 cursor-pointer" />
                    <span className="text-sm">Dark</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="h-12 w-12 rounded-md bg-gradient-to-b from-white to-gray-900 border border-gray-200 cursor-pointer" />
                    <span className="text-sm">System</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Density</Label>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    Compact
                  </Button>
                  <Button variant="outline" size="sm">
                    Default
                  </Button>
                  <Button variant="outline" size="sm">
                    Comfortable
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your subscription and billing details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Current Plan: Professional</p>
                    <p className="text-sm text-muted-foreground">$49/month, billed monthly</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <div className="h-10 w-16 rounded-md bg-gradient-to-r from-blue-600 to-blue-800" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Edit
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Billing Address</Label>
                <div className="rounded-md border p-4">
                  <p>John Doe</p>
                  <p>Acme Inc</p>
                  <p>123 Main St</p>
                  <p>San Francisco, CA 94105</p>
                  <p>United States</p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Billing History</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

