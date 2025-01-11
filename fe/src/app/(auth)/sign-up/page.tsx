import AuthLayout from "@/components/AuthLayout";
import { Footer } from "@/components/Signup/Footer";
import { Form } from "@/components/Signup/Form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up - MovieFlix",
    description: "Enter your information to create an account",
};

export default function SignUpPage() {
    return (
        <AuthLayout title="Create new account"
            subtitle="Enter your information to create an account">
            <div className="grid gap-6 text-white">
                <Form />
                <Footer />
            </div>
        </AuthLayout>
    )
}