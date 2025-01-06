import { AOSInit } from "@/components/AOSInit";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Buy VIP",
    description: "Buy VIP to watch movies without ads and with high quality",
};

export default function VipLayout({
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