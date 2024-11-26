'use client'

import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignUpPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleUserSignup = async () => {
      if (user) {
        try {
          console.log("User from Clerk:", user);
          // Save user data to your database
        const res =   await fetch("/api/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clerkUserId: user.id,
              email: user.emailAddresses[0]?.emailAddress,
              firstName: user.firstName || null,
              lastName: user.lastName || null,
              username: user.username || null,
              profileImageUrl: user.imageUrl || null,
              createdAt: user.createdAt,
            }),
          });

          console.log("API Response:", await res.json());

          // Redirect to the requested path or default page
          const requestedPath = sessionStorage.getItem("requestedPath") || "/";
          router.push(requestedPath);
        } catch (error) {
          console.error("Error saving user data:", error);
        }
      }
    };

    handleUserSignup();
  }, [user, router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <SignUp />
    </div>
  );
}
