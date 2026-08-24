import Image from "next/image";
import content from "@/data/content.json";
import { Card } from "@/components/Card";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Section } from "@/components/Section";
import type { Content } from "@/data/content";

export default function Home() {
  const { profile, navigation, about, projects, experience, contact, footer } = content as Content;
  const featuredProjects = projects.items.filter((project) => project.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white text-gray-900">
      <Navbar profile={profile} navigation={navigation} />

      <main>
        {/* Left side: text */}
        <Section id="home" className="grid gap-10 pt-14 pb-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-wider text-brand-600 uppercase">{profile.hero.tagline}</p>

            <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">{profile.hero.title}</h1>

            <p className="mt-4 max-w-prose text-lg text-gray-600">{profile.hero.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.hero.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-600 bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
              >
                {profile.hero.primaryCta.label}
              </a>

              <a
                href={profile.hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-gray-50"
              >
                {profile.hero.secondaryCta.label}
              </a>
            </div>
          </div>

          {/* Right side: profile photo */}
          <div className="flex justify-center md:justify-end">
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={192}
              height={192}
              preload
              className="rounded-full border-4 border-brand-200 object-cover shadow-lg"
            />
          </div>
        </Section>

        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12">
          <div>
            <Section id="about" className="px-0">
              <h2 className="text-3xl font-extrabold">{about.heading}</h2>

              {about.paragraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph}`} className="mt-4 leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}

              {about.summaryPoints.length > 0 && (
                <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-gray-700">
                  {about.summaryPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </Section>

            <Projects heading={projects.heading} items={featuredProjects} className="px-0" />

            <Section id="experience" className="px-0">
              <h2 className="text-3xl font-extrabold">{experience.heading}</h2>

              <div className="mt-4 space-y-4">
                {experience.items.map((item) => (
                  <Card key={`${item.role}-${item.company ?? "independent"}-${item.period}`}>
                    <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                      <h3 className="text-lg font-semibold">
                        {item.role}
                        {item.company && ` at ${item.company}`}
                      </h3>

                      <p className="text-sm text-gray-500">{item.period}</p>
                    </div>

                    <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-700">
                      {item.highlights.map((highlight, index) => (
                        <li key={`${index}-${highlight}`}>{highlight}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </Section>

            <Section id="contact" className="px-0">
              <h2 className="text-3xl font-extrabold">{contact.heading}</h2>

              <p className="mt-2 text-gray-700">{contact.description}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                {contact.links.map((link) => (
                  <a key={link.href} href={link.href} className="rounded-xl border px-4 py-2 hover:bg-gray-50">
                    {link.label}
                  </a>
                ))}
              </div>
            </Section>
          </div>
          <aside aria-label="Skills" className="order-first py-12 lg:order-none lg:pt-[3.25rem]">
            <h2 className="text-sm font-semibold tracking-wider text-brand-600 uppercase">Skills</h2>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm lg:flex-col lg:items-start">
              {about.skills.map((skill) => (
                <li key={skill} className="rounded-full border bg-white/70 px-3 py-1">
                  {skill}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {footer.text}
      </footer>
    </div>
  );
}
