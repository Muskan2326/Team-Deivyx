import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialBotMessage: Message = {
  id: '1',
  text: "Hello! I'm your AI wellness companion. I'm here to listen and support you. How are you feeling today? Remember, this is a safe space where you can share anything on your mind. 💙",
  sender: 'bot',
  timestamp: new Date()
};

const botResponses = [
  "I hear you, and I want you to know that your feelings are completely valid. It's brave of you to share that with me.",
  "Thank you for trusting me with this. Remember, you're not alone in this journey. Many students go through similar experiences.",
  "It sounds like you're dealing with a lot right now. Have you tried any relaxation techniques like deep breathing?",
  "I'm proud of you for reaching out. That takes real courage. How long have you been feeling this way?",
  "Your mental health matters, and so do you. Would you like me to suggest some coping strategies that might help?",
  "I'm here to listen without judgment. Sometimes just talking about things can help us process them better.",
  "It's okay to not be okay sometimes. What usually helps you feel a bit better when you're going through tough times?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  return (
    <div className="min-h-screen pt-20 pb-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-6rem)] flex flex-col">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/30 rounded-full mb-4">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Wellness Companion</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Chat with Your AI Friend
          </h1>
          <p className="text-muted-foreground">
            A safe space to share your thoughts and feelings. All conversations are confidential.
          </p>
        </div>

        {/* Chat Container */}
        <Card className="wellness-card flex-1 flex flex-col min-h-0">
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  } animate-fade-in-up`}
                >
                  {/* Avatar */}
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    ${message.sender === 'user' 
                      ? 'bg-gradient-to-br from-primary to-primary-glow' 
                      : 'bg-gradient-to-br from-secondary to-accent'
                    }
                  `}>
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Heart className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`
                    flex-1 max-w-[75%] space-y-1
                    ${message.sender === 'user' ? 'items-end' : 'items-start'}
                  `}>
                    <div className={`
                      inline-block px-4 py-3 rounded-2xl
                      ${message.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-md'
                        : 'bg-muted text-muted-foreground rounded-tl-md'
                      }
                    `}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground px-2">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-3 animate-fade-in-up">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-md">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 p-4 bg-muted/20">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Share what's on your mind..."
                    className="pr-12 bg-background border-border/50 focus:border-primary/50 rounded-xl"
                    disabled={isTyping}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Sparkles className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!inputText.trim() || isTyping}
                  className="bg-primary hover:bg-primary-glow text-white rounded-xl px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                This AI companion provides support but is not a replacement for professional therapy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {[
            "I'm feeling anxious",
            "I'm stressed about exams", 
            "I feel lonely",
            "I need motivation"
          ].map((quickMessage) => (
            <Button
              key={quickMessage}
              variant="outline"
              size="sm"
              onClick={() => setInputText(quickMessage)}
              className="text-xs border-primary/30 text-primary hover:bg-primary-light/20"
              disabled={isTyping}
            >
              {quickMessage}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}