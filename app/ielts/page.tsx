import { ServicePage } from "@/components/ServicePage";
import { pageMeta } from "@/lib/seo";
import { priceOf } from "@/lib/packages";

export const metadata = pageMeta({
  title: "IELTS Band 7+ Coaching — Solo & Group Cohorts | Elivique",
  description: `Four weeks, eight sessions, written feedback on every task. Solo from ${priceOf("G-IELTS-01")}, group cohorts ${priceOf("G-IELTS-02")} per person.`,
  path: "/ielts",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="IELTS"
      title="Band 7, in four weeks of real work."
      opening="Eight sessions, feedback on everything you write, and a roadmap built from the band you are actually at today."
      path="/ielts"
      page="IELTS"
      schemaName="IELTS Band 7+ coaching"
      groups={[{ heading: "Solo / cohort / writing intensive", ids: ["G-IELTS-01", "G-IELTS-02", "G-IELTS-03"] }]}
    />
  );
}
