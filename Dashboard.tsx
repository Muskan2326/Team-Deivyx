import React from 'react';
import { BarChart3, TrendingUp, Heart, Target, Calendar, Users, MessageCircle, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock data for dashboard
const moodData = [
  { date: 'Mon', mood: 7 },
  { date: 'Tue', mood: 6 },
  { date: 'Wed', mood: 8 },
  { date: 'Thu', mood: 5 },
  { date: 'Fri', mood: 7 },
  { date: 'Sat', mood: 8 },
  { date: 'Sun', mood: 6 },
];

const achievements = [
  { id: 1, title: 'First Survey Complete', description: 'Completed your first mental health assessment', earned: true, icon: '🎯' },
  { id: 2, title: 'Community Helper', description: 'Received 10+ hearts on community posts', earned: true, icon: '❤️' },
  { id: 3, title: 'Mindful Streaks', description: 'Used the platform for 7 consecutive days', earned: false, icon: '🧘' },
  { id: 4, title: 'Wellness Explorer', description: 'Tried all wellness games and activities', earned: false, icon: '🎮' },
];

const weeklyStats = {
  chatSessions: 5,
  communityPosts: 3,
  surveysCompleted: 1,
  wellnessActivities: 8
};

export default function Dashboard() {
  const averageMood = Math.round(moodData.reduce((acc, day) => acc + day.mood, 0) / moodData.length * 10) / 10;
  const moodTrend = moodData[moodData.length - 1].mood > moodData[0].mood ? 'up' : 'down';
  
  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/30 rounded-full mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Wellness Journey</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Track your mental health progress, view insights, and celebrate your wellness milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Tracking Chart */}
            <Card className="wellness-card animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-destructive" />
                  Weekly Mood Tracker
                </CardTitle>
                <CardDescription>
                  Your emotional well-being over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mood Chart */}
                  <div className="relative h-40 flex items-end justify-between gap-2 p-4 bg-muted/20 rounded-xl">
                    {moodData.map((day, index) => (
                      <div key={day.date} className="flex flex-col items-center gap-2">
                        <div className="text-xs text-muted-foreground font-medium">{day.date}</div>
                        <div 
                          className="w-8 bg-gradient-to-t from-primary to-primary-glow rounded-t-md transition-all hover:from-secondary hover:to-accent"
                          style={{ height: `${(day.mood / 10) * 100}px` }}
                          title={`Mood: ${day.mood}/10`}
                        />
                        <div className="text-xs font-semibold text-primary">{day.mood}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mood Insights */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                    <div>
                      <div className="text-sm font-medium text-foreground">Average Mood Score</div>
                      <div className="text-2xl font-bold text-primary">{averageMood}/10</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">Weekly Trend</div>
                      <div className={`flex items-center gap-1 text-sm font-semibold ${moodTrend === 'up' ? 'text-success' : 'text-warning'}`}>
                        <TrendingUp className={`w-4 h-4 ${moodTrend === 'down' ? 'rotate-180' : ''}`} />
                        {moodTrend === 'up' ? 'Improving' : 'Declining'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity Summary */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  This Week's Activity
                </CardTitle>
                <CardDescription>
                  Your engagement with wellness resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                    <MessageCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">{weeklyStats.chatSessions}</div>
                    <div className="text-xs text-muted-foreground">AI Chat Sessions</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl">
                    <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-secondary">{weeklyStats.communityPosts}</div>
                    <div className="text-xs text-muted-foreground">Community Posts</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold text-accent">{weeklyStats.surveysCompleted}</div>
                    <div className="text-xs text-muted-foreground">Survey Completed</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-xl">
                    <Heart className="w-6 h-6 text-success mx-auto mb-2" />
                    <div className="text-2xl font-bold text-success">{weeklyStats.wellnessActivities}</div>
                    <div className="text-xs text-muted-foreground">Wellness Activities</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Celebrate your wellness milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`
                        p-4 rounded-xl border-2 transition-all
                        ${achievement.earned
                          ? 'border-warning/30 bg-gradient-to-br from-warning/10 to-warning/5'
                          : 'border-border bg-muted/20'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {achievement.title}
                            </h4>
                            {achievement.earned && (
                              <Badge variant="secondary" className="bg-warning/20 text-warning text-xs">
                                Earned
                              </Badge>
                            )}
                          </div>
                          <p className={`text-sm ${achievement.earned ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start border-primary/30 text-primary hover:bg-primary/10">
                  <Link to="/chat">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with AI Friend
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-start border-secondary/30 text-secondary hover:bg-secondary/10">
                  <Link to="/surveys">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Take Assessment
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-start border-accent/30 text-accent hover:bg-accent/10">
                  <Link to="/community">
                    <Users className="w-4 h-4 mr-2" />
                    Visit Community
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Goals Progress */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Weekly Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Daily Check-ins</span>
                    <span className="text-muted-foreground">5/7</span>
                  </div>
                  <Progress value={71} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Wellness Activities</span>
                    <span className="text-muted-foreground">8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Community Engagement</span>
                    <span className="text-muted-foreground">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-medium">Completed GAD-7 Survey</span>
                  </div>
                  <div className="text-muted-foreground text-xs ml-4">2 hours ago</div>
                </div>
                
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="font-medium">Shared community post</span>
                  </div>
                  <div className="text-muted-foreground text-xs ml-4">Yesterday</div>
                </div>
                
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="font-medium">AI chat session</span>
                  </div>
                  <div className="text-muted-foreground text-xs ml-4">2 days ago</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}