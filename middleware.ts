import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from "next/server";

function excludeSignInRoute(pathname: string) {
    return !pathname.startsWith('/api/user/read/signIn');
}
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const { token } = await req.json();

    if (excludeSignInRoute(pathname)) {
        if (token) {
            const secret = new TextEncoder().encode(process.env.SECRET);

            try {
                await jwtVerify(token, secret);
                return NextResponse.next()
            } catch (error) {
                return NextResponse.json({ message: 'unauthenticated' }, { status: 401 });
            }
        }

        return NextResponse.json({message: 'unauthenticated: no token'}, {status: 401})
    }

    return NextResponse.next()
}