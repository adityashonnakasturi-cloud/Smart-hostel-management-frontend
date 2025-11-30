"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ProtectedRoute({ allowedRoles, children }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await api.get("/auth/me"); // backend returns user info
        const user = res.data.user;

        if (!allowedRoles.includes(user.role)) {
          router.replace("/login");
          return;
        }

        setAuthorized(true);

      } catch (err) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) return <div className="p-8 text-center">Checking authentication...</div>;
  if (!authorized) return null;

  return children;
}
