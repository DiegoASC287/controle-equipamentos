import { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    console.log("--- Middleware ---")
    return null
}

export const config = {
    matcher: "/inicio/:path*"
}

