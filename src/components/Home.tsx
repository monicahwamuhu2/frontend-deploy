"use client"; // Mark this component as a client component

import { useState, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import Navbar from "./Navbar";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const getFormattedTime = () => {
    if (typeof window !== "undefined") {
      return new Date().toLocaleTimeString(); // Ensure it's only called on the client
    }
    return ""; // Avoid mismatch between server & client
  };

  const sendMessage = (text: string) => {
    const userMessage: Message = { text, sender: "user", timestamp: getFormattedTime() };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botReply: Message = { text: "I’m just a bot! 😊", sender: "bot", timestamp: getFormattedTime() };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} sender={msg.sender} timestamp={msg.timestamp} />
        ))}
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default Home;
