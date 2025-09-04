"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DarkModeToggle } from "@/components/ui/darkmode-toggle";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Main Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <DarkModeToggle />
          </div>
          <Separator />
        </CardContent>
      </Card>

    </div>
  );
}
