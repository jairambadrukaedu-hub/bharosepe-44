import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export interface DisputeChatMessage {
  id: string;
  dispute_id: string;
  sender_id: string;
  message: string;
  message_type: 'text' | 'file' | 'image';
  file_url?: string;
  file_name?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  sender_profile?: {
    full_name: string;
    avatar_url?: string;
  };
}

export const useDisputeChat = (disputeId: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<DisputeChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const fetchMessages = async () => {
    if (!disputeId || !user) return;

    try {
      // First get the messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('dispute_messages')
        .select('*')
        .eq('dispute_id', disputeId)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      // Then get the profiles for all unique sender IDs
      const senderIds = [...new Set(messagesData?.map(m => m.sender_id) || [])];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', senderIds);

      if (profilesError) throw profilesError;

      // Create a map of profiles by user_id
      const profilesMap = (profilesData || []).reduce((acc: any, profile) => {
        acc[profile.user_id] = profile;
        return acc;
      }, {});

      // Transform data to match our interface
      const transformedData = (messagesData || []).map((item: any) => ({
        ...item,
        message_type: item.message_type as 'text' | 'file' | 'image',
        sender_profile: profilesMap[item.sender_id] ? {
          full_name: profilesMap[item.sender_id].full_name,
          avatar_url: profilesMap[item.sender_id].avatar_url
        } : undefined
      }));

      setMessages(transformedData);
    } catch (error) {
      console.error('Error fetching dispute messages:', error);
      toast.error('Failed to load chat messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!user || !disputeId || !message.trim()) return false;

    setSending(true);
    try {
      const { error } = await supabase
        .from('dispute_messages')
        .insert({
          dispute_id: disputeId,
          sender_id: user.id,
          message: message.trim(),
          message_type: 'text'
        });

      if (error) throw error;

      toast.success('Message sent');
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      return false;
    } finally {
      setSending(false);
    }
  };

  const sendFileMessage = async (file: File, messageText: string = '') => {
    if (!user || !disputeId || !file) return false;

    setSending(true);
    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${disputeId}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('dispute-chat')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('dispute-chat')
        .getPublicUrl(fileName);

      // Determine message type
      const messageType = file.type.startsWith('image/') ? 'image' : 'file';

      // Send message with file
      const { error } = await supabase
        .from('dispute_messages')
        .insert({
          dispute_id: disputeId,
          sender_id: user.id,
          message: messageText || `Shared a ${messageType}`,
          message_type: messageType,
          file_url: publicUrl,
          file_name: file.name
        });

      if (error) throw error;

      toast.success('File sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending file:', error);
      toast.error('Failed to send file');
      return false;
    } finally {
      setSending(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    if (!disputeId || !user) return;

    const channel = supabase
      .channel('dispute-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'dispute_messages',
          filter: `dispute_id=eq.${disputeId}`
        },
        (payload) => {
          // Fetch the full message with profile data
          supabase
            .from('dispute_messages')
            .select('*')
            .eq('id', payload.new.id)
            .single()
            .then(async ({ data: messageData }) => {
              if (messageData) {
                // Get the sender profile
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('user_id, full_name, avatar_url')
                  .eq('user_id', messageData.sender_id)
                  .single();

                const transformedMessage = {
                  ...messageData,
                  message_type: messageData.message_type as 'text' | 'file' | 'image',
                  sender_profile: profile ? {
                    full_name: profile.full_name,
                    avatar_url: profile.avatar_url
                  } : undefined
                };
                setMessages(prev => [...prev, transformedMessage]);
              }
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [disputeId, user]);

  useEffect(() => {
    fetchMessages();
  }, [disputeId, user]);

  return {
    messages,
    loading,
    sending,
    sendMessage,
    sendFileMessage,
    fetchMessages
  };
};