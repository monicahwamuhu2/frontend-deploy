"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, HelpCircle, X } from "lucide-react";

const Navbar: React.FC = () => {
  // State management
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showHelp, setShowHelp] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Example prompts for help modal
  const examplePrompts = [
    "I feel sad today.",
    "I am stressed about work.",
    "I can not sleep at night.",
    "I feel anxious about my future.",
    "I need advice about stress."
  ];

  // Theme and scroll tracking
  useEffect(() => {
    // Ensure this only runs once after mounting
    setIsMounted(true);
    
    // Detect initial theme preference
    const detectInitialTheme = () => {
      // Check localStorage first
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (savedTheme) {
        return savedTheme;
      }
      
      // Then check system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemPrefersDark ? "dark" : "light";
    };

    // Apply initial theme
    const initialTheme = detectInitialTheme();
    applyTheme(initialTheme);
    
    // Scroll position tracking
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Theme application function
  const applyTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    
    // Only modify document if we're in the browser
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.toggle('dark', newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    applyTheme(newTheme);
  };

  // Render placeholder during SSR
  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white py-3 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
            Mindful Connect
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300
          ${scrollPosition > 10 
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" 
            : "bg-white dark:bg-gray-900"
          } 
          py-3 px-4 md:px-6
        `}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl md:text-2xl font-bold flex items-center gap-2 
            bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            <svg 
              className="w-7 h-7 fill-blue-500 dark:fill-blue-400" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16h2v-2h-2v2zm2-3V8h-2v7h2z" />
            </svg>
            Mindful Connect
          </Link>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Help Button */}
            <button 
              onClick={() => setShowHelp(true)}
              aria-label="Open help modal"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-colors duration-200 text-gray-700 dark:text-gray-200"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-colors duration-200 text-gray-700 dark:text-gray-200"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Help Modal */}
      {showHelp && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowHelp(false);
            }
          }}
        >
          <div 
            className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl 
            w-full max-w-md mx-auto max-h-[75vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 p-2 rounded-full 
              bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
              dark:hover:bg-gray-700 transition-colors"
              aria-label="Close help modal"
            >
              <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                How to Use the Chatbot
              </h2>

              <p className="text-gray-700 dark:text-gray-300">
                This chatbot provides mental health support. It offers guidance, 
                but is not a replacement for professional help.
              </p>

              {/* Example Prompts */}
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  Try These Prompts:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {examplePrompts.map((prompt, index) => (
                    <li key={index}>{prompt}</li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  Tips:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Be specific about your feelings</li>
                  <li>Ask for advice on specific topics</li>
                  <li>Let the bot know if you need more information</li>
                </ul>
              </div>

              {/* Important Notice */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <p className="font-bold text-amber-800 dark:text-amber-400 mb-2">
                  Important:
                </p>
                <p className="text-amber-700 dark:text-amber-300">
                  If you are experiencing a crisis, contact a mental health 
                  professional or your local emergency number.
                </p>
              </div>

              {/* Close Button */}
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowHelp(false)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 
                  text-white rounded-lg font-medium transition-colors 
                  w-full sm:w-auto"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Padding to prevent content from being hidden behind navbar */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;