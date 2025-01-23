import Link from 'next/link'
import AuthLayout from '@/components/AuthLayout'
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Reset Confirm - MovieFlix",
    description: "Confirm you change password",
};

export default function ResetConfirmationPage() {
  return (
    <AuthLayout
      title="Password has been reset"
      subtitle="Your password has been reset successfully."
    >
      <div className="flex flex-col items-center space-y-4" data-aos="fade-up">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <p className="text-center text-gray-400">
          You can use new password to sign in your account.
        </p>
        <Link href="/sign-in" className="w-full">
          <Button className="w-full bg-red-600 hover:bg-red-700">
            Sign in
          </Button>
        </Link>
      </div>
    </AuthLayout>
  )
}