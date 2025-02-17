"use client"; // Mark this component as a client component

import { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import Navbar from "./Navbar";

const backendUrl = "https://backend-chatbot-production-8545.up.railway.app/";

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
      return new Date().toLocaleTimeString(); // Ensure it's only called on the client
    }
    return ""; // Avoid mismatch between server & client
  };

  const sendMessage = async (text: string) => {
    const userMessage: Message = { text, sender: "user", timestamp: getFormattedTime() };
    setMessages((prev) => [...prev, userMessage]);

    // Show loading state until we get a response
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from backend");
      }

      const data = await response.json();
      const botReply = data.response; // Updated to match API response format

      // Add the bot's reply to messages
      setMessages((prev) => [
        ...prev,
        {
          text: botReply,
          sender: "bot",
          timestamp: getFormattedTime(),
        },
      ]);

    } catch {
      // Catching and handling error without using the error object
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, something went wrong.",
          sender: "bot",
          timestamp: getFormattedTime(),
        },
      ]);
    } finally {
      setIsLoading(false); // Hide loading state once response is received
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} sender={msg.sender} timestamp={msg.timestamp} />
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
