import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Users, 
  Video, 
  Gamepad2, 
  BookOpen, 
  Palette,
  Heart,
  ArrowRight,
  Sparkles,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'AI Friend',
    description: 'Chat with our caring AI companion for instant support and coping strategies',
    icon: MessageCircle,
    link: '/chat',
    gradient: 'from-primary-light to-primary-glow',
    delay: '0s'
  },
  {
    title: 'Peer Support',
    description: 'Connect with fellow students in a safe, supportive community environment',
    icon: Users,
    link: '/community',
    gradient: 'from-secondary-light to-secondary',
    delay: '0.1s'
  },
  {
    title: 'Video Coaching',
    description: 'Access guided videos and audio sessions for mental wellness',
    icon: Video,
    link: '/video-coaching',
    gradient: 'from-accent-light to-accent',
    delay: '0.2s'
  },
  {
    title: 'Wellness Games',
    description: 'Play calming games designed to reduce stress and anxiety',
    icon: Gamepad2,
    link: '/wellness-games',
    gradient: 'from-success/20 to-success/40',
    delay: '0.3s'
  },
  {
    title: 'Personal Diary',
    description: 'Keep a private journal with auto-save and reflection prompts',
    icon: BookOpen,
    link: '/personal-diary',
    gradient: 'from-warning/20 to-warning/40',
    delay: '0.4s'
  },
  {
    title: 'Express Yourself',
    description: 'Share your thoughts, art, and creativity in a supportive space',
    icon: Palette,
    link: '/express-yourself',
    gradient: 'from-destructive/20 to-destructive/40',
    delay: '0.5s'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Mental Wellness Journey Starts Here</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Welcome to MindCare
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            A safe, supportive space designed specifically for college students. 
            Find comfort, connect with peers, and access professional mental health resources.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-white shadow-soft hover:shadow-glow transition-all duration-300"
            >
              <Link to="/chat" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Start Chatting with AI Friend
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary-light/20"
            >
              <Link to="/surveys">Take a Wellness Survey</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-destructive" />
              <span>Peer Reviewed</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-warning" />
              <span>Available 24/7</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="wellness-card group cursor-pointer hover:border-primary/30"
                style={{ animationDelay: feature.delay }}
              >
                <Link to={feature.link} className="block">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Need Immediate Support?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="wellness-card bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
              <CardContent className="text-center pt-6">
                <div className="w-12 h-12 mx-auto bg-destructive/20 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-2">Crisis Support</h3>
                <p className="text-sm text-muted-foreground mb-4">If you're in crisis, please reach out immediately</p>
                <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10">
                  Call Crisis Line
                </Button>
              </CardContent>
            </Card>

            <Card className="wellness-card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="text-center pt-6">
                <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Talk to Counselor</h3>
                <p className="text-sm text-muted-foreground mb-4">Book an appointment with campus counselors</p>
                <Button asChild variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                  <Link to="/help">Book Appointment</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="wellness-card bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <CardContent className="text-center pt-6">
                <div className="w-12 h-12 mx-auto bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Anonymous Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">Chat anonymously with trained volunteers</p>
                <Button asChild variant="outline" size="sm" className="border-secondary/30 text-secondary hover:bg-secondary/10">
                  <Link to="/chat">Start Anonymous Chat</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}