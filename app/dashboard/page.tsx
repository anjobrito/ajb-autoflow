import { AppShell } from "@/components/app-shell";
import { BusinessAwarePageHeader } from "@/components/business-aware-page-header";
import { DashboardClient } from "@/components/dashboard-client";

export default function DashboardPage() {
  return (
    <AppShell>
      <BusinessAwarePageHeader context="dashboard" />
      <DashboardClient />
    </AppShell>
  );
}
