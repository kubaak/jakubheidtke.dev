import type { Metadata } from "next";
import { LocaleEntry } from "@/components/LocaleEntry";
export const metadata: Metadata = { title: "Jakub Heidtke", robots: { index: false, follow: true } };
export default function EntryPage() {
  return <LocaleEntry />;
}
