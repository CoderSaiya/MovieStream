import AuthLayout from "@/components/AuthLayout";
import { Footer } from "@/components/SignIn/Footer";
import { Form } from "@/components/SignIn/Form";
import { Separator } from "@/components/SignIn/Separator";
import { SocialLoginButtons } from "@/components/SignIn/SocialLoginButtons";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In - MovieFlix",
    description: "Sign in to your MovieFlix account",
};

export default function SignInPage() {
    return (
        <AuthLayout title="Sign in to MovieFlix"
            subtitle="Choose your login method">
            <div className="grid gap-6 text-white">
                <Form />
                <Separator />
                <SocialLoginButtons />
                <Footer />
            </div>
        </AuthLayout>
    );
}