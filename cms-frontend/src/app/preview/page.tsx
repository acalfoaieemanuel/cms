"use client"

import { ContentTable } from "@/components/preview-table"


export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Content Table</h1>
      <ContentTable />
    </main>
  );
}
