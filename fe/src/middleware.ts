import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from 'jwt-decode'
import { DecodeToken } from "@/types/auth";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    const user = jwtDecode<DecodeToken>(token);
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/admin') && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/moderator') && !['admin', 'moderator'].includes(user.role)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
}

// áp dụng cho các route cụ thể
export const config = {
    matcher: ['/admin','/admin/:path*', '/moderator/:path*'],
}