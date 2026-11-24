import { whatsappHref, waMessage } from "@/lib/whatsapp";

/** Form error messages. Functional UI text, not marketing copy. */
export function FormError({ code, topic }: { code?: string; topic: string }) {
  if (!code) return null;
  const msg =
    code === "invalid"
      ? "Please add your name, a phone number or email address, and tick the consent box."
      : code === "rate"
        ? "Too many submissions from this connection. Please wait a few minutes, or message us on WhatsApp."
        : "Your message could not be sent just now. Please message us on WhatsApp instead — nothing you typed has been stored.";
  return (
    <p className="notice error" role="alert">
      {msg}{" "}
      {code !== "invalid" && (
        <a href={whatsappHref(waMessage(topic))} target="_blank" rel="noopener">Open WhatsApp</a>
      )}
    </p>
  );
}
