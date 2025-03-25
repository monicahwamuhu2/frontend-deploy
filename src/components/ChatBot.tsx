"use client";

import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

// Use environment variable with fallback
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://backend-chatbot-production-8545.up.railway.app";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to show welcome message when component mounts
  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm Pandora ,a mental health support chatbot. How are you feeling today?",
        sender: "bot",
        timestamp: getFormattedTime(),
      },
    ]);
  }, []);

  const getFormattedTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = async (text: string) => {
    if (text.trim() === "") return;
    
    // Add user message to chat
    const userMessage: Message = { 
      text, 
      sender: "user", 
      timestamp: getFormattedTime() 
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call backend API
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      // Add bot response to chat
      setMessages((prev) => [
        ...prev,
        {
          text: data.response || "I'm having trouble understanding right now. Could you try rephrasing that?",
          sender: "bot",
          timestamp: getFormattedTime(),
        },
      ]);
    } catch (error) {
      console.error("Error communicating with chatbot server:", error);
      
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I'm having trouble connecting to my server. Please try again in a moment.",
          sender: "bot",
          timestamp: getFormattedTime(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-base-100 rounded-lg shadow-lg">
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatBubble 
            key={index} 
            message={msg.text} 
            sender={msg.sender} 
            timestamp={msg.timestamp} 
          />
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>Bot is thinking...</span>
          </div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input area */}
      <div className="border-t border-base-300">
        <ChatInput sendMessage={sendMessage} />
      </div>
      
      {/* Add some CSS for the typing indicator */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background: #666;
          border-radius: 50%;
          display: block;
          margin: 0 2px;
          opacity: 0.4;
          animation: typing 1s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0% {
            transform: translateY(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-5px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0px);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatBot;