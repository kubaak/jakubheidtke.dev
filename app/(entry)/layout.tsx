import SiteDocument from "@/components/SiteDocument";
import "../globals.css";
export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
