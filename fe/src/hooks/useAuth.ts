import { useRouter } from "next/router";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

export function useAtuh(requiredRole?: string) {
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === 'loading') return;

        if (
            status === 'unauthenticated' ||
            (requiredRole && session?.user?.role !== requiredRole)
        ) {
            router.push('/unauthorized');
        }
    }, [status, requiredRole, session, router]);

    return { session, loading: status === 'loading' };
}