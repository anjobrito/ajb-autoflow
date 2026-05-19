import { AppShell } from "@/components/app-shell";
import { BusinessAwarePageHeader } from "@/components/business-aware-page-header";
import { WorkOrdersClient } from "@/components/work-orders-client";

export default function OrdensServicoPage() {
  return (
    <AppShell>
      <BusinessAwarePageHeader context="operations" />
      <WorkOrdersClient />
    </AppShell>
  );
}
