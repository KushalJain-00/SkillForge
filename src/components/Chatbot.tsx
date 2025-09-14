import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your SkillForge assistant. How can I help you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const isMobile = useIsMobile();

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! This is a placeholder response. Full AI integration coming soon!",
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full glass-card hover:scale-110 transition-all duration-300 shadow-lg ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 z-50 ${isMobile ? 'bg-black/50' : 'bg-transparent'}`}
            onClick={() => !isMobile && setIsOpen(false)}
          />
          
          {/* Chat Container */}
          <div className={`fixed z-50 glass-card border border-border/20 shadow-2xl ${
            isMobile 
              ? 'inset-0 rounded-none' 
              : 'bottom-6 right-6 w-80 h-96 rounded-2xl'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/20">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">SkillForge Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-muted/50 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/20">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chatbot;