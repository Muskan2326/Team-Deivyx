import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  message: string;
  user_id?: string;
}

// Mock AI responses for mental health support
const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Crisis detection keywords
  const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'die', 'hopeless'];
  if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return `I'm really concerned about what you're going through. Please reach out to a crisis counselor immediately:
    
📞 National Suicide Prevention Lifeline: 988
📞 Crisis Text Line: Text HOME to 741741
📞 Campus Counseling Center: Available 24/7

You don't have to face this alone. There are people who want to help you through this difficult time. Would you like me to help you connect with a counselor right now?`;
  }
  
  // Anxiety responses
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
    return `I understand you're feeling anxious. That's completely valid. Here are some techniques that might help:

🌱 **Grounding Exercise**: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.

🫁 **Breathing**: Try the 4-7-8 technique - breathe in for 4, hold for 7, exhale for 8.

💭 **Reframe thoughts**: Are your worries based on facts or fears? What would you tell a friend in your situation?

Would you like to try one of these techniques together, or would you prefer to talk about what's making you feel anxious?`;
  }
  
  // Depression responses
  if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('empty')) {
    return `I hear that you're going through a really difficult time. Depression can feel overwhelming, but you're not alone in this.

🌟 **Small steps matter**: What's one tiny thing you could do today just for yourself?

💪 **You're stronger than you know**: You reached out today, and that takes courage.

🤝 **Support is available**: Have you considered talking to a counselor? They can provide professional support.

What feels most manageable for you right now - talking about how you're feeling, or exploring some coping strategies?`;
  }
  
  // Sleep issues
  if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
    return `Sleep troubles can really affect everything else. Here are some gentle suggestions:

🌙 **Sleep hygiene**: Try to go to bed and wake up at the same time daily, even on weekends.

📱 **Screen time**: Consider putting devices away 1 hour before bed.

🧘 **Relaxation**: Try progressive muscle relaxation or gentle stretching.

☕ **Caffeine**: Limit caffeine after 2 PM.

How long have you been having trouble sleeping? Are there specific things keeping you awake?`;
  }
  
  // Stress responses
  if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
    return `Feeling overwhelmed is so common, especially in college. Let's break this down:

📝 **Prioritize**: What are the most urgent things you need to handle?

⏰ **Time management**: Can you break big tasks into smaller, manageable pieces?

🎯 **Boundaries**: It's okay to say no to additional commitments right now.

🤗 **Self-compassion**: You're doing your best with what you have.

What's feeling most overwhelming right now? Sometimes talking through it can help clarify next steps.`;
  }
  
  // Academic stress
  if (lowerMessage.includes('exam') || lowerMessage.includes('study') || lowerMessage.includes('grades') || lowerMessage.includes('school')) {
    return `Academic pressure can be intense! Here are some strategies that help many students:

📚 **Study techniques**: Try the Pomodoro technique (25 min study, 5 min break).

🎯 **Realistic goals**: Focus on progress, not perfection.

👥 **Study groups**: Sometimes explaining concepts to others helps you understand better.

⚖️ **Balance**: Your worth isn't determined by grades. You're more than your academic performance.

What specific aspect of your studies is causing the most stress?`;
  }
  
  // Relationship issues
  if (lowerMessage.includes('friends') || lowerMessage.includes('lonely') || lowerMessage.includes('relationship')) {
    return `Social connections are so important for our well-being. It sounds like this is weighing on you.

🤝 **Quality over quantity**: Even one genuine connection can make a huge difference.

🌱 **Small steps**: Try joining a club, study group, or campus activity that interests you.

💭 **Be yourself**: Authentic connections happen when you can be genuine.

🕰️ **Give it time**: Building meaningful friendships takes time and patience.

What would feel like a comfortable first step for you in connecting with others?`;
  }
  
  // General supportive responses
  const supportiveResponses = [
    `Thank you for sharing with me. It takes courage to talk about what you're going through. How are you feeling right at this moment?`,
    
    `I'm here to listen and support you. What's been on your mind lately that you'd like to talk through?`,
    
    `Everyone needs support sometimes, and I'm glad you're reaching out. What would be most helpful for you right now - talking through a problem, learning some coping strategies, or just having someone listen?`,
    
    `Your feelings are valid, whatever they are. What's one thing that would make today feel a little bit better for you?`,
  ];
  
  return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { message, user_id }: ChatMessage = await req.json();

    if (!message || message.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Message cannot be empty' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get AI response
    const aiResponse = getAIResponse(message);

    // Log the conversation (optional - for analytics)
    if (user_id) {
      try {
        await supabase
          .from('admin_reports')
          .insert({
            stats_json: {
              type: 'chat_interaction',
              user_id,
              message_length: message.length,
              timestamp: new Date().toISOString(),
            }
          });
      } catch (error) {
        console.log('Non-critical error logging chat:', error);
      }
    }

    return new Response(
      JSON.stringify({
        response: aiResponse,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-friend function:', error);
    return new Response(
      JSON.stringify({
        error: 'I apologize, but I encountered an error. Please try again, or if this persists, reach out to a human counselor.',
        response: 'I\'m here to help, even when technology isn\'t perfect. What would you like to talk about?'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});