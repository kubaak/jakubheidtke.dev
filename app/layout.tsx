import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const siteUrl = "https://jakubheidtke.com";

const title = "Jakub Heidtke Full-stack Engineer";

const description = "Jakub Heidtke, a senior full-stack engineer specializing in .NET, Node.js, and React.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  icons: {
    icon: "/JHGradientMaroon.svg",
  },

  title: {
    default: title,
    template: "%s | Jakub Heidtke",
  },

  description,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "jakubheidtke.com",
    title,
    description,
    images: [
      {
        url: "/profile.jpg",
        alt: "Jakub Heidtke",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/profile.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="theme-preference"
          dangerouslySetInnerHTML={{
            __html: `(() => {
        const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

        let savedTheme = null;

        try {
          savedTheme = localStorage.getItem("theme");
        } catch {}

        const theme =
          savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : colorScheme.matches
              ? "dark"
              : "light";

        const root = document.documentElement;

        root.classList.toggle("dark", theme === "dark");
        root.style.colorScheme = theme;
        root.style.backgroundColor =
          theme === "dark" ? "#120d10" : "#fffafc";
      })();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
