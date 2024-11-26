'use client';

import { postData } from "@/lib/action";
import { getUsers } from "@/lib/serveraction";
import { useState, useEffect } from "react";

export default function Form() {
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]); // State to hold users

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers || []);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientId) {
      alert("Please select a recipient.");
      return;
    }

    const formData = new FormData();
    formData.append("recipientId", recipientId); // Uncommented this line
    formData.append("message", message);

    try {
      await postData(formData);
      setMessage(""); // Clear the input
      setRecipientId(null); // Reset recipient ID
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex items-center">
        <select
          value={recipientId || ""}
          onChange={(e) => setRecipientId(e.target.value)}
          className="border rounded-lg p-2 mr-2"
        >
          <option value="">Select a recipient</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

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
