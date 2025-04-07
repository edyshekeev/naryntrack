"use client";
import ProtectedRoute from "./admin-route";

const DashboardLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
};

export default DashboardLayout;