/**
 * Demo tenant seed data.
 *
 * Creates a realistic Kenyan CS practice with:
 * - 1 tenant (Wanjiku & Associates CS)
 * - 2 entities (Acme Kenya Ltd, Sunrise Holdings Ltd)
 * - Directors, shareholders, beneficial owners
 * - Sample obligations and deadlines
 *
 * This will be implemented in M1 when Supabase is connected.
 */

export const DEMO_TENANT = {
  name: "Wanjiku & Associates Company Secretaries",
  jurisdiction: "KE" as const,
  entities: [
    {
      legalName: "Acme Kenya Limited",
      registrationNumber: "PVT-2024-001234",
      entityType: "private_limited" as const,
      jurisdiction: "KE" as const,
      incorporationDate: "2020-06-15",
    },
    {
      legalName: "Sunrise Holdings Limited",
      registrationNumber: "PVT-2022-005678",
      entityType: "private_limited" as const,
      jurisdiction: "KE" as const,
      incorporationDate: "2022-01-10",
    },
  ],
} as const;
