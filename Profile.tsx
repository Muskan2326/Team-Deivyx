import React, { useState } from 'react';
import { User, Settings, Shield, Heart, Camera, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

interface UserProfile {
  userId: string;
  nickname: string;
  avatarColor: string;
  joinedDate: string;
  preferences: {
    emailNotifications: boolean;
    communityUpdates: boolean;
    wellnessReminders: boolean;
    anonymousPosting: boolean;
  };
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    userId: 'MC_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    nickname: 'WellnessSeeker',
    avatarColor: 'from-primary to-secondary',
    joinedDate: 'March 2024',
    preferences: {
      emailNotifications: true,
      communityUpdates: true,
      wellnessReminders: false,
      anonymousPosting: true
    }
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const avatarColors = [
    'from-primary to-secondary',
    'from-secondary to-accent',
    'from-accent to-destructive',
    'from-success to-primary',
    'from-warning to-secondary',
    'from-destructive to-primary'
  ];

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const updatePreference = (key: keyof UserProfile['preferences'], value: boolean) => {
    setEditedProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/30 rounded-full mb-4">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Profile</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Profile & Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="wellness-card animate-fade-in-up">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarFallback className={`bg-gradient-to-br ${isEditing ? editedProfile.avatarColor : profile.avatarColor} text-white text-2xl font-bold`}>
                      {(isEditing ? editedProfile.nickname : profile.nickname).substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-xl font-semibold">
                  {isEditing ? editedProfile.nickname : profile.nickname}
                </CardTitle>
                <CardDescription>
                  Member since {profile.joinedDate}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar Color Selector */}
                {isEditing && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Choose Avatar Style</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {avatarColors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setEditedProfile(prev => ({ ...prev, avatarColor: color }))}
                          className={`
                            w-12 h-12 rounded-full bg-gradient-to-br ${color} border-2 transition-all
                            ${editedProfile.avatarColor === color 
                              ? 'border-foreground scale-110' 
                              : 'border-border hover:scale-105'
                            }
                          `}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">Posts Shared</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary">89</div>
                    <div className="text-xs text-muted-foreground">Hearts Received</div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm" className="flex-1 bg-primary hover:bg-primary-glow">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => setIsEditing(true)} 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-primary/30 text-primary hover:bg-primary/10"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Account Information
                </CardTitle>
                <CardDescription>
                  Your account details and display preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userId" className="text-sm font-medium">User ID</Label>
                    <Input
                      id="userId"
                      value={profile.userId}
                      disabled
                      className="bg-muted/50 text-muted-foreground"
                    />
                    <p className="text-xs text-muted-foreground">Your unique identifier (cannot be changed)</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nickname" className="text-sm font-medium">Nickname</Label>
                    <Input
                      id="nickname"
                      value={isEditing ? editedProfile.nickname : profile.nickname}
                      onChange={(e) => isEditing && setEditedProfile(prev => ({ ...prev, nickname: e.target.value }))}
                      disabled={!isEditing}
                      className={isEditing ? "border-primary/50 focus:border-primary" : "bg-muted/50"}
                    />
                    <p className="text-xs text-muted-foreground">How others see you in the community</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Notifications */}
            <Card className="wellness-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  Privacy & Notifications
                </CardTitle>
                <CardDescription>
                  Control how you interact with the community and receive updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Anonymous Posting</Label>
                      <p className="text-xs text-muted-foreground">
                        Post anonymously in the community for extra privacy
                      </p>
                    </div>
                    <Switch
                      checked={isEditing ? editedProfile.preferences.anonymousPosting : profile.preferences.anonymousPosting}
                      onCheckedChange={(checked) => isEditing && updatePreference('anonymousPosting', checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Wellness Reminders</Label>
                      <p className="text-xs text-muted-foreground">
                        Gentle reminders for self-care and wellness activities
                      </p>
                    </div>
                    <Switch
                      checked={isEditing ? editedProfile.preferences.wellnessReminders : profile.preferences.wellnessReminders}
                      onCheckedChange={(checked) => isEditing && updatePreference('wellnessReminders', checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Community Updates</Label>
                      <p className="text-xs text-muted-foreground">
                        Updates about new features and community events
                      </p>
                    </div>
                    <Switch
                      checked={isEditing ? editedProfile.preferences.communityUpdates : profile.preferences.communityUpdates}
                      onCheckedChange={(checked) => isEditing && updatePreference('communityUpdates', checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">
                        Important account and safety notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={isEditing ? editedProfile.preferences.emailNotifications : profile.preferences.emailNotifications}
                      onCheckedChange={(checked) => isEditing && updatePreference('emailNotifications', checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="wellness-card bg-gradient-to-br from-accent/5 to-destructive/5 border-accent/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-destructive rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Need Support?</h3>
                    <p className="text-sm text-muted-foreground">We're here to help you on your wellness journey</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-accent/30 text-accent hover:bg-accent/10">
                  Contact Support Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}