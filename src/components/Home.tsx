"use client";

import { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import Navbar from "./Navbar";

// Hardcode the URL for testing
const BACKEND_URL = "https://backend-chatbot-production-8545.up.railway.app";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getFormattedTime = () => {
    if (typeof window !== "undefined") {
      return new Date().toLocaleTimeString();
    }
    return "";
  };

  const sendMessage = async (text: string) => {
    const userMessage: Message = { text, sender: "user", timestamp: getFormattedTime() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('Sending request to:', `${BACKEND_URL}/chat`);
      
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      setMessages((prev) => [
        ...prev,
        {
          text: data.response || "No response received",
          sender: "bot",
          timestamp: getFormattedTime(),
        },
      ]);
    } catch (error) {
      console.error("Error details:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I couldn't connect to the server. Please try again.",
          sender: "bot",
          timestamp: getFormattedTime(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <ChatBubble 
            key={index} 
            message={msg.text} 
            sender={msg.sender} 
            timestamp={msg.timestamp} 
          />
        ))}
        {isLoading && (
          <ChatBubble
            message="The bot is typing..."
            sender="bot"
            timestamp={getFormattedTime()}
          />
        )}
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default Home;