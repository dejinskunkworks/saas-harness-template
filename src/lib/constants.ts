/**
 * Application-wide constants.
 *
 * HARNESS RULE: No magic strings. Define constants here or in module-specific types.
 */

/** Supported jurisdictions */
export const JURISDICTIONS = {
  KE: "KE",
  GB: "GB",
} as const;

export type Jurisdiction = (typeof JURISDICTIONS)[keyof typeof JURISDICTIONS];

/** User roles */
export const ROLES = {
  SYSTEM_ADMIN: "system_admin",
  PRACTICE_ADMIN: "practice_admin",
  COMPANY_SECRETARY: "company_secretary",
  DIRECTOR: "director",
  FOUNDER_OWNER: "founder_owner",
  EXTERNAL_ADVISOR: "external_advisor",
  AGENT_DEVELOPER: "agent_developer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Agent action tiers */
export const ACTION_TIERS = {
  READ: "read",
  ANALYZE: "analyze",
  DRAFT: "draft",
  PREPARE: "prepare",
  APPROVE: "approve",
  SUBMIT: "submit",
  DELETE: "delete",
} as const;

export type ActionTier = (typeof ACTION_TIERS)[keyof typeof ACTION_TIERS];

/** Entity types */
export const ENTITY_TYPES = {
  PRIVATE_LIMITED: "private_limited",
  PUBLIC_LIMITED: "public_limited",
  STATE_CORPORATION: "state_corporation",
  NONPROFIT: "nonprofit",
} as const;

export type EntityType = (typeof ENTITY_TYPES)[keyof typeof ENTITY_TYPES];
