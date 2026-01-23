import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { connect } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d"; // e.g. "7d" or "1h"

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required.", success: false },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User does not exist. Please sign up first.", success: false },
                { status: 404 }
            );
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid email or password.", success: false },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email,
                name: user.name,
                role : user.role
            } as { userId: string; email: string; name: string , role : string},
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE } as jwt.SignOptions
        );

        const response = NextResponse.json({
            message: "Login successful!",
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role : user.role
            },
        });

        response.cookies.set("user", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
            sameSite: "lax",
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { message: `Internal Server Error: ${error.message}`, success: false },
            { status: 500 }
        );
    }
}