/**
 * Application-wide constants.
 *
 * HARNESS RULE: No magic strings. Define constants here or in module-specific types.
 *
 * CUSTOMIZE: This is the first file to edit for your project.
 * Replace REGIONS, ROLES, and add your own domain constants.
 */

/** Supported regions — replace with your jurisdictions/locales */
export const REGIONS = {
  DEFAULT: "DEFAULT",
} as const;

export type Region = (typeof REGIONS)[keyof typeof REGIONS];

/** User roles — customize for your domain */
export const ROLES = {
  SYSTEM_ADMIN: "system_admin",
  ORG_ADMIN: "org_admin",
  MEMBER: "member",
  VIEWER: "viewer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Agent action tiers — universal for audit trail */
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
