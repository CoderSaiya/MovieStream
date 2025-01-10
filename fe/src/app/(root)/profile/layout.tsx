import { AOSInit } from "@/components/AOSInit";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
    description: "Edit your profile and view your account information",
};

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen">
            <AOSInit />
            <main className="flex-1 py-6">
                <div className="container mx-auto px-4">
                    {children}
                </div>
            </main>
        </div>
    );
}