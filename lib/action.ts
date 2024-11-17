"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";
import Pusher from "pusher";

export async function postData(formData: FormData) {
  "use server";

  const session = await currentUser();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const senderId = session.id;
  const recipientId = formData.get("recipientId") as string; // Recipient ID from the form
  const content = formData.get("message") as string;

  if (!recipientId || !content) {
    throw new Error("Recipient ID and message content are required");
  }

  // Save the message in the database
  const message = await prisma.message.create({
    data: {
      content,
      senderId,
      recipientId,
    },
    include: {
      sender: {
        select: {
          name: true,
          profilePic: true,
        },
      },
      recipient: {
        select: {
          name: true,
          profilePic: true,
        },
      },
    },
  });

  // Initialize Pusher for real-time updates
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap2",
    useTLS: true,
  });

  // Trigger an event on the recipient's channel
  await pusher.trigger(`chat-${recipientId}`, "new-message", {
    message,
  });

  return message;
}
