import { Form } from "@/components/Signup/Form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up - MovieFlix",
    description: "Enter your information to create an account",
};

export default function SignUpPage() {
    return (
        <Form />
    )
}