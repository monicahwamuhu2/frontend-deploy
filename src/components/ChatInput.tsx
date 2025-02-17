"use client"; // Mark this component as a client component

import { useState } from "react";
import { Send } from "lucide-react"; // Using an icon for a sleek look

interface ChatInputProps {
  sendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessage(input);
    setInput(""); // Clear input after sending message
  };

  return (
    <div className="flex items-center p-4 bg-base-200 border-t shadow-md">
      <input
        type="text"
        className="input input-bordered flex-1 rounded-full px-4 py-2 text-lg focus:ring-2 focus:ring-primary"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="btn btn-primary ml-3 rounded-full p-3 transition-transform transform hover:scale-105"
        onClick={handleSend}
      >
        <Send className="w-5 h-5" /> {/* Icon for a modern look */}
      </button>
    </div>
  );
};

export default ChatInput;
