import prisma from '@/lib/db';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

interface UserData {
  id: string;
  email_addresses: { email_address: string }[];
  username?: string;
  image_url?: string;
  first_name?: string;
  last_name?: string;
}

export async function POST(req: Request) {
  try {
    console.log('Webhook received');
    const evt = (await req.json()) as WebhookEvent;
    console.log('Event:', evt);

    const userData = evt.data as UserData;
    const { id: clerkUserId, email_addresses, username, image_url, first_name, last_name } = userData;

    const email = email_addresses?.[0]?.email_address || 'unknown@example.com';
    const name = username || `${first_name || ''} ${last_name || ''}`.trim() || 'Anonymous User';

    if (!clerkUserId) {
      console.error('No user ID provided');
      return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
    }

    let user;
    switch (evt.type) {
      case 'user.created':
        user = await prisma.user.upsert({
          where: { clerkUserId },
          update: {
            email,
            name,
            profilePic: image_url || null,
          },
          create: {
            clerkUserId,
            email,
            name,
            profilePic: image_url || null,
          },
        });
        console.log('User created/updated:', user);
        break;

      case 'user.updated':
        user = await prisma.user.update({
          where: { clerkUserId },
          data: {
            email,
            name,
            profilePic: image_url || null,
          },
        });
        console.log('User updated:', user);
        break;

      case 'user.deleted':
        await prisma.user.update({
          where: { clerkUserId },
          data: { isDeleted: true }, // Use soft delete
        });
        console.log('User soft-deleted:', clerkUserId);
        break;

      default:
        console.warn('Unhandled event type:', evt.type);
        break;
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
