import content from "./data/content.json";
import { Card } from "./components/Card";
import { Section } from "./components/Section";

export default function App() {
  const { profile, navigation, about, projects, experience, education, contact, footer } = content;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-transparent">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="inline-flex items-center gap-2 whitespace-nowrap font-semibold tracking-tight">
            <img src="/JHGradientMaroon.svg" alt="JH" className="h-6 w-6 shrink-0" />
            <span className="leading-none">{profile.name}</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-600 hover:text-gray-900">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <Section id="home" className="pt-14 pb-16 grid gap-10 md:grid-cols-2 md:items-center">
        {/* Left side: text */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">{profile.hero.tagline}</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{profile.hero.title}</h1>
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
          <img
            src={profile.photo.src}
            alt={profile.photo.alt}
            className="h-48 w-48 rounded-full border-4 border-brand-200 shadow-lg object-cover"
          />
        </div>
      </Section>

      {/* About */}
      <Section id="about">
        <h2 className="text-3xl font-extrabold">{about.heading}</h2>
        {about.paragraphs.map((paragraph, index) => (
          <p key={index} className="mt-4 leading-relaxed text-gray-700">
            {paragraph}
          </p>
        ))}
        <ul className="mt-4 list-disc list-inside space-y-1 text-sm text-gray-700">
          {about.summaryPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          {about.skills.map((skill) => (
            <span key={skill} className="rounded-full border px-3 py-1">
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <h2 className="text-3xl font-extrabold">{projects.heading}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {projects.items.map((project, index) => {
            const isTubester = index === 0 || project.name?.toLowerCase() === "tubester";
            const href = isTubester ? "https://tubester.app" : undefined;

            const cardInner = (
              <Card
                className={[
                  "transition",
                  isTubester
                    ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg ring-2 ring-brand-200 hover:ring-brand-400"
                    : "hover:shadow",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className={["text-lg font-semibold", isTubester ? "underline underline-offset-4" : ""].join(" ")}>
                    {project.name}
                  </h3>

                  {isTubester && (
                    <span className="shrink-0 rounded-full bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700 border border-brand-200">
                      Visit
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-gray-600">{project.description}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                {isTubester && (
                  <p className="mt-4 text-xs text-brand-700">
                    tubester.com <span aria-hidden="true">↗</span>
                  </p>
                )}
              </Card>
            );

            return href ? (
              <a
                key={project.name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300"
              >
                {cardInner}
              </a>
            ) : (
              <div key={project.name}>{cardInner}</div>
            );
          })}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience">
        <h2 className="text-3xl font-extrabold">{experience.heading}</h2>
        <div className="mt-4 space-y-4">
          {experience.items.map((item) => (
            <Card key={`${item.role}-${item.company}`}>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <h3 className="text-lg font-semibold">
                  {item.role} at {item.company}
                </h3>
                <p className="text-sm text-gray-500">{item.period}</p>
              </div>
              <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-gray-700">
                {item.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education">
        <h2 className="text-3xl font-extrabold">{education.heading}</h2>
        <div className="mt-4 space-y-4">
          {education.items.map((item) => (
            <Card key={item.school}>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <h3 className="text-lg font-semibold">{item.school}</h3>
                <p className="text-sm text-gray-500">{item.period}</p>
              </div>
              <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-gray-700">
                {item.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact">
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

      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {footer.text}
      </footer>
    </div>
  );
}
