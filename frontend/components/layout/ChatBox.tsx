"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
}

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Xin chào!", isBot: true }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-card w-80 sm:w-96 h-[28rem] rounded-2xl shadow-2xl border border-border mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 origin-bottom-right">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <h3 className="font-semibold">Chatbot Tư Vấn</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary-foreground/20 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-muted/30 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2 ${msg.isBot ? "justify-start items-end" : "justify-end items-end"}`}
              >
                {msg.isBot && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div 
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.isBot 
                      ? "bg-card border border-border text-foreground rounded-bl-none shadow-sm" 
                      : "bg-primary text-primary-foreground rounded-br-none shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-border bg-card">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-muted border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-10 h-10"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <div className="relative group flex items-center">
          <div className="absolute right-full mr-4 bg-card text-foreground px-4 py-2 rounded-xl shadow-lg border border-border text-sm font-medium whitespace-nowrap opacity-100 animate-bounce">
            Bạn cần tư vấn?
            {/* Tooltip Arrow */}
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 border-8 border-transparent border-l-card" />
            <div className="absolute top-1/2 -right-[9px] -translate-y-1/2 border-8 border-transparent border-l-border -z-10" />
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform focus:outline-none"
          >
            <Bot className="w-7 h-7 animate-pulse" />
          </button>
        </div>
      )}
    </div>
  );
}
