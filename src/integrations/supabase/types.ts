export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      contracts: {
        Row: {
          contract_content: string
          counterparty_role: string | null
          created_at: string
          created_by: string
          id: string
          initiator_role: string | null
          is_active: boolean | null
          parent_contract_id: string | null
          recipient_id: string | null
          responded_at: string | null
          response_message: string | null
          revision_number: number | null
          status: string
          terms: string | null
          transaction_id: string
          updated_at: string
        }
        Insert: {
          contract_content: string
          counterparty_role?: string | null
          created_at?: string
          created_by: string
          id?: string
          initiator_role?: string | null
          is_active?: boolean | null
          parent_contract_id?: string | null
          recipient_id?: string | null
          responded_at?: string | null
          response_message?: string | null
          revision_number?: number | null
          status?: string
          terms?: string | null
          transaction_id: string
          updated_at?: string
        }
        Update: {
          contract_content?: string
          counterparty_role?: string | null
          created_at?: string
          created_by?: string
          id?: string
          initiator_role?: string | null
          is_active?: boolean | null
          parent_contract_id?: string | null
          recipient_id?: string | null
          responded_at?: string | null
          response_message?: string | null
          revision_number?: number | null
          status?: string
          terms?: string | null
          transaction_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_created_by_profiles_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "contracts_recipient_id_profiles_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "contracts_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_parent_contract"
            columns: ["parent_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      dispute_messages: {
        Row: {
          created_at: string
          dispute_id: string
          file_name: string | null
          file_url: string | null
          id: string
          message: string
          message_type: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dispute_id: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          message: string
          message_type?: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dispute_id?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          message?: string
          message_type?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      dispute_proposals: {
        Row: {
          amount: number | null
          created_at: string
          description: string | null
          dispute_id: string
          id: string
          proposal_type: string
          proposed_by: string
          responded_at: string | null
          responded_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          description?: string | null
          dispute_id: string
          id?: string
          proposal_type: string
          proposed_by: string
          responded_at?: string | null
          responded_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          description?: string | null
          dispute_id?: string
          id?: string
          proposal_type?: string
          proposed_by?: string
          responded_at?: string | null
          responded_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      disputes: {
        Row: {
          contract_id: string | null
          created_at: string
          description: string
          dispute_reason: string
          disputing_party_id: string
          evidence_files: Json | null
          id: string
          resolution_notes: string | null
          resolved_at: string | null
          status: string
          transaction_id: string
          updated_at: string
        }
        Insert: {
          contract_id?: string | null
          created_at?: string
          description: string
          dispute_reason: string
          disputing_party_id: string
          evidence_files?: Json | null
          id?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: string
          transaction_id: string
          updated_at?: string
        }
        Update: {
          contract_id?: string | null
          created_at?: string
          description?: string
          dispute_reason?: string
          disputing_party_id?: string
          evidence_files?: Json | null
          id?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: string
          transaction_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "disputes_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      escalations: {
        Row: {
          assigned_to: string | null
          created_at: string
          dispute_data: Json
          escalated_by: string
          escalation_notes: string | null
          escalation_reason: string
          evidence_files: Json | null
          id: string
          resolution_notes: string | null
          resolved_at: string | null
          status: string
          transaction_id: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          dispute_data: Json
          escalated_by: string
          escalation_notes?: string | null
          escalation_reason: string
          evidence_files?: Json | null
          id?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: string
          transaction_id: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          dispute_data?: Json
          escalated_by?: string
          escalation_notes?: string | null
          escalation_reason?: string
          evidence_files?: Json | null
          id?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: string
          transaction_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          contract_id: string | null
          created_at: string
          id: string
          message: string
          read: boolean | null
          sender_id: string | null
          title: string
          transaction_id: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          contract_id?: string | null
          created_at?: string
          id?: string
          message: string
          read?: boolean | null
          sender_id?: string | null
          title: string
          transaction_id?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          contract_id?: string | null
          created_at?: string
          id?: string
          message?: string
          read?: boolean | null
          sender_id?: string | null
          title?: string
          transaction_id?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_sender_id_profiles_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notifications_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_profiles_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          buyer_id: string
          buyer_phone: string | null
          created_at: string
          delivery_date: string | null
          description: string | null
          dispute_details: string | null
          dispute_reason: string | null
          has_evidence: boolean | null
          id: string
          payment_released_at: string | null
          resolution_breakdown: Json | null
          seller_id: string
          seller_phone: string | null
          status: string
          title: string
          updated_at: string
          work_marked_done_at: string | null
        }
        Insert: {
          amount: number
          buyer_id: string
          buyer_phone?: string | null
          created_at?: string
          delivery_date?: string | null
          description?: string | null
          dispute_details?: string | null
          dispute_reason?: string | null
          has_evidence?: boolean | null
          id?: string
          payment_released_at?: string | null
          resolution_breakdown?: Json | null
          seller_id: string
          seller_phone?: string | null
          status?: string
          title: string
          updated_at?: string
          work_marked_done_at?: string | null
        }
        Update: {
          amount?: number
          buyer_id?: string
          buyer_phone?: string | null
          created_at?: string
          delivery_date?: string | null
          description?: string | null
          dispute_details?: string | null
          dispute_reason?: string | null
          has_evidence?: boolean | null
          id?: string
          payment_released_at?: string | null
          resolution_breakdown?: Json | null
          seller_id?: string
          seller_phone?: string | null
          status?: string
          title?: string
          updated_at?: string
          work_marked_done_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_buyer_id_profiles_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transactions_seller_id_profiles_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_user_role_in_contract: {
        Args: { contract_id_param: string; user_id_param: string }
        Returns: string
      }
      has_role: {
        Args:
          | { _role: Database["public"]["Enums"]["app_role"]; _user_id: string }
          | { _role: string; _user_id: string }
        Returns: boolean
      }
      search_profiles_by_phone: {
        Args: { search_phone: string }
        Returns: {
          full_name: string
          phone: string
          role: string
          user_id: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "support" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "support", "user"],
    },
  },
} as const
