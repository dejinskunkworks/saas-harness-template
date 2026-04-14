/**
 * Supabase database type definitions.
 *
 * HARNESS RULE: This file is the single source of truth for DB types.
 * Regenerate from Supabase CLI: `pnpm supabase gen types typescript`
 * Until Supabase is connected, we define types manually here.
 */

export type Database = {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          status: "active" | "suspended" | "archived";
          billing_plan: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["tenants"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["tenants"]["Insert"]>;
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          auth_provider_id: string;
          email: string;
          display_name: string;
          status: "active" | "suspended" | "deactivated";
          locale: string;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["users"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
        Relationships: [];
      };
      organizations: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          type: "client_workspace" | "internal_team" | "practice_unit";
          status: "active" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["organizations"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["organizations"]["Insert"]
        >;
        Relationships: [];
      };
      memberships: {
        Row: {
          id: string;
          user_id: string;
          tenant_id: string;
          organization_id: string | null;
          role: "system_admin" | "org_admin" | "member" | "viewer";
          status: "active" | "suspended" | "expired";
          starts_at: string;
          ends_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["memberships"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["memberships"]["Insert"]>;
        Relationships: [];
      };
      entity_access: {
        Row: {
          id: string;
          entity_id: string;
          user_id: string;
          access_role: string;
          granted_by: string;
          starts_at: string;
          ends_at: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["entity_access"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["entity_access"]["Insert"]
        >;
        Relationships: [];
      };
      audit_events: {
        Row: {
          id: string;
          tenant_id: string;
          entity_id: string | null;
          actor_type: "user" | "agent" | "system";
          actor_id: string;
          effective_actor_id: string | null;
          agent_session_id: string | null;
          action_type: string;
          action_tier: string;
          target_type: string;
          target_id: string;
          request_id: string | null;
          trace_id: string | null;
          outcome: "success" | "failure" | "denied";
          metadata: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["audit_events"]["Row"],
          "id" | "created_at"
        >;
        Update: Record<string, unknown>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
