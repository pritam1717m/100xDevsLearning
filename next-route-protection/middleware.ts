import { NextRequest, NextResponse } from "next/server";
import { sessionStatus } from "./utils/session"


const protectedRoutes = ["/middleware"]

export default function middleware (req : NextRequest) {
    if(!sessionStatus && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteUrl = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString())
    }
}