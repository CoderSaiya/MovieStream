import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from 'jwt-decode'
import { DecodeToken } from "@/types/auth";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    const user = jwtDecode<DecodeToken>(token);
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/admin') && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/moderator') && !['admin', 'moderator'].includes(user.role)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
}

// áp dụng cho các route cụ thể
export const config = {
    matcher: ['/admin/:path*', '/moderator/:path*'],
}