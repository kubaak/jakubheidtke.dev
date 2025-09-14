import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-transparent">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">
            Jakub Heidtke
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <a href="#projects" className="text-gray-600 hover:text-gray-900">
              Projects
            </a>
            <a href="#experience" className="text-gray-600 hover:text-gray-900">
              Experience
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-6xl px-4 pt-14 pb-16 grid gap-10 md:grid-cols-2 md:items-center">
        {/* Left side: text */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">Open to new roles</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Full-stack Engineer (.NET + React)</h1>
          <p className="mt-4 max-w-prose text-lg text-gray-600">
            I build pragmatic, production-ready systems: clean .NET backends, fast React frontends, and robust CI/CD.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-600 bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              See my projects
            </a>
            <a
              href="mailto:jakub.heidtke@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-gray-50"
            >
              Email me
            </a>
          </div>
        </div>

        {/* Right side: profile photo */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/profile.jpg"
            alt="Jakub Heidtke"
            className="h-48 w-48 rounded-full border-4 border-indigo-200 shadow-lg object-cover"
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-extrabold">About</h2>
        <p className="mt-4 leading-relaxed text-gray-700">
          I’m a pragmatic engineer who values clarity, tests, and reliable delivery. Recent work includes building a
          production-ready localization platform integrating GitHub & GitLab, plus high-throughput services in .NET with
          observability and robust background processing.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          {[
            "C#",
            "ASP.NET",
            "EF Core",
            "Dapper",
            "React",
            "TypeScript",
            "Vite",
            "AG Grid",
            "OAuth",
            "Octokit",
            "Docker",
            "New Relic",
            "xUnit",
          ].map((s) => (
            <span key={s} className="rounded-full border px-3 py-1">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-extrabold">Selected projects</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "I18n Process Tools",
              desc: "Localization workflow for Notino: GitHub/GitLab integration, bulk translation requests, PR/MR automation.",
              tags: ["React", "TypeScript", ".NET", "Octokit", "GitLab API"],
            },
            {
              name: "Logistics Order Service (LOS)",
              desc: "High-throughput .NET service with Dapper, manual transactions, observability (New Relic).",
              tags: [".NET", "Dapper", "xUnit", "New Relic"],
            },
            {
              name: "YouTubester",
              desc: "Automation toolkit for channel ops: bulk title/description/tag updates, Shorts hashtag presets.",
              tags: ["C#", "YouTube API", "CLI"],
            },
          ].map((p) => (
            <div key={p.name} className="rounded-2xl border bg-white/70 p-6 shadow-sm hover:shadow">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-gray-100 px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-extrabold">Experience</h2>
        <div className="mt-4 space-y-4">
          {[
            {
              role: "Software Engineer",
              company: "Notino",
              period: "2023 – Present",
              bullets: [
                "Added GitHub support alongside GitLab flows in i18n tooling (OAuth, low-level Octokit).",
                "Improved MR creation to update only changed files and preserve line endings.",
                "Added robust background processing with Hangfire and idempotent handlers.",
              ],
            },
            {
              role: "Full-stack Developer",
              company: "Freelance",
              period: "2018 – 2023",
              bullets: [
                "Delivered small business apps, integrations, and data pipelines with pragmatic architectures.",
              ],
            },
          ].map((e) => (
            <div key={e.company} className="rounded-2xl border bg-white/70 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <h3 className="text-lg font-semibold">
                  {e.role} · {e.company}
                </h3>
                <p className="text-sm text-gray-500">{e.period}</p>
              </div>
              <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-gray-700">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-extrabold">Let’s talk</h2>
        <p className="mt-2 text-gray-700">I’m available for full-time roles and interesting projects.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="mailto:hey@jakubheidtke.dev" className="rounded-xl border px-4 py-2 hover:bg-gray-50">
            Email
          </a>
          <a href="https://www.linkedin.com/in/yourhandle" className="rounded-xl border px-4 py-2 hover:bg-gray-50">
            LinkedIn
          </a>
          <a href="https://github.com/yourhandle" className="rounded-xl border px-4 py-2 hover:bg-gray-50">
            GitHub
          </a>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Jakub Heidtke. Built with React, Vite & Tailwind v4.
      </footer>
    </div>
  );
}
