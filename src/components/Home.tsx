"use client";

import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import Navbar from "./Navbar";

// Use environment variable with a fallback
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://backend-chatbot-production-8545.up.railway.app";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  id: string;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Consistent ID generation to avoid hydration issues
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  // Safe time formatting
  const getFormattedTime = () => {
    // Use a consistent time format that works on both server and client
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  // Use useEffect to set up client-side only logic
  useEffect(() => {
    // Mark as client-side
    setIsClient(true);

    // Delay welcome message to prevent hydration mismatch
    const welcomeMessage: Message = {
      text: "Hello! I'm a mental health support chatbot. How are you feeling today?",
      sender: "bot",
      timestamp: getFormattedTime(),
      id: generateId()
    };

    // Set messages after client-side render
    setMessages([welcomeMessage]);

    // Create digital effects only on client side
    const safeCreateDigitalEffects = () => {
      if (bgRef.current) {
        // Clear existing elements
        bgRef.current.innerHTML = '';
        
        // Create digital lines and particles
        for (let i = 0; i < 10; i++) {
          createDigitalLine(bgRef.current);
        }
        
        for (let i = 0; i < 6; i++) {
          createVerticalDigitalLine(bgRef.current);
        }
        
        for (let i = 0; i < 20; i++) {
          createParticle(bgRef.current);
        }
      }
    };

    // Safely create digital effects
    safeCreateDigitalEffects();

    // Cleanup function
    return () => {
      if (bgRef.current) {
        bgRef.current.innerHTML = '';
      }
    };
  }, []);

  // Modify digital effect functions to be pure and avoid direct DOM manipulation
  const createDigitalLine = (container: HTMLDivElement) => {
    const line = document.createElement('div');
    line.className = 'digital-line';
    
    const randomTop = Math.floor(Math.random() * 100);
    const randomDelay = Math.floor(Math.random() * 8);
    const randomDuration = 8 + Math.floor(Math.random() * 7);
    const randomOpacity = 0.1 + Math.random() * 0.2;
    
    line.style.top = `${randomTop}vh`;
    line.style.animationDelay = `${randomDelay}s`;
    line.style.animationDuration = `${randomDuration}s`;
    line.style.opacity = `${randomOpacity}`;
    
    container.appendChild(line);
  };
  
  const createVerticalDigitalLine = (container: HTMLDivElement) => {
    const line = document.createElement('div');
    line.className = 'digital-vertical-line';
    
    const randomLeft = Math.floor(Math.random() * 100);
    const randomDelay = Math.floor(Math.random() * 10);
    const randomDuration = 10 + Math.floor(Math.random() * 10);
    const randomOpacity = 0.1 + Math.random() * 0.2;
    
    line.style.left = `${randomLeft}vw`;
    line.style.animationDelay = `${randomDelay}s`;
    line.style.animationDuration = `${randomDuration}s`;
    line.style.opacity = `${randomOpacity}`;
    
    container.appendChild(line);
  };
  
  const createParticle = (container: HTMLDivElement) => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const randomSize = 2 + Math.floor(Math.random() * 4);
    const randomLeft = Math.floor(Math.random() * 100);
    const randomDelay = Math.floor(Math.random() * 15);
    const randomDuration = 15 + Math.floor(Math.random() * 20);
    
    particle.style.width = `${randomSize}px`;
    particle.style.height = `${randomSize}px`;
    particle.style.left = `${randomLeft}vw`;
    particle.style.animationDelay = `${randomDelay}s`;
    particle.style.animationDuration = `${randomDuration}s`;
    particle.style.animation = `float ${randomDuration}s linear ${randomDelay}s infinite`;
    
    container.appendChild(particle);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message function
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage = { 
      text, 
      sender: "user" as const, 
      timestamp: getFormattedTime(),
      id: generateId()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          text: data.response || "No response received",
          sender: "bot",
          timestamp: getFormattedTime(),
          id: generateId()
        },
      ]);
    } catch (error) {
      console.error("Error details:", error);
      setMessages(prev => [
        ...prev,
        {
          text: "Sorry, I couldn't connect to the server. Please try again.",
          sender: "bot",
          timestamp: getFormattedTime(),
          id: generateId()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Consistent loading state for SSR
  if (!isClient) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#121212]">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="bg-animate" ref={bgRef}></div>
      
      <Navbar />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 slide-up">
            <h1 className="text-3xl font-bold text-[#7e57c2] dark:text-[#9575cd]">
              Mental Health Support Assistant
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Talk to our AI assistant about how you're feeling today
            </p>
          </div>
          
          {/* Messages container with glass effect */}
          <div className="glass rounded-lg shadow-xl p-4 min-h-[400px] pulse-border slide-up delay-100">
            <div className="space-y-4 pb-2">
              {messages.map((msg, index) => (
                <div key={msg.id} className="fade-in" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                  <ChatBubble 
                    message={msg.text} 
                    sender={msg.sender} 
                    timestamp={msg.timestamp} 
                  />
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-center space-x-2 text-gray-500 mt-2 fade-in">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>Bot is thinking...</span>
                </div>
              )}
            </div>
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input container with glass effect */}
          <div className="mt-4 glass rounded-lg shadow-lg slide-up delay-200">
            <ChatInput sendMessage={sendMessage} />
          </div>
          
          {/* Warning message */}
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 fade-in delay-300">
            <p>
              This is a mental health support chatbot. While it can provide general advice,
              it is not a substitute for professional help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;