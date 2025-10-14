import React, { useState } from 'react';
import { Palette, Camera, Mic, PenTool, Heart, Share2, MessageCircle, Plus, Image, Music, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CreativePost {
  id: string;
  author: string;
  avatar: string;
  type: 'drawing' | 'photo' | 'audio' | 'text' | 'poem';
  title: string;
  content: string;
  description?: string;
  tags: string[];
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
  mood?: string;
}

const mockPosts: CreativePost[] = [
  {
    id: '1',
    author: 'CreativeSpirit_22',
    avatar: 'CS',
    type: 'drawing',
    title: 'Sunset Over Campus',
    content: '🎨', // In real app, this would be an image URL
    description: 'Painted this view from my dorm window. Sometimes art helps me process difficult emotions and find peace.',
    tags: ['art', 'painting', 'campus', 'sunset', 'therapy'],
    likes: 28,
    comments: 12,
    timestamp: '3 hours ago',
    isLiked: false,
    mood: 'peaceful'
  },
  {
    id: '2',
    author: 'PoetInProgress',
    avatar: 'PP',
    type: 'poem',
    title: 'Breathe',
    content: `In moments when the world feels heavy,
And thoughts swirl like autumn leaves,
I close my eyes and simply breathe—
Finding calm in the gentle rhythm
Of air flowing in and out,
Reminding me that I am here,
I am present, I am enough.`,
    description: 'A short poem I wrote during a particularly anxious day. Poetry has become my anchor.',
    tags: ['poetry', 'mindfulness', 'anxiety', 'healing'],
    likes: 45,
    comments: 18,
    timestamp: '1 day ago',
    isLiked: true,
    mood: 'reflective'
  },
  {
    id: '3',
    author: 'MelodyMaker',
    avatar: 'MM',
    type: 'audio',
    title: 'Rainy Day Blues',
    content: '🎵', // In real app, this would be an audio player
    description: 'Recorded this little melody on a rainy afternoon. Music has always been my way of expressing what words cannot.',
    tags: ['music', 'blues', 'rainy day', 'expression'],
    likes: 34,
    comments: 9,
    timestamp: '2 days ago',
    isLiked: false,
    mood: 'melancholic'
  },
  {
    id: '4',
    author: 'PhotoSoul',
    avatar: 'PS',
    type: 'photo',
    title: 'Morning Light',
    content: '📸', // In real app, this would be an image URL
    description: 'Captured this moment during my morning walk. Photography helps me notice the beauty even in difficult times.',
    tags: ['photography', 'morning', 'light', 'beauty', 'mindfulness'],
    likes: 52,
    comments: 21,
    timestamp: '3 days ago',
    isLiked: true,
    mood: 'hopeful'
  }
];

const creativeTypes = [
  { id: 'text', label: 'Text', icon: FileText, description: 'Share your thoughts and stories' },
  { id: 'drawing', label: 'Drawing', icon: PenTool, description: 'Upload your artwork and sketches' },
  { id: 'photo', label: 'Photo', icon: Camera, description: 'Share meaningful photographs' },
  { id: 'audio', label: 'Audio', icon: Mic, description: 'Record voice notes or music' },
  { id: 'poem', label: 'Poetry', icon: Palette, description: 'Express through poetry and verse' }
];

export default function ExpressYourself() {
  const [posts, setPosts] = useState<CreativePost[]>(mockPosts);
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState({
    type: 'text' as CreativePost['type'],
    title: '',
    content: '',
    description: '',
    tags: [] as string[],
    tagInput: ''
  });

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1 
            }
          : post
      )
    );
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !newPost.tags.includes(tag.trim())) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()],
        tagInput: ''
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: CreativePost = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'YO',
      type: newPost.type,
      title: newPost.title,
      content: newPost.content,
      description: newPost.description,
      tags: newPost.tags,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost({ type: 'text', title: '', content: '', description: '', tags: [], tagInput: '' });
    setActiveTab('feed');
  };

  const moodColors = {
    peaceful: 'border-l-4 border-l-success bg-success/5',
    reflective: 'border-l-4 border-l-primary bg-primary/5',
    melancholic: 'border-l-4 border-l-secondary bg-secondary/5',
    hopeful: 'border-l-4 border-l-warning bg-warning/5',
    default: 'border-l-4 border-l-muted bg-muted/5'
  };

  const typeIcons = {
    text: FileText,
    drawing: PenTool,
    photo: Image,
    audio: Music,
    poem: Palette
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light/30 rounded-full mb-4">
            <Palette className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Creative Expression</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
            Express Yourself
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share your creativity, connect through art, and find healing through expression. This is your space to be authentic and creative.
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="feed" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Creative Feed
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Create Post
            </TabsTrigger>
          </TabsList>

          {/* Creative Feed */}
          <TabsContent value="feed" className="space-y-6">
            {/* Inspiration Banner */}
            <Card className="wellness-card bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20 animate-fade-in-up">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Palette className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Express Your Inner World</h3>
                  <p className="text-muted-foreground mb-4">
                    Art, music, writing, and creativity are powerful tools for processing emotions and connecting with others.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('create')}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Share Your Creativity
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post, index) => {
                const TypeIcon = typeIcons[post.type];
                return (
                  <Card 
                    key={post.id} 
                    className={`wellness-card animate-fade-in-up ${
                      post.mood ? moodColors[post.mood as keyof typeof moodColors] : moodColors.default
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-accent to-primary text-white text-sm font-medium">
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{post.author}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <TypeIcon className="w-3 h-3" />
                            {post.type.charAt(0).toUpperCase() + post.type.slice(1)} • {post.timestamp}
                          </p>
                        </div>
                        {post.mood && (
                          <Badge variant="outline" className={`
                            ${post.mood === 'peaceful' ? 'border-success/30 text-success' : ''}
                            ${post.mood === 'reflective' ? 'border-primary/30 text-primary' : ''}
                            ${post.mood === 'melancholic' ? 'border-secondary/30 text-secondary' : ''}
                            ${post.mood === 'hopeful' ? 'border-warning/30 text-warning' : ''}
                          `}>
                            {post.mood}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                        
                        {/* Content Display */}
                        <div className="mb-4">
                          {post.type === 'text' || post.type === 'poem' ? (
                            <div className={`p-4 rounded-xl bg-muted/20 ${post.type === 'poem' ? 'font-serif italic' : ''}`}>
                              <p className="whitespace-pre-wrap leading-relaxed text-foreground">
                                {post.content}
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-32 bg-muted/20 rounded-xl">
                              <div className="text-center">
                                <div className="text-4xl mb-2">{post.content}</div>
                                <p className="text-sm text-muted-foreground">
                                  {post.type === 'drawing' && 'Artwork would be displayed here'}
                                  {post.type === 'photo' && 'Photo would be displayed here'}
                                  {post.type === 'audio' && 'Audio player would be here'}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {post.description && (
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {post.description}
                          </p>
                        )}
                        
                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`
                              flex items-center gap-2 px-3 py-1.5 rounded-full transition-all
                              ${post.isLiked 
                                ? 'bg-destructive/20 text-destructive' 
                                : 'hover:bg-muted/50 text-muted-foreground hover:text-destructive'
                              }
                            `}
                          >
                            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{post.likes}</span>
                          </button>
                          
                          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-primary transition-all">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">{post.comments}</span>
                          </button>
                        </div>
                        
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-accent transition-all">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Create Post */}
          <TabsContent value="create" className="space-y-6">
            <Card className="wellness-card animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Create New Post
                </CardTitle>
                <CardDescription>
                  Share your creativity with the community. All forms of expression are welcome and valued.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmitPost} className="space-y-6">
                  {/* Post Type Selection */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">What would you like to share?</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {creativeTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setNewPost(prev => ({ ...prev, type: type.id as CreativePost['type'] }))}
                            className={`
                              p-4 rounded-xl border-2 text-center transition-all
                              ${newPost.type === type.id
                                ? 'border-accent bg-accent/10 text-accent'
                                : 'border-border hover:border-accent/50 hover:bg-muted/50'
                              }
                            `}
                          >
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${newPost.type === type.id ? 'text-accent' : 'text-muted-foreground'}`} />
                            <div className="text-sm font-medium">{type.label}</div>
                            <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="text-sm font-medium text-foreground mb-2 block">Title</label>
                    <Input
                      id="title"
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Give your creation a title..."
                      className="border-accent/30 focus:border-accent"
                      required
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label htmlFor="content" className="text-sm font-medium text-foreground mb-2 block">
                      {newPost.type === 'text' && 'Your Text'}
                      {newPost.type === 'poem' && 'Your Poem'}
                      {newPost.type === 'drawing' && 'Upload Your Artwork'}
                      {newPost.type === 'photo' && 'Upload Your Photo'}
                      {newPost.type === 'audio' && 'Upload Your Audio'}
                    </label>
                    
                    {newPost.type === 'text' || newPost.type === 'poem' ? (
                      <Textarea
                        id="content"
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        placeholder={
                          newPost.type === 'poem' 
                            ? "Write your poem here..." 
                            : "Share your thoughts, story, or reflection..."
                        }
                        className={`min-h-[150px] border-accent/30 focus:border-accent ${
                          newPost.type === 'poem' ? 'font-serif' : ''
                        }`}
                        required
                      />
                    ) : (
                      <div className="border-2 border-dashed border-accent/30 rounded-xl p-8 text-center">
                        <div className="text-4xl mb-4">📎</div>
                        <p className="text-muted-foreground mb-4">
                          {newPost.type === 'drawing' && 'Upload your artwork or drawing'}
                          {newPost.type === 'photo' && 'Upload your photograph'}
                          {newPost.type === 'audio' && 'Upload your audio recording'}
                        </p>
                        <Button variant="outline" type="button" className="border-accent/30 text-accent hover:bg-accent/10">
                          Choose File
                        </Button>
                        {/* Hidden for demo - in real app, this would be a file input */}
                        <input 
                          type="hidden" 
                          value={newPost.content}
                          onChange={(e) => setNewPost(prev => ({ ...prev, content: 'File uploaded' }))}
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="text-sm font-medium text-foreground mb-2 block">
                      Description <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <Textarea
                      id="description"
                      value={newPost.description}
                      onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Tell us about your creation, your inspiration, or what it means to you..."
                      className="border-accent/30 focus:border-accent"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Tags</label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={newPost.tagInput}
                        onChange={(e) => setNewPost(prev => ({ ...prev, tagInput: e.target.value }))}
                        placeholder="Add tags..."
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(newPost.tagInput);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => addTag(newPost.tagInput)}
                        disabled={!newPost.tagInput.trim()}
                        className="bg-accent hover:bg-accent/90"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newPost.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-destructive/20"
                          onClick={() => removeTag(tag)}
                        >
                          #{tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={!newPost.title.trim() || !newPost.content.trim()}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Your Creation
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setNewPost({ type: 'text', title: '', content: '', description: '', tags: [], tagInput: '' })}
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Creative Tips */}
            <Card className="wellness-card bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-destructive" />
                  Creative Expression Tips
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• There's no "right" or "wrong" way to express yourself creatively</li>
                  <li>• Share authentically - your unique perspective matters</li>
                  <li>• Use creativity as a way to process emotions and experiences</li>
                  <li>• Be supportive and encouraging to others in their creative journey</li>
                  <li>• Remember that creating is more important than perfection</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}