import content from "@/data/content.json";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { Content } from "@/data/content";

export default function Home() {
  const { profile, navigation, contact, footer } = content as Content;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fffafc] text-gray-900">
      <Navbar profile={profile} navigation={navigation} />

      <main>
        <Hero profile={profile} />

        <div className="mx-auto max-w-6xl px-4">
          <Section className="px-0">
            <Reveal>
              <Link
                href="/projects"
                className="group block rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-100 via-[#fff7fa] to-white p-7 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5 sm:p-10"
              >
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-gray-950 sm:text-4xl">
                  Software built to solve real business problems.
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                  Browse selected work across SaaS products, distributed systems, integrations, backend architecture,
                  and full-stack applications.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition group-hover:text-brand-900">
                  View my projects <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          </Section>

          <Section className="px-0">
            <Reveal>
              <Link
                href="/experience"
                className="group block rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-100 via-[#fff7fa] to-white p-7 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5 sm:p-10"
              >
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-gray-950 sm:text-4xl">
                  A decade of turning complex ideas into production-ready software.
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                  Explore my professional timeline, from full-stack product development to building scalable backend
                  platforms and leading technical delivery.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition group-hover:text-brand-900">
                  View my experience <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          </Section>

          <Section id="contact" className="px-0 pb-20">
            <Reveal className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-100 via-[#fff7fa] to-white px-7 py-10 sm:px-10 sm:py-12">
              <div className="absolute -top-24 -right-20 size-64 rounded-full bg-brand-300/55 blur-3xl" />
              <div className="relative">
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-gray-950">{contact.heading}</h2>

                <p className="mt-3 max-w-xl leading-7 text-gray-600">{contact.description}</p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {contact.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-xl border border-brand-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-brand-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:text-brand-900"
                    >
                      {link.label} <span aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </Section>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {footer.text}
      </footer>
    </div>
  );
}
