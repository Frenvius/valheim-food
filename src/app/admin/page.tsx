"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/usecase/store";
import { AdminPanel } from "@/components/admin";

export default function AdminPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated && !user) {
      router.push("/login?returnUrl=/admin");
    }
  }, [user, router, hydrated]);

  if (!hydrated || !user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <AdminPanel />
    </div>
  );
}
