import type { Metadata } from "next";
import Script from "next/script";
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
        <Script id="theme-preference" strategy="beforeInteractive">
          {`(() => {
            const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
            const applyTheme = (theme) => {
              document.documentElement.classList.toggle("dark", theme === "dark");
              document.documentElement.style.colorScheme = theme;
              document.documentElement.style.backgroundColor = theme === "dark" ? "#120d10" : "#fffafc";
              window.dispatchEvent(new Event("themechange"));
            };
            const savedTheme = localStorage.getItem("theme");
            applyTheme(savedTheme === "light" || savedTheme === "dark"
              ? savedTheme
              : colorScheme.matches ? "dark" : "light");
            colorScheme.addEventListener("change", (event) => {
              if (!localStorage.getItem("theme")) {
                applyTheme(event.matches ? "dark" : "light");
              }
            });
          })();`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
