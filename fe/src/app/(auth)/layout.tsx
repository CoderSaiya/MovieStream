import { AOSInit } from "@/components/AOSInit";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MovieFlix",
    description: "Generated by create next app",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <AOSInit />
            {children}
        </>
    );
}