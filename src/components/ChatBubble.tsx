interface ChatBubbleProps {
  message: string;
  sender: "user" | "bot";
  timestamp: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender, timestamp }) => {
  // Format message text with line breaks
  const formattedMessage = message.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < message.split('\n').length - 1 && <br />}
    </span>
  ));

  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
      {/* Bot Avatar (Left) */}
      {sender === "bot" && (
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7e57c2] to-[#5e35b1] text-white flex items-center justify-center shadow-md overflow-hidden relative">
            <span className="text-lg font-semibold relative z-10">AI</span>
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#9575cd] to-transparent opacity-50"></div>
          </div>
        </div>
      )}

      {/* Chat Bubble */}
      <div
        className={`relative max-w-xs sm:max-w-sm md:max-w-md p-3 rounded-lg shadow-md ${
          sender === "user"
            ? "bg-gradient-to-r from-[#3f51b5] to-[#5c6bc0] text-white rounded-br-none"
            : "bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] dark:from-[#2d2d2d] dark:to-[#1d1d1d] text-gray-800 dark:text-gray-100 rounded-bl-none"
        }`}
      >
        <p className="whitespace-pre-line">{formattedMessage}</p>
        <span className={`block text-xs text-right mt-1 ${
          sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
        }`}>{timestamp}</span>
        
        {/* Bubble tail */}
        <div
          className={`absolute bottom-0 w-4 h-4 ${
            sender === "user"
              ? "right-0 transform translate-x-1/4 translate-y-1/4 rotate-[135deg] bg-[#5c6bc0]"
              : "left-0 transform -translate-x-1/4 translate-y-1/4 rotate-[225deg] dark:bg-[#1d1d1d] bg-[#e0e0e0]"
          }`}
        ></div>
        
        {/* Subtle glow effect */}
        <div
          className={`absolute inset-0 rounded-lg ${
            sender === "user"
              ? "bg-gradient-to-r from-[#3f51b5] to-[#5c6bc0]"
              : "bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] dark:from-[#2d2d2d] dark:to-[#1d1d1d]"
          } opacity-50 blur-sm -z-10`}
        ></div>
      </div>

      {/* User Avatar (Right) */}
      {sender === "user" && (
        <div className="flex-shrink-0 ml-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3f51b5] to-[#1a237e] text-white flex items-center justify-center shadow-md overflow-hidden relative">
            <span className="text-lg font-semibold relative z-10">You</span>
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#5c6bc0] to-transparent opacity-50"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;