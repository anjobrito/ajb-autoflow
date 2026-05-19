export { businessProfiles, businessTypes, getBusinessProfileByLabel, isMenuKeyAllowedForBusinessProfile } from "@/lib/business-profiles";
export type { BusinessProfile, BusinessProfileId } from "@/lib/business-profiles";
export type BusinessType = (typeof import("@/lib/business-profiles").businessTypes)[number];
