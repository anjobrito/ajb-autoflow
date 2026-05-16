export { businessTypes } from "@/lib/select-options";
export type BusinessType = (typeof import("@/lib/select-options").businessTypes)[number];
