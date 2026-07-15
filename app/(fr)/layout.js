import "../globals.css";
import { ClientEffects } from "../../components/client-effects";
import { buildRootMetadata } from "../../lib/seo";

export const metadata = buildRootMetadata("fr");

export default function FrenchRootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>
        <ClientEffects />
        {children}
      </body>
    </html>
  );
}
