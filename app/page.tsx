import content from "@/data/content.json";
import { Card } from "@/components/Card";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Skills } from "@/components/Skills";
import type { Content } from "@/data/content";

export default function Home() {
  const { profile, navigation, about, projects, experience, contact, footer } = content as Content;
  const featuredProjects = projects.items.filter((project) => project.featured);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fffafc] text-gray-900">
      <Navbar profile={profile} navigation={navigation} />

      <main>
        <Hero profile={profile} />

        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_13.5rem] lg:gap-16">
          <div className="min-w-0">
            <Section id="about" className="border-t border-gray-200/80 px-0 pt-16">
              <Reveal>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-gray-950">{about.heading}</h2>
              </Reveal>

              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={`${index}-${paragraph}`} delay={index * 0.06}>
                  <p className="mt-5 max-w-3xl text-[1.05rem] leading-8 text-gray-600">{paragraph}</p>
                </Reveal>
              ))}

              {about.summaryPoints.length > 0 && (
                <ul className="mt-5 list-inside list-disc space-y-1 text-sm text-gray-700">
                  {about.summaryPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </Section>

            <Reveal>
              <Projects heading={projects.heading} items={featuredProjects} className="px-0" />
            </Reveal>

            <Section id="experience" className="px-0">
              <Reveal>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-gray-950">{experience.heading}</h2>
              </Reveal>

              <div className="mt-7 space-y-4 border-l border-brand-200 pl-5 sm:pl-7">
                {experience.items.map((item, index) => (
                  <Reveal
                    key={`${item.role}-${item.company ?? "independent"}-${item.period}`}
                    delay={Math.min(index * 0.05, 0.2)}
                    className="relative"
                  >
                    <span className="absolute top-7 -left-[1.72rem] size-3 rounded-full border-2 border-brand-600 bg-[#fffafc] sm:-left-[2.22rem]" />
                    <Card className="border-gray-200 bg-white p-6 shadow-none transition-shadow hover:shadow-lg hover:shadow-brand-900/5">
                      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                        <h3 className="text-lg font-bold tracking-tight text-gray-950">
                          {item.role}
                          {item.company && ` at ${item.company}`}
                        </h3>

                        <p className="text-sm font-medium text-brand-700">{item.period}</p>
                      </div>

                      <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm leading-6 text-gray-600">
                        {item.highlights.map((highlight, index) => (
                          <li key={`${index}-${highlight}`}>{highlight}</li>
                        ))}
                      </ul>
                    </Card>
                  </Reveal>
                ))}
              </div>
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
          <aside
            aria-label="Skills"
            className="order-first border-t border-gray-200/80 py-12 lg:order-none lg:sticky lg:top-[4.5rem] lg:h-fit lg:border-t-0 lg:pt-[4.1rem]"
          >
            <h2 className="mt-3 text-2xl font-black tracking-tight text-gray-950">Skills</h2>
            <Skills skills={about.skills} />
          </aside>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {footer.text}
      </footer>
    </div>
  );
}
