import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your AI friend here to support you. I'm here to listen, offer coping strategies, and help you navigate any challenges you're facing. What's on your mind today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const { data: user } = await supabase.auth.getUser();
      
      const { data, error } = await supabase.functions.invoke('ai-friend', {
        body: {
          message,
          user_id: user.user?.id
        }
      });

      if (error) throw error;

      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error response
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting right now. If you need immediate support, please reach out to a counselor or call a crisis helpline. I'll be here when the connection is restored.",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to connect to AI friend. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your AI friend here to support you. I'm here to listen, offer coping strategies, and help you navigate any challenges you're facing. What's on your mind today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  return {
    messages,
    loading,
    sendMessage,
    clearChat
  };
}