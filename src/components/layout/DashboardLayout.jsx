"use client";
import SideBar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function DashboardLayout({ children, activeTab, user }) {
  return (
    <div className="g-sidenav-show bg-gray-100">
      <SideBar activeTab={activeTab} user={user} />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar activeTab={activeTab} />
        {children}
      </main>
    </div>
  );
}
