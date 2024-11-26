import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // Import your Prisma client

export async function POST(req:Request) {
  try {
    const { clerkUserId } = await req.json();

    if (!clerkUserId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch user details from Clerk API
    const clerkUserResponse = await fetch(`https://api.clerk.dev/v1/users/${clerkUserId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`, // Ensure this environment variable is securely set
      },
    });

    if (!clerkUserResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Clerk user data" },
        { status: clerkUserResponse.status }
      );
    }

    const clerkUser = await clerkUserResponse.json();

    // Destructure required user properties from Clerk API response
    const {
      email_addresses,
      username,
      image_url,
      created_at,
    } = clerkUser;

    if (!email_addresses?.length) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const email = email_addresses[0]?.email_address;

    // Upsert user in your database using Prisma
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: {
        email,
        name: username || null,
        profilePic: image_url || null,
        createdAt: new Date(created_at),
      },
      create: {
        clerkUserId,
        email,
        name: username || null,
        profilePic: image_url || null,
        createdAt: new Date(created_at),
      },
    });

    return NextResponse.json({ message: "User synced successfully", user }, { status: 200 });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
