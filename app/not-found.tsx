import Link from "next/link";
import { Hero } from "@/components/ui";

export default function NotFound() {
  return (
    <Hero title="Page not found." sub="The page you were looking for is not here.">
      <Link className="btn btn-primary" href="/">Go to the home page</Link>
    </Hero>
  );
}
