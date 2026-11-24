import { ServicePage } from "@/components/ServicePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "AI Training | Elivique",
  description: "Workshops, prompt packs built for your role, and coaching on the tasks you do every week.",
  path: "/ai",
});

export default function Page() {
  return (
    <ServicePage
      eyebrow="AI training"
      title="Use AI properly, on your actual work."
      opening="Workshops, prompt packs built for your role, and coaching on the tasks you do every week."
      path="/ai"
      page="AI training"
      schemaName="AI training"
      groups={[
        { heading: "Workshop", ids: ["B-AI-01"] },
        { heading: "Prompt packs", ids: ["B-AI-02"] },
        { heading: "Coaching", ids: ["B-AI-03"] },
      ]}
    />
  );
}
