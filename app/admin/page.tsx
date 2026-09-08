"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/providers");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070a13] text-slate-400 text-xs">
      Redirecting to AI Providers console...
    </div>
  );
}
