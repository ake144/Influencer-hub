import prisma from '@/lib/db';


export async function POST(req:Request) {

  try {
    const body = await req.json();
    const { type, data } = body;

    // Only handle specific events (e.g., user.created, user.updated)
    if (type === 'user.created' || type === 'user.updated') {
      const { id, email_addresses, username, image_url, created_at } = data;

      const email = email_addresses[0]?.email_address;

      // Upsert user in your database
      await prisma.user.upsert({
        where: { clerkUserId: id },
        update: {
          email,
          name: username || null,
          profilePic: image_url || null,
          createdAt: new Date(created_at),
        },
        create: {
          clerkUserId: id,
          email,
          name: username || null,
          profilePic: image_url || null,
          createdAt: new Date(created_at),
        },
      });

      console.log('User synced successfully:', id);
    }

    return new Response(JSON.stringify({ message: 'Event handled' }), { status: 200 });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response(JSON.stringify({ error: 'Webhook error' }), { status: 500 });
  }
}
