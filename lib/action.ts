"use server";

import { currentUser } from "@clerk/nextjs/server";


export async function postData(formData: FormData) {
  "use server";

  const Pusher = require("pusher");
    const prisma = require("./db");


    const session = await currentUser();
    

  const message = formData.get("message");

  const data = await prisma.message.create({
    data: {
      message: message as string,
      email: session?.primaryEmailAddress?.emailAddress,
    },
    
    include: {
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "ap2",
    useTLS: true,
  });

  await pusher.trigger("chat", "hello", {
    message: `${JSON.stringify(data)}\n\n`,
  });
}