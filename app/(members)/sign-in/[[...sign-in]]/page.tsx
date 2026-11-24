import { SignIn } from "@clerk/nextjs";

export const metadata = { title: "Member sign in" };

export default function SignInPage() {
  return (
    <section className="section">
      <div className="wrap auth-wrap">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </section>
  );
}
