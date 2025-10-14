import React, { useState } from 'react';
import { Play, Video, Headphones, FileText, Search, Filter, Star, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'guide';
  duration: string;
  rating: number;
  views: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  thumbnail: string;
  instructor?: string;
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Breathing Techniques for Anxiety Relief',
    description: 'Learn 5 powerful breathing exercises that can help calm anxiety in just minutes. Perfect for students dealing with exam stress.',
    type: 'video',
    duration: '12:30',
    rating: 4.9,
    views: 1240,
    category: 'Anxiety Management',
    difficulty: 'Beginner',
    tags: ['breathing', 'anxiety', 'stress relief', 'quick help'],
    thumbnail: '🫁',
    instructor: 'Dr. Sarah Chen'
  },
  {
    id: '2',
    title: 'Mindful Study Sessions',
    description: 'A guided audio session to help you focus better during study time while maintaining calm and clarity.',
    type: 'audio',
    duration: '20:00',
    rating: 4.8,
    views: 890,
    category: 'Study Wellness',
    difficulty: 'Beginner',
    tags: ['mindfulness', 'focus', 'study', 'concentration'],
    thumbnail: '🎧',
    instructor: 'Mark Rodriguez'
  },
  {
    id: '3',
    title: 'Complete Guide to Sleep Hygiene',
    description: 'Comprehensive guide covering everything from creating the perfect sleep environment to developing healthy bedtime routines.',
    type: 'guide',
    duration: '15 min read',
    rating: 4.7,
    views: 2100,
    category: 'Sleep & Rest',
    difficulty: 'Intermediate',
    tags: ['sleep', 'rest', 'routine', 'health'],
    thumbnail: '📚',
    instructor: 'Dr. Lisa Park'
  },
  {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'Step-by-step video guide to progressive muscle relaxation technique for deep stress relief and better sleep.',
    type: 'video',
    duration: '25:15',
    rating: 4.9,
    views: 1560,
    category: 'Relaxation',
    difficulty: 'Beginner',
    tags: ['relaxation', 'muscle tension', 'sleep', 'stress relief'],
    thumbnail: '🧘‍♀️',
    instructor: 'Emma Thompson'
  },
  {
    id: '5',
    title: 'Meditation for Emotional Balance',
    description: 'Guided meditation session specifically designed to help process emotions and find inner balance during challenging times.',
    type: 'audio',
    duration: '18:45',
    rating: 4.8,
    views: 1320,
    category: 'Emotional Wellness',
    difficulty: 'Intermediate',
    tags: ['meditation', 'emotions', 'balance', 'self-care'],
    thumbnail: '🧘',
    instructor: 'Alex Kumar'
  },
  {
    id: '6',
    title: 'Building Resilience Workbook',
    description: 'Interactive guide with exercises and strategies to build mental resilience and cope with academic and personal challenges.',
    type: 'guide',
    duration: '30 min read',
    rating: 4.6,
    views: 780,
    category: 'Personal Growth',
    difficulty: 'Advanced',
    tags: ['resilience', 'coping', 'growth', 'strategies'],
    thumbnail: '💪',
    instructor: 'Dr. Michael Lee'
  }
];

const categories = ['All', 'Anxiety Management', 'Study Wellness', 'Sleep & Rest', 'Relaxation', 'Emotional Wellness', 'Personal Growth'];

export default function VideoCoaching() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (selectedResource) {
    return (
      <ResourceViewer 
        resource={selectedResource} 
        onBack={() => setSelectedResource(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light/30 rounded-full mb-4">
            <Video className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Mental Wellness Resources</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
            Video Coaching & Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access professional videos, guided audio sessions, and comprehensive guides to support your mental wellness journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search videos, guides, or topics..."
              className="pl-10 bg-background border-border/50 focus:border-accent/50"
            />
          </div>
          <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid grid-cols-4 md:grid-cols-7 h-auto p-1 bg-muted/50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xs md:text-sm py-2 px-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Featured Resource */}
        {filteredResources.length > 0 && (
          <Card className="wellness-card mb-8 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <Badge className="mb-2 bg-accent/20 text-accent">Featured Resource</Badge>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{filteredResources[0].title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{filteredResources[0].description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {filteredResources[0].duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning" />
                      {filteredResources[0].rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {filteredResources[0].views} views
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">{filteredResources[0].thumbnail}</div>
                  <Button 
                    onClick={() => setSelectedResource(filteredResources[0])}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.slice(1).map((resource, index) => {
            const typeIcons = {
              video: Video,
              audio: Headphones,
              guide: FileText
            };
            const TypeIcon = typeIcons[resource.type];

            return (
              <Card 
                key={resource.id}
                className="wellness-card cursor-pointer group hover:border-accent/30"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                onClick={() => setSelectedResource(resource)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {resource.thumbnail}
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={`
                        ${resource.type === 'video' ? 'border-accent/30 text-accent' : ''}
                        ${resource.type === 'audio' ? 'border-primary/30 text-primary' : ''}
                        ${resource.type === 'guide' ? 'border-secondary/30 text-secondary' : ''}
                      `}>
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg group-hover:text-accent transition-colors line-clamp-2">
                    {resource.title}
                  </CardTitle>
                  
                  {resource.instructor && (
                    <p className="text-sm text-muted-foreground">by {resource.instructor}</p>
                  )}
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="line-clamp-3 mb-4">
                    {resource.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {resource.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning" />
                      {resource.rating}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10 group-hover:bg-accent/20">
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <Card className="wellness-card text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or browse different categories.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="border-accent/30 text-accent hover:bg-accent/10"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface ResourceViewerProps {
  resource: Resource;
  onBack: () => void;
}

function ResourceViewer({ resource, onBack }: ResourceViewerProps) {
  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-accent"
        >
          ← Back to Resources
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="wellness-card">
              <CardContent className="p-0">
                {/* Video/Audio Player Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-t-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">{resource.thumbnail}</div>
                    <Button size="lg" className="bg-accent hover:bg-accent/90">
                      <Play className="w-6 h-6 mr-2" />
                      {resource.type === 'guide' ? 'Read Guide' : `Play ${resource.type}`}
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {resource.title}
                      </h1>
                      {resource.instructor && (
                        <p className="text-lg text-muted-foreground">by {resource.instructor}</p>
                      )}
                    </div>
                    <Badge className="bg-accent/20 text-accent">
                      {resource.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {resource.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning" />
                      {resource.rating} ({resource.views} views)
                    </span>
                    <span className="px-2 py-1 bg-muted/50 rounded-full text-xs">
                      {resource.category}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {resource.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  Add to Playlist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Rate Resource
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Share with Community
                </Button>
              </CardContent>
            </Card>

            {/* Related Resources */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">Related Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockResources.slice(0, 3).map((related) => (
                  <div key={related.id} className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="text-2xl">{related.thumbnail}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 text-foreground">{related.title}</h4>
                      <p className="text-xs text-muted-foreground">{related.duration}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}