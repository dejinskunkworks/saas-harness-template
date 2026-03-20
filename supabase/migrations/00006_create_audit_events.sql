-- M1: Audit Events — immutable, append-only business event log
CREATE TABLE public.audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id),
  entity_id uuid,
  actor_type text NOT NULL CHECK (actor_type IN ('user', 'agent', 'system')),
  actor_id uuid NOT NULL,
  effective_actor_id uuid,
  agent_session_id uuid,
  action_type text NOT NULL,
  action_tier text NOT NULL CHECK (action_tier IN (
    'read', 'analyze', 'draft', 'prepare', 'approve', 'submit', 'delete'
  )),
  target_type text NOT NULL,
  target_id text NOT NULL,
  request_id text,
  trace_id text,
  outcome text NOT NULL CHECK (outcome IN ('success', 'failure', 'denied')),
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view audit events in their tenant"
  ON public.audit_events FOR SELECT
  USING (
    tenant_id IN (
      SELECT m.tenant_id FROM public.memberships m
      WHERE m.user_id = auth.uid()
      AND m.status = 'active'
    )
  );

CREATE POLICY "Authenticated users can insert audit events"
  ON public.audit_events FOR INSERT
  WITH CHECK (true);

CREATE INDEX idx_audit_events_tenant_id ON public.audit_events (tenant_id);
CREATE INDEX idx_audit_events_entity_id ON public.audit_events (entity_id);
CREATE INDEX idx_audit_events_actor_id ON public.audit_events (actor_id);
CREATE INDEX idx_audit_events_target ON public.audit_events (target_type, target_id);
CREATE INDEX idx_audit_events_created_at ON public.audit_events (created_at DESC);
