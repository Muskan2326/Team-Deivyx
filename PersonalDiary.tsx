import React, { useState, useEffect } from 'react';
import { BookOpen, Save, Calendar, Search, Plus, Edit3, Trash2, Heart, Smile, Frown, Meh } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad' | null;
  tags: string[];
  date: Date;
  isPrivate: boolean;
  lastModified: Date;
}

const mockEntries: DiaryEntry[] = [
  {
    id: '1',
    title: 'Feeling Better Today',
    content: 'Had a great conversation with my friend about the upcoming exams. Realized I\'m not alone in feeling stressed about finals. We made a study plan together and I feel much more confident now. Sometimes just talking about your worries makes them seem less overwhelming.',
    mood: 'happy',
    tags: ['friendship', 'exams', 'positivity'],
    date: new Date(2024, 2, 15),
    isPrivate: true,
    lastModified: new Date(2024, 2, 15, 14, 30)
  },
  {
    id: '2',
    title: 'Challenging Day',
    content: 'Today was really tough. The presentation didn\'t go as well as I hoped, and I felt anxious all day. But I did manage to complete my assignment and even helped a classmate with their project. I guess even difficult days have some bright spots.',
    mood: 'sad',
    tags: ['anxiety', 'presentations', 'accomplishments'],
    date: new Date(2024, 2, 12),
    isPrivate: true,
    lastModified: new Date(2024, 2, 12, 20, 15)
  }
];

const moodIcons = {
  happy: { icon: Smile, color: 'text-success', bg: 'bg-success/10' },
  neutral: { icon: Meh, color: 'text-warning', bg: 'bg-warning/10' },
  sad: { icon: Frown, color: 'text-destructive', bg: 'bg-destructive/10' }
};

export default function PersonalDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>(mockEntries);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: null as DiaryEntry['mood'],
    tags: [] as string[],
    tagInput: ''
  });

  // Auto-save functionality
  useEffect(() => {
    if (isEditing && selectedEntry) {
      const autoSaveTimer = setTimeout(() => {
        handleSaveEntry();
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [selectedEntry?.content, selectedEntry?.title, isEditing]);

  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      tags: newEntry.tags,
      date: new Date(),
      isPrivate: true,
      lastModified: new Date()
    };

    setEntries([entry, ...entries]);
    setNewEntry({ title: '', content: '', mood: null, tags: [], tagInput: '' });
    setSelectedEntry(entry);
  };

  const handleSaveEntry = () => {
    if (!selectedEntry) return;

    setEntries(prev => prev.map(entry => 
      entry.id === selectedEntry.id 
        ? { ...selectedEntry, lastModified: new Date() }
        : entry
    ));
    setIsEditing(false);
  };

  const handleDeleteEntry = (entryId: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== entryId));
    if (selectedEntry?.id === entryId) {
      setSelectedEntry(null);
    }
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !newEntry.tags.includes(tag.trim())) {
      setNewEntry(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()],
        tagInput: ''
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewEntry(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-light/30 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Personal Journal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Personal Diary
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A safe space to record your thoughts, track your emotions, and reflect on your journey. All entries are private and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Create New Entry */}
            <Card className="wellness-card animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  New Entry
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Entry title..."
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="border-primary/30 focus:border-primary"
                />
                
                <Textarea
                  placeholder="What's on your mind today?"
                  value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[100px] border-primary/30 focus:border-primary"
                />
                
                {/* Mood Selection */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">How are you feeling?</label>
                  <div className="flex gap-2">
                    {Object.entries(moodIcons).map(([mood, { icon: Icon, color, bg }]) => (
                      <button
                        key={mood}
                        onClick={() => setNewEntry(prev => ({ ...prev, mood: mood as DiaryEntry['mood'] }))}
                        className={`
                          p-2 rounded-lg border-2 transition-all
                          ${newEntry.mood === mood 
                            ? `border-current ${color} ${bg}` 
                            : 'border-border hover:border-muted-foreground/50'
                          }
                        `}
                      >
                        <Icon className={`w-5 h-5 ${newEntry.mood === mood ? color : 'text-muted-foreground'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add tag..."
                      value={newEntry.tagInput}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, tagInput: e.target.value }))}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(newEntry.tagInput);
                        }
                      }}
                      className="flex-1 text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => addTag(newEntry.tagInput)}
                      disabled={!newEntry.tagInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {newEntry.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs cursor-pointer hover:bg-destructive/20"
                        onClick={() => removeTag(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button
                  onClick={handleCreateEntry}
                  disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                  className="w-full bg-primary hover:bg-primary-glow"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </Button>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your entries..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Entries List */}
            <div className="space-y-4">
              {filteredEntries.length === 0 ? (
                <Card className="wellness-card text-center py-12">
                  <CardContent>
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No entries found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm ? 'Try adjusting your search terms.' : 'Start writing your first diary entry!'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredEntries.map((entry, index) => {
                  const mood = entry.mood ? moodIcons[entry.mood] : null;
                  const MoodIcon = mood?.icon;

                  return (
                    <Card 
                      key={entry.id}
                      className="wellness-card cursor-pointer hover:border-primary/30 transition-all"
                      style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg line-clamp-1 group-hover:text-primary">
                              {entry.title}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <span>{format(entry.date, 'MMM dd, yyyy')}</span>
                              {mood && MoodIcon && (
                                <div className={`p-1 rounded ${mood.bg}`}>
                                  <MoodIcon className={`w-3 h-3 ${mood.color}`} />
                                </div>
                              )}
                            </CardDescription>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEntry(entry);
                                setIsEditing(true);
                              }}
                              className="opacity-0 group-hover:opacity-100 w-8 h-8 p-0"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEntry(entry.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 w-8 h-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground line-clamp-3 leading-relaxed mb-3">
                          {entry.content}
                        </p>
                        {entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {entry.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {entry.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{entry.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Entry Viewer/Editor Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="wellness-card w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={selectedEntry.title}
                      onChange={(e) => setSelectedEntry(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="text-xl font-bold border-none p-0 focus:ring-0"
                    />
                  ) : (
                    <CardTitle className="text-xl">{selectedEntry.title}</CardTitle>
                  )}
                  <CardDescription>
                    {format(selectedEntry.date, 'MMMM dd, yyyy • h:mm a')}
                    {selectedEntry.lastModified && (
                      <span className="text-xs ml-2">
                        (Last modified: {format(selectedEntry.lastModified, 'h:mm a')})
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveEntry} size="sm" className="bg-primary hover:bg-primary-glow">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      size="sm"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedEntry(null)}
                    size="sm"
                    className="w-8 h-8 p-0"
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="overflow-y-auto">
                {isEditing ? (
                  <Textarea
                    value={selectedEntry.content}
                    onChange={(e) => setSelectedEntry(prev => prev ? { ...prev, content: e.target.value } : null)}
                    className="min-h-[300px] border-none p-0 focus:ring-0 resize-none"
                  />
                ) : (
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed text-foreground">
                      {selectedEntry.content}
                    </p>
                  </div>
                )}
                
                {selectedEntry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/50">
                    {selectedEntry.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}