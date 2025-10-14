import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface DiaryEntry {
  id: string;
  text: string;
  autosave_flag: boolean;
  created_at: string;
  updated_at: string;
}

export function useDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching diary entries:', error);
      toast({
        title: "Error",
        description: "Failed to load diary entries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createEntry = async (text: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('diary_entries')
        .insert([
          {
            text,
            user_id: user.user.id,
            autosave_flag: false
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setCurrentEntry(data);
      fetchEntries();
      
      toast({
        title: "Success",
        description: "Diary entry created"
      });

      return data;
    } catch (error) {
      console.error('Error creating diary entry:', error);
      toast({
        title: "Error",
        description: "Failed to create diary entry",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateEntry = async (id: string, text: string, autosave: boolean = false) => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .update({
          text,
          autosave_flag: autosave
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setCurrentEntry(data);
      fetchEntries();

      if (!autosave) {
        toast({
          title: "Success",
          description: "Diary entry updated"
        });
      }

      return data;
    } catch (error) {
      console.error('Error updating diary entry:', error);
      if (!autosave) {
        toast({
          title: "Error",
          description: "Failed to update diary entry",
          variant: "destructive"
        });
      }
      return null;
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (currentEntry?.id === id) {
        setCurrentEntry(null);
      }
      
      fetchEntries();
      
      toast({
        title: "Success",
        description: "Diary entry deleted"
      });
    } catch (error) {
      console.error('Error deleting diary entry:', error);
      toast({
        title: "Error",
        description: "Failed to delete diary entry",
        variant: "destructive"
      });
    }
  };

  // Auto-save functionality
  const autoSave = useCallback(async (id: string, text: string) => {
    if (id && text.length > 0) {
      await updateEntry(id, text, true);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, []);

  return {
    entries,
    currentEntry,
    loading,
    createEntry,
    updateEntry,
    deleteEntry,
    autoSave,
    setCurrentEntry,
    refetch: fetchEntries
  };
}