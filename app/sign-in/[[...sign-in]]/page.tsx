'use client'

import { SignIn, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignInPage() {
  const { user } = useUser();

  useEffect(() => {
    const handleUserSignin = async () => {
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
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    handleUserSignin();
  }, [user]);

  return <SignIn />;
}
