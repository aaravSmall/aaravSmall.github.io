import type { Metadata, Viewport } from "next";
import "@fontsource/big-shoulders-display/600";
import "@fontsource/big-shoulders-display/800";
import "@fontsource/big-shoulders-display/900";
import "@fontsource-variable/archivo";
import "./globals.css";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaravsmall.github.io"),
  title: `${profile.name}: ${profile.roles.join(", ")}`,
  description: `${profile.name} is an AI engineer, forward deployed engineer and full-stack developer studying at ${profile.school}.`,
  openGraph: {
    title: profile.name,
    description: profile.roles.join(" / "),
    url: "https://aaravsmall.github.io",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E1A3D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
