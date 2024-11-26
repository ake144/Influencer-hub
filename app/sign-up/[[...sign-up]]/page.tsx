'use client'



import { SignUp, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SignUpPage() {
  const { user } = useUser();  // Access current authenticated user
  const router = useRouter();

  useEffect(() => {
    const handleUserSignup = async () => {
      if (user) {
        try {
          // Sync user data to your database
          await fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clerkUserId: user.id,
              email: user.emailAddresses[0]?.emailAddress,
              firstName: user.firstName,
              lastName: user.lastName,
              profileImageUrl: user.imageUrl,
              createdAt: user.createdAt,
            }),
          });

          // Redirect to the requested path or default page
          const requestedPath = sessionStorage.getItem('requestedPath') || '/';
          router.push(requestedPath);
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    handleUserSignup();
  }, [user, router]);

  return <SignUp />;
}

