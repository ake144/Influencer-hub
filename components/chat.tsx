export default function ChatComponent({ data, userId }: { data: any, userId: string }) {
    return (
      <div className="flex-1 overflow-y-auto p-4">
        {data.map((message: any) => (
          <div key={message.id} className="mb-4">
            <div className={`flex items-center ${message.senderId === userId ? "justify-end" : "justify-start"}`}>
              <img
                src={message.sender.profilePic || "/default-avatar.png"}
                alt={`${message.sender.name}'s profile`}
                className="w-10 h-10 rounded-full"
              />
              <div className="bg-white p-2 rounded-lg shadow-md max-w-xs">
                <p className="text-sm text-gray-700">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">{message.sender.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  