import type {Metadata} from "next"
import {AOSInit} from "@/components/AOSInit";
import {Sidebar} from "@/components/Admin/SideBar";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Modern dashboard with gradient background",
}

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div
            className="min-h-screen flex"
            style={{
                background: "linear-gradient(135deg, #0B1437 0%, #4D3A85 100%)",
            }}
        >
            <AOSInit/>
            <Sidebar/>
            <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
        </div>
    )
}