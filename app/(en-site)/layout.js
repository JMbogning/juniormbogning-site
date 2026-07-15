import "../globals.css";
import { ClientEffects } from "../../components/client-effects";
import { buildRootMetadata } from "../../lib/seo";

export const metadata = buildRootMetadata("en");

export default function EnglishRootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientEffects />
        {children}
      </body>
    </html>
  );
}
