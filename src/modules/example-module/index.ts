/**
 * Public API for example-module.
 *
 * HARNESS RULE: Other modules must import from this file only.
 *
 * CUSTOMIZE: Rename this module and update exports for your domain.
 */

export type { Item, CreateItemInput } from "./types/item";
export { validateItemName, buildItemInsert } from "./services/item-service";
