"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Navbar from "../components/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = authClient.useSession();

    if (!session.data?.user) {
        redirect("/signin");
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* <Navbar /> */}
            <div className="">{children}</div>
        </div>
    );
} 