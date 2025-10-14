import React, { useState } from 'react';
import { HelpCircle, Phone, MessageCircle, Clock, Users, Heart, AlertTriangle, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const helplineNumbers = [
  {
    name: 'Campus Counseling Center',
    number: '+1 (555) 123-4567',
    hours: '9 AM - 5 PM (Mon-Fri)',
    type: 'On Campus',
    emergency: false
  },
  {
    name: 'Crisis Support Hotline',
    number: '+1 (555) 987-6543',
    hours: '24/7 Available',
    type: 'Crisis Support',
    emergency: true
  },
  {
    name: 'Student Support Services',
    number: '+1 (555) 456-7890',
    hours: '8 AM - 8 PM (Daily)',
    type: 'General Support',
    emergency: false
  },
  {
    name: 'Mental Health First Aid',
    number: '+1 (555) 111-2222',
    hours: '24/7 Available',
    type: 'Mental Health',
    emergency: true
  }
];

const volunteers = [
  {
    id: '1',
    name: 'Sarah M.',
    specialty: 'Anxiety & Stress Management',
    experience: '3 years',
    rating: 4.9,
    available: true,
    bio: 'Psychology graduate student specializing in cognitive behavioral techniques for anxiety management.'
  },
  {
    id: '2',
    name: 'Alex R.',
    specialty: 'Depression Support',
    experience: '2 years',
    rating: 4.8,
    available: false,
    bio: 'Peer counselor with personal experience in depression recovery and mindfulness practices.'
  },
  {
    id: '3',
    name: 'Maria L.',
    specialty: 'Academic Stress',
    experience: '4 years',
    rating: 5.0,
    available: true,
    bio: 'Senior student mentor focusing on academic pressure, time management, and study-life balance.'
  }
];

const faqData = [
  {
    question: "How confidential is this platform?",
    answer: "All your interactions on MindCare are completely confidential. We use industry-standard encryption and never share personal information. Your chat history, survey responses, and community posts (when anonymous) are protected by strict privacy policies."
  },
  {
    question: "What should I do in a mental health crisis?",
    answer: "If you're having thoughts of self-harm or suicide, please contact emergency services immediately (911) or call our 24/7 Crisis Support Hotline. Don't wait - reach out for immediate professional help. You can also go to your nearest emergency room or contact campus security."
  },
  {
    question: "How do I connect with a campus counselor?",
    answer: "You can book an appointment through our platform or call the Campus Counseling Center directly. Appointments are typically available within 48-72 hours. For urgent but non-crisis situations, same-day consultations may be available."
  },
  {
    question: "Can I use this platform anonymously?",
    answer: "Yes! You can participate in community discussions, chat with volunteers, and access most resources anonymously. Your User ID protects your identity while still allowing you to build connections and track your progress."
  },
  {
    question: "What if I'm not sure if I need professional help?",
    answer: "Take our mental health assessments (PHQ-9, GAD-7) to get a better understanding of your mental health status. Our AI friend can also provide guidance. Remember, seeking help is always okay - you don't need to wait until you're in crisis."
  },
  {
    question: "Are the volunteers trained professionals?",
    answer: "Our volunteers are trained peer counselors, psychology students, and experienced community members. While they provide valuable support, they are not licensed therapists. For clinical needs, we'll connect you with professional counselors."
  }
];

export default function Help() {
  const [messageForm, setMessageForm] = useState({
    userId: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Message submitted:', messageForm);
    // Reset form
    setMessageForm({ userId: '', subject: '', message: '', priority: 'normal' });
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Support & Resources</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-destructive via-primary to-secondary bg-clip-text text-transparent">
            Get Help & Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with trained volunteers, access crisis support, and find the help you need. You're never alone.
          </p>
        </div>

        {/* Crisis Alert */}
        <Card className="wellness-card mb-8 bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/30 animate-fade-in-up">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  If you're having thoughts of self-harm or are in crisis, please reach out immediately:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Call 911
                  </Button>
                  <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10">
                    Crisis Hotline: (555) 987-6543
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Helpline Numbers */}
            <Card className="wellness-card animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Helpline Numbers
                </CardTitle>
                <CardDescription>
                  Direct access to professional support services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {helplineNumbers.map((helpline, index) => (
                  <div 
                    key={index}
                    className={`
                      p-4 rounded-xl border-2 transition-all
                      ${helpline.emergency 
                        ? 'border-destructive/30 bg-destructive/5' 
                        : 'border-border bg-muted/20'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{helpline.name}</h4>
                      {helpline.emergency && (
                        <Badge variant="destructive" className="text-xs">
                          24/7 Crisis
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="font-mono font-medium text-primary">{helpline.number}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{helpline.hours}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {helpline.type}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Send Message */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-secondary" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Reach out via your User ID for confidential support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="userId" className="text-sm font-medium">Your User ID</Label>
                    <Input
                      id="userId"
                      value={messageForm.userId}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, userId: e.target.value }))}
                      placeholder="MC_XXXXXX"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                    <Input
                      id="subject"
                      value={messageForm.subject}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Brief description of your concern"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                    <Textarea
                      id="message"
                      value={messageForm.message}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Share what's on your mind. We're here to help..."
                      className="mt-1 min-h-[100px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Chat with Volunteers */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Chat with Volunteers
                </CardTitle>
                <CardDescription>
                  Connect with trained peer counselors and volunteers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {volunteers.map((volunteer) => (
                  <div 
                    key={volunteer.id}
                    className="p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{volunteer.name}</h4>
                        <p className="text-sm text-primary">{volunteer.specialty}</p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={volunteer.available ? "secondary" : "outline"}
                          className={volunteer.available ? "bg-success/20 text-success" : ""}
                        >
                          {volunteer.available ? 'Available' : 'Busy'}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          ⭐ {volunteer.rating} • {volunteer.experience}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{volunteer.bio}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      disabled={!volunteer.available}
                      className="w-full border-accent/30 text-accent hover:bg-accent/10 disabled:opacity-50"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {volunteer.available ? 'Start Chat' : 'Currently Unavailable'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Common questions about mental health and our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-sm font-medium hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Resources */}
        <Card className="wellness-card mt-8 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="pt-6">
            <Heart className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Remember: You Are Not Alone
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Seeking help is a sign of strength, not weakness. Every step you take towards better mental health 
              is important and valued. Our community and professional support network are here for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                Campus Resources Guide
              </Button>
              <Button variant="outline" className="border-secondary/30 text-secondary hover:bg-secondary/10">
                Mental Health Tips
              </Button>
              <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10">
                Emergency Contacts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}