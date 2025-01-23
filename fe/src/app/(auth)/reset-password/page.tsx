import { Metadata } from "next";
import ResetPasswordClient from "./client";

export const metadata: Metadata = {
    title: "Reset Password - MovieFlix",
    description: "Enter your new password to reset",
};

export default function ResetPasswordPage() {
    return (
        <ResetPasswordClient />
    )
}