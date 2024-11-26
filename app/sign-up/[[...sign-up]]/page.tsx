'use client'

import { SignUp, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignUpPage() {
  const { user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
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
        } catch (err) {
          console.error('Error syncing user:', err);
        }
      }
    };

    syncUser();
  }, [user]);

  return <SignUp />;
}
