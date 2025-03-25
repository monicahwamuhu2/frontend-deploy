"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  sendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus the input on component mount
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessage(input);
    setInput(""); // Clear input after sending message
    
    // Refocus input after sending
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle textarea height adjustment
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Auto resize the textarea based on content
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };

  // Handle key press (Enter to send, Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center p-4 relative">
      {/* Growing focus border effect */}
      <div 
        className={`absolute inset-0 border border-[#7e57c2] dark:border-[#9575cd] rounded-lg transition-all duration-300 ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      
      <div className="relative flex-1 flex items-center bg-white dark:bg-gray-800 rounded-l-lg overflow-hidden">
        {/* Glow effect when typing */}
        <div 
          className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-[#7e57c2] to-[#3f51b5] transition-all duration-300 ${
            input.length > 0 ? 'w-full' : 'w-0'
          }`}
        ></div>
        
        <textarea
          ref={inputRef}
          className="w-full bg-transparent resize-none py-3 px-4 outline-none min-h-[48px] max-h-[150px] text-gray-800 dark:text-gray-200"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={1}
        />
      </div>
      
      <button
        className={`ml-2 p-3 rounded-lg bg-gradient-to-r from-[#7e57c2] to-[#3f51b5] text-white button-glow transform transition-all duration-300 ${
          input.trim() === "" 
            ? "opacity-50 cursor-not-allowed" 
            : "opacity-100 hover:shadow-lg hover:-translate-y-1"
        }`}
        onClick={handleSend}
        disabled={input.trim() === ""}
      >
        <Send className="w-5 h-5" />
      </button>
      
      <div className="absolute -bottom-5 left-0 right-0 text-xs text-center text-gray-500 dark:text-gray-400">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
};

export default ChatInput;