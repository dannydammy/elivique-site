import { ServicePage } from "@/components/ServicePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "NGO Starter Pack & Workplace Policy Templates | Elivique",
  description: "Formation guidance, theory of change, strategic plans, governance and staff policy templates for NGOs, clinics and schools.",
  path: "/organisations",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="NGO & policy"
      title="Structure funders trust."
      opening="The formation, governance and policy documents an NGO or a clinic is asked for, and usually cannot produce."
      path="/organisations"
      page="NGO & policy"
      schemaName="NGO and workplace policy documentation"
      groups={[
        { heading: "NGO Starter Pack", ids: ["B-NGO-01", "B-NGO-02"] },
        { heading: "Policy Templates", ids: ["B-POL-01", "B-POL-02", "B-POL-03"] },
      ]}
    />
  );
}
