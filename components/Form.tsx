'use client'

import { postData } from "@/lib/action";
import { useState } from "react";

export default function Form({ recipientId }: { recipientId: string }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recipientId", recipientId);
    formData.append("message", message);

    await postData(formData); 

    setMessage(""); // Clear the input
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-lg p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
          Send
        </button>
      </div>
    </form>
  );
}
