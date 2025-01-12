import { Metadata } from "next";
import { ForgotClient } from "./client";

export const metadata: Metadata = {
    title: "Sign In - MovieFlix",
    description: "Sign in to your MovieFlix account",
};

export default function ForgotPage() {
    return (
        <ForgotClient />
    );
}