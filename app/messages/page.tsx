import ChatComponent from "@/components/chat";
import Form from "@/components/Form";
import { Navbar } from "@/components/navbar";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



async function getData(userId: string) {
    return await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId }, // Messages sent by the user
          { recipientId: userId }, // Messages received by the user
        ],
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
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
      orderBy: {
        createdAt: "asc",
      },
      take: 50,
    });
  }
  

// Add

// Force dynamic rendering for real-time updates
export const dynamic = "force-dynamic";

export default async function Chathomepage() {
  const session = await currentUser();

  if (!session) {
    redirect("/");
    return null; // Prevent further rendering
  }

  const data = await getData(session.id);

  return (<>
   <div className="h-screen bg-gray-200 flex flex-col">
      <ChatComponent data={data}  userId={session.id}/>
      <Form recipientId={session.id} />
    </div>
    </>
  );
}
