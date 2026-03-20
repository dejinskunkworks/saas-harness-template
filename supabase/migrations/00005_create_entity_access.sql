-- M1: Entity Access — entity-scoped permissions
CREATE TABLE public.entity_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  access_role text NOT NULL DEFAULT 'viewer',
  granted_by uuid NOT NULL REFERENCES public.users(id),
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_entity_access_entity_id ON public.entity_access (entity_id);
CREATE INDEX idx_entity_access_user_id ON public.entity_access (user_id);

ALTER TABLE public.entity_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entity access"
  ON public.entity_access FOR SELECT
  USING (user_id = auth.uid());
