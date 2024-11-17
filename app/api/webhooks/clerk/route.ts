import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the webhook payload
    const event = await req.json();
    const { type, data } = event;

    // Ensure we have a user ID from the event data
    const clerkUserId = data?.id;
    if (!clerkUserId) {
      console.error('No Clerk user ID provided in the event');
      return NextResponse.json({ error: 'No Clerk user ID provided' }, { status: 400 });
    }

    // Extract basic user data
    const email = data.email_addresses?.[0]?.email_address || null;
    const name = data.username || `${data.first_name || ''} ${data.last_name || ''}`.trim() || null;
    const profilePic = data.image_url || null;

    if (!email || !name) {
      console.error('Missing essential user information (email/name)');
      return NextResponse.json({ error: 'Missing essential user information' }, { status: 400 });
    }

    switch (type) {
      case 'user.created':
      case 'user.updated': {
        // Upsert the user (create if not exists, update otherwise)
        const user = await prisma.user.upsert({
          where: { clerkUserId },
          update: {
            email,
            name,
            profilePic,
          },
          create: {
            clerkUserId,
            email,
            name,
            profilePic,
          },
        });
        console.log(`${type} event processed for user:`, user);
        break;
      }

      case 'user.deleted': {
        // Delete the user from the database
        await prisma.user.delete({
          where: { clerkUserId },
        });
        console.log('User deleted:', clerkUserId);
        break;
      }

      default:
        console.warn('Unhandled event type:', type);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
