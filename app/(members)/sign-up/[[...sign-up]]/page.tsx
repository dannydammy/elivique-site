import { SignUp } from "@clerk/nextjs";

export const metadata = { title: "Create a member account" };

export default function SignUpPage() {
  return (
    <section className="section">
      <div className="wrap auth-wrap">
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </section>
  );
}
