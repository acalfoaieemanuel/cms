"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ContentForm from "./content-form";

export default function EditorSidebar() {
  return (
    <Sheet>
      {/* Sidebar toggle */}
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed top-4 left-4 z-50">
          Open Editor
        </Button>
      </SheetTrigger>

      {/* Sidebar content */}
      <SheetContent side="left" className="w-[400px] p-6">
        <h2 className="text-xl font-semibold mb-4">Editor</h2>
        <ContentForm />
      </SheetContent>
    </Sheet>
  );
}
