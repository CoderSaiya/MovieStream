import { Metadata } from "next";
import { ForgotClient } from "./client";

export const metadata: Metadata = {
    title: "Forgot Password - MovieFlix",
    description: "Easily reset your MovieFlix password to regain access to your favorite movies and TV shows. Simply follow the steps to create a new password and get back to streaming in no time.",
};

export default function ForgotPage() {
    return (
        <ForgotClient />
    );
}