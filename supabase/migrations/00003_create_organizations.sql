-- M1: Organizations — operational units within a tenant
CREATE TABLE public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL DEFAULT 'client_workspace'
    CHECK (type IN ('client_workspace', 'internal_team', 'practice_unit')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_organizations_tenant_id ON public.organizations (tenant_id);

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view orgs in their tenant"
  ON public.organizations FOR SELECT
  USING (
    tenant_id IN (
      SELECT m.tenant_id FROM public.memberships m
      WHERE m.user_id = auth.uid()
      AND m.status = 'active'
    )
  );

CREATE TRIGGER organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
