import { ServicePage } from "@/components/ServicePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Business Plans, Audits & Annual Reports | Elivique",
  description: "Investor-ready business plans, three-year financial models, business audits and annual reports for Nigerian SMEs and NGOs.",
  path: "/business",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="Business"
      title="The paperwork that decides whether you are taken seriously."
      opening="Business plans, three-year financial models, audits and annual reports — written to be read by a bank, an investor or a board."
      path="/business"
      page="Business"
      schemaName="Business documentation"
      groups={[
        { heading: "Audit", ids: ["B-BIZ-02"] },
        { heading: "Launch", ids: ["B-BIZ-01"] },
        { heading: "Annual Report", ids: ["B-RPT-01", "B-RPT-02"] },
        { heading: "Pulse Check", ids: ["B-RPT-03", "B-RPT-04"] },
      ]}
    />
  );
}
