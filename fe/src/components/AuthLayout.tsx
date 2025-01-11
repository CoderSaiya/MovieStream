export default function AuthLayout({
    children,
    title,
    subtitle
}: Readonly<{
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}>) {

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-[400px] space-y-6 rounded-2xl bg-black/50 p-6 backdrop-blur-xl sm:p-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
                        {subtitle && (
                            <p className="text-sm text-gray-400">{subtitle}</p>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}