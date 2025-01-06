import { Form } from "@/components/Verify/Form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify",
    description: "Enter the OTP sent to your email to verify your account",
};

export default function VerifyPage() {
    return (
        <Form />
    )
}