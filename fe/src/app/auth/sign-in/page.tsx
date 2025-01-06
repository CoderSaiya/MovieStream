import { Form } from "@/components/SignIn/Form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In - MovieFlix",
    description: "Sign in to your MovieFlix account",
};

export default function SignInPage() {
    return (
        <Form />
    );
}