-- M1: Memberships — user role within a tenant/organization
CREATE TABLE public.memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  role text NOT NULL CHECK (role IN (
    'system_admin', 'practice_admin', 'company_secretary',
    'director', 'founder_owner', 'external_advisor', 'agent_developer'
  )),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'expired')),
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_memberships_user_id ON public.memberships (user_id);
CREATE INDEX idx_memberships_tenant_id ON public.memberships (tenant_id);
CREATE INDEX idx_memberships_user_tenant ON public.memberships (user_id, tenant_id);

ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own memberships"
  ON public.memberships FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage memberships"
  ON public.memberships FOR ALL
  USING (
    tenant_id IN (
      SELECT m.tenant_id FROM public.memberships m
      WHERE m.user_id = auth.uid()
      AND m.status = 'active'
      AND m.role IN ('system_admin', 'practice_admin')
    )
  );

CREATE TRIGGER memberships_updated_at
  BEFORE UPDATE ON public.memberships
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
