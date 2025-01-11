import AuthLayout from "@/components/AuthLayout";
import { Form } from "@/components/Verify/Form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify",
    description: "Enter the OTP sent to your email to verify your account",
};

export default function VerifyPage() {
    return (
        <AuthLayout title="Email Authentication"
            subtitle="Enter the OTP code sent to your email">
            <Form />
        </AuthLayout>
    )
}