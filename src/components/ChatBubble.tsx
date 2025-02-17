interface ChatBubbleProps {
    message: string;
    sender: "user" | "bot";
    timestamp: string;
  }
  
  const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender, timestamp }) => {
    return (
      <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
        {/* Bot Avatar (Left) */}
        {sender === "bot" && (
          <div className="avatar mr-2">
            <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
              B
            </div>
          </div>
        )}
  
        {/* Chat Bubble */}
        <div
          className={`p-3 rounded-lg max-w-xs ${
            sender === "user" ? "bg-primary text-white" : "bg-gray-200 text-black"
          }`}
        >
          <p>{message}</p>
          <span className="block text-xs text-gray-500 text-right mt-1">{timestamp}</span>
        </div>
  
        {/* User Avatar (Right) */}
        {sender === "user" && (
          <div className="avatar ml-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              U
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ChatBubble;
  