import ChatComponent from "@/components/chat";
import Form from "@/components/Form";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



async function getData() {
  const data = await prisma.message.findMany({
    select: {
      message: true,
      id: true,
      user: {
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

  return data;
}

// Add
export const dynamic = "force-dynamic";

export default async function Chathomepage() {

    const session = await currentUser();
  const data = await getData();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-screen bg-gray-200 flex flex-col">
      <ChatComponent data={data as any} />
      <Form />
    </div>
  );
}