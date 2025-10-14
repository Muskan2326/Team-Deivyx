import React, { useState } from 'react';
import { Gamepad2, Play, Target, Heart, Brain, Timer, Star, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
  gradient: string;
  color: string;
}

const games: Game[] = [
  {
    id: 'breathing-circle',
    title: 'Breathing Circle',
    description: 'Follow the expanding and contracting circle to practice deep breathing exercises that reduce anxiety and stress.',
    category: 'Mindfulness',
    difficulty: 'Easy',
    duration: '5-10 min',
    icon: Heart,
    benefits: ['Reduces anxiety', 'Improves focus', 'Calms mind'],
    gradient: 'from-primary/20 to-primary/10',
    color: 'primary'
  },
  {
    id: 'focus-dots',
    title: 'Focus Dots',
    description: 'A simple concentration game where you focus on moving dots to improve attention and mindfulness.',
    category: 'Concentration',
    difficulty: 'Easy',
    duration: '3-5 min',
    icon: Target,
    benefits: ['Improves focus', 'Reduces distractions', 'Enhances attention'],
    gradient: 'from-secondary/20 to-secondary/10',
    color: 'secondary'
  },
  {
    id: 'memory-calm',
    title: 'Memory Calm',
    description: 'A gentle memory matching game with soothing visuals designed to engage your mind while staying relaxed.',
    category: 'Cognitive',
    difficulty: 'Medium',
    duration: '10-15 min',
    icon: Brain,
    benefits: ['Enhances memory', 'Reduces stress', 'Improves cognitive function'],
    gradient: 'from-accent/20 to-accent/10',
    color: 'accent'
  },
  {
    id: 'zen-garden',
    title: 'Digital Zen Garden',
    description: 'Create patterns in a virtual zen garden to promote relaxation and mindful creativity.',
    category: 'Creativity',
    difficulty: 'Easy',
    duration: '10-20 min',
    icon: Heart,
    benefits: ['Promotes relaxation', 'Encourages creativity', 'Reduces anxiety'],
    gradient: 'from-success/20 to-success/10',
    color: 'success'
  }
];

interface GameSession {
  gameId: string;
  isActive: boolean;
  timeRemaining: number;
  score: number;
}

export default function WellnessGames() {
  const [activeGame, setActiveGame] = useState<GameSession | null>(null);
  const [gameStats, setGameStats] = useState({
    totalSessions: 23,
    totalTime: 180, // minutes
    favoriteGame: 'Breathing Circle',
    streak: 5
  });

  const startGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      setActiveGame({
        gameId,
        isActive: true,
        timeRemaining: 300, // 5 minutes default
        score: 0
      });
    }
  };

  const endGame = () => {
    setActiveGame(null);
    setGameStats(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      totalTime: prev.totalTime + 5
    }));
  };

  if (activeGame) {
    return (
      <GamePlayer 
        game={games.find(g => g.id === activeGame.gameId)!}
        session={activeGame}
        onEnd={endGame}
      />
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full mb-4">
            <Gamepad2 className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Wellness Gaming</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-success via-primary to-secondary bg-clip-text text-transparent">
            Wellness Games
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Play calming, mindful games designed to reduce stress, improve focus, and promote mental well-being.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Card className="wellness-card text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{gameStats.totalSessions}</div>
              <div className="text-sm text-muted-foreground">Games Played</div>
            </CardContent>
          </Card>
          
          <Card className="wellness-card text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-secondary">{gameStats.totalTime}m</div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </CardContent>
          </Card>
          
          <Card className="wellness-card text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">{gameStats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="wellness-card text-center">
            <CardContent className="pt-6">
              <div className="text-lg font-bold text-success">⭐</div>
              <div className="text-xs text-muted-foreground">Daily Goal</div>
            </CardContent>
          </Card>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <Card 
                key={game.id}
                className={`wellness-card group hover:border-${game.color}/30 bg-gradient-to-br ${game.gradient}`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${game.color} to-${game.color}/80 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={`border-${game.color}/30 text-${game.color} mb-2`}>
                        {game.difficulty}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{game.duration}</div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {game.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-1">
                        {game.benefits.map((benefit) => (
                          <Badge key={benefit} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => startGame(game.id)}
                      className={`w-full bg-${game.color} hover:bg-${game.color}/90 text-white`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Game
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Today's Challenge */}
        <Card className="wellness-card bg-gradient-to-r from-warning/10 to-accent/10 border-warning/20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <CardContent className="pt-6">
            <div className="text-center">
              <Trophy className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Today's Mindfulness Challenge</h3>
              <p className="text-muted-foreground mb-4">
                Complete 10 minutes of wellness games to maintain your streak and earn today's achievement.
              </p>
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>5/10 minutes</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <Button variant="outline" className="border-warning/30 text-warning hover:bg-warning/10">
                <Target className="w-4 h-4 mr-2" />
                View All Challenges
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface GamePlayerProps {
  game: Game;
  session: GameSession;
  onEnd: () => void;
}

function GamePlayer({ game, session, onEnd }: GamePlayerProps) {
  const [timeLeft, setTimeLeft] = useState(session.timeRemaining);
  const [isPlaying, setIsPlaying] = useState(false);
  
  React.useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      onEnd();
    }
  }, [isPlaying, timeLeft, onEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderGame = () => {
    switch (game.id) {
      case 'breathing-circle':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="breathing-circle w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-glow"></div>
          </div>
        );
      case 'focus-dots':
        return (
          <div className="flex items-center justify-center h-64 relative">
            <div className="absolute top-8 left-8 w-4 h-4 bg-secondary rounded-full animate-gentle-pulse"></div>
            <div className="absolute top-16 right-12 w-3 h-3 bg-accent rounded-full animate-gentle-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-12 left-16 w-5 h-5 bg-primary rounded-full animate-gentle-pulse" style={{ animationDelay: '2s' }}></div>
            <p className="text-center text-muted-foreground">Focus on the pulsing dots and breathe deeply</p>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64 text-center">
            <div>
              <div className="text-6xl mb-4">🎮</div>
              <p className="text-muted-foreground">Game interface would be implemented here</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{game.title}</h1>
            <p className="text-muted-foreground">{game.category} • {game.difficulty}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">{formatTime(timeLeft)}</div>
            <div className="text-sm text-muted-foreground">Time Remaining</div>
          </div>
        </div>

        {/* Game Area */}
        <Card className="wellness-card mb-6">
          <CardContent className="p-8">
            {renderGame()}
          </CardContent>
        </Card>

        {/* Game Controls */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={onEnd}
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            End Game
          </Button>
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`bg-${game.color} hover:bg-${game.color}/90`}
          >
            {isPlaying ? 'Pause' : 'Start'}
          </Button>
        </div>

        {/* Instructions */}
        <Card className="wellness-card mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">How to Play:</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {game.description} Take your time, breathe deeply, and focus on the present moment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}