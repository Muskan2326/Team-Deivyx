import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Search, Filter, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { usePosts } from '@/hooks/usePosts';

export default function Community() {
  const { posts, loading, createPost, toggleLike, addComment } = usePosts();
  const [newPost, setNewPost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [commentTexts, setCommentTexts] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    await createPost(newPost);
    setNewPost('');
    setShowNewPostForm(false);
  };

  const handleAddComment = async (postId: string) => {
    const commentText = commentTexts[postId];
    if (!commentText?.trim()) return;

    await addComment(postId, commentText);
    setCommentTexts(prev => ({ ...prev, [postId]: '' }));
  };

  const moodColors = {
    hopeful: 'border-l-4 border-l-success bg-success/5',
    uncertain: 'border-l-4 border-l-warning bg-warning/5',
    grateful: 'border-l-4 border-l-primary bg-primary/5',
    default: 'border-l-4 border-l-muted bg-muted/5'
  };

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.profiles?.nickname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-light/30 rounded-full mb-4">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Peer Support Community</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Community Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow students, share your experiences, and support each other in a safe space.
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts, topics, or feelings..."
              className="pl-10 bg-background border-border/50 focus:border-secondary/50"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-secondary/30 text-secondary hover:bg-secondary/10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button 
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              size="sm" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        {/* New Post Form */}
        {showNewPostForm && (
          <Card className="wellness-card mb-8 animate-fade-in-up">
            <CardHeader>
              <h3 className="font-semibold text-foreground">Share with the Community</h3>
              <p className="text-sm text-muted-foreground">
                Your post will be anonymous. Share your thoughts, feelings, or experiences.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPost} className="space-y-4">
                <Textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind? Share your thoughts, experiences, or something that might help others..."
                  className="min-h-[120px] bg-background border-border/50 focus:border-secondary/50"
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    Remember to be kind and supportive to fellow community members.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowNewPostForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      size="sm"
                      className="bg-secondary hover:bg-secondary/90"
                      disabled={!newPost.trim()}
                    >
                      Share Post
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Community Guidelines */}
        <Card className="wellness-card mb-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              Community Guidelines
            </h3>
            <p className="text-sm text-muted-foreground">
              This is a safe, supportive space. Please be respectful, kind, and remember that everyone is on their own journey. 
              If you're in crisis, please reach out to professional help immediately.
            </p>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">Loading community posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">Be the first to share something with the community!</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                className="wellness-card animate-fade-in-up"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white text-sm font-medium">
                        {post.profiles?.nickname?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{post.profiles?.nickname || 'Anonymous User'}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()} at {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`
                          flex items-center gap-2 px-3 py-1.5 rounded-full transition-all
                          ${post.user_liked 
                            ? 'bg-destructive/20 text-destructive' 
                            : 'hover:bg-muted/50 text-muted-foreground hover:text-destructive'
                          }
                        `}
                      >
                        <Heart className={`w-4 h-4 ${post.user_liked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      
                      <button 
                        onClick={() => setShowComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-primary transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">{post.comments_count}</span>
                      </button>
                    </div>
                    
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-secondary transition-all">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Share Support</span>
                    </button>
                  </div>

                  {/* Comment Section */}
                  {showComments[post.id] && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex gap-2 mb-3">
                        <Input
                          value={commentTexts[post.id] || ''}
                          onChange={(e) => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder="Add a supportive comment..."
                          className="flex-1 text-sm"
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentTexts[post.id]?.trim()}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Comment
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Community Stats */}
        <Card className="wellness-card mt-8 text-center">
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div>
                <div className="text-2xl font-bold text-primary">{posts.length}</div>
                <div className="text-sm text-muted-foreground">Total Posts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">Safe</div>
                <div className="text-sm text-muted-foreground">& Anonymous</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}