import AuthLayout from "@/components/AuthLayout";
import { Metadata } from "next";
import { Footer } from '@/components/SignIn/Footer'
import { Form } from '@/components/SignIn/Form'
import { Separator } from '@/components/SignIn/Separator'
import { SocialLoginButtons } from '@/components/SignIn/SocialLoginButtons'

export const metadata: Metadata = {
    title: "Sign In - MovieFlix",
    description: "Sign in to your MovieFlix account",
};

export default function SignInPage() {
    return (
        <AuthLayout title="Sign in to MovieFlix"
            subtitle="Choose your login method">
            <div className="grid gap-6 text-white" data-aos="fade-up">
                <Form />
                <Separator />
                <SocialLoginButtons />
                <Footer />
            </div>
        </AuthLayout>
    );
}