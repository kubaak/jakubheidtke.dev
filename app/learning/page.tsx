import type { Metadata } from "next";
import content from "@/data/content.json";
import { Card } from "@/components/Card";
import { CourseCard } from "@/components/CourseCard";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import type { Content } from "@/data/content";

export const metadata: Metadata = {
  title: "Education & Professional Development",
  description: "Education and selected professional development courses by Jakub Heidtke, Senior Full-Stack Engineer.",
  alternates: {
    canonical: "/learning",
  },
};

export default function LearningPage() {
  const { profile, navigation, education, learning, footer } = content as Content;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white text-gray-900">
      <Navbar profile={profile} navigation={navigation} />

      <main>
        <Section className="pt-14 pb-10">
          <p className="text-sm font-semibold tracking-wider text-brand-600 uppercase">
            Background &amp; ongoing development
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-extrabold sm:text-5xl">{learning.heading}</h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            A concise overview of my formal education and ongoing professional development as a senior full-stack
            engineer.
          </p>
        </Section>

        <Section className="pt-8">
          <h2 className="text-3xl font-extrabold">{learning.formalEducation.heading}</h2>

          <div className="mt-6 divide-y border-y">
            {education.items.map((item) => (
              <article key={`${item.school}-${item.period}`} className="py-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.school}</h3>

                    <p className="mt-1 text-gray-700">{item.degree}</p>
                  </div>

                  <p className="shrink-0 text-sm text-gray-500">{item.period}</p>
                </div>

                {item.description && (
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">{item.description}</p>
                )}
              </article>
            ))}
          </div>
        </Section>

        {learning.certifications.items.length > 0 && (
          <Section>
            <h2 className="text-3xl font-extrabold">{learning.certifications.heading}</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {learning.certifications.items.map((certification) => (
                <Card key={`${certification.name}-${certification.issuer}`}>
                  <p className="text-sm text-gray-500">
                    {certification.issuer}
                    {certification.issuedAt && ` · ${certification.issuedAt}`}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">{certification.name}</h3>

                  {certification.skills && certification.skills.length > 0 && (
                    <p className="mt-3 text-sm text-gray-600">{certification.skills.join(" · ")}</p>
                  )}

                  {certification.credentialUrl && (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline"
                    >
                      View credential ↗
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </Section>
        )}

        <Section>
          <h2 className="text-3xl font-extrabold">{learning.courses.heading}</h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            Selected courses covering backend engineering, distributed systems, security, and technologies that
            complement my core .NET experience.
          </p>

          {learning.courses.items.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {learning.courses.items.map((course) => (
                <CourseCard
                  key={course.name}
                  name={course.name}
                  topics={course.topics}
                  certificateUrl={course.certificateUrl}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 max-w-2xl border-t pt-5 text-gray-700">
              <p>Selected course details will be added here as they are completed.</p>
            </div>
          )}
        </Section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {footer.text}
      </footer>
    </div>
  );
}
