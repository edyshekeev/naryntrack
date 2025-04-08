"use client";
import Header from "@/components/Header";
import { useGetMe } from "@/hooks/queries/useGetMe";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/router";
import ProtectedRoute from "./admin-route";

const DashboardLayout = ({ children }) => {
  const { data: user, isLoading } = useGetMe();
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        {user && <Header />}
        <main className="grow">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;