import { ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { experience, teaching } from '../data/content';
import Highlight from './Highlight';
import Logo from './Logo';
import SectionHeader, { Section } from './SectionHeader';
import { Body, ItemTitle, Meta } from './typography';

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeader id="experience-title" title="Work experience" />

      <ul className="mb-12">
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.title}`}>
            {i > 0 && <Separator className="my-6" />}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
              <Logo src={job.logo} alt={job.company} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <ItemTitle>{job.title}</ItemTitle>
                    <Body>
                      <Highlight>{job.company}</Highlight>
                    </Body>
                  </div>
                  <Meta className="shrink-0 sm:text-right">
                    {job.period}
                    <br />
                    {job.location}
                  </Meta>
                </div>
                <ul className="mt-2 ml-5 list-disc text-muted-foreground [&>li]:mt-1">
                  {job.highlights.map((highlight, idx) => (
                    <li key={idx} className="leading-7">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <SectionHeader title="Teaching experience" level="h3" />
      <ul className="grid gap-8 sm:grid-cols-2">
        {teaching.map((role) => (
          <li key={`${role.institution}-${role.title}`}>
            <ItemTitle as="h4">{role.title}</ItemTitle>
            <Body>
              <Highlight>{role.institution}</Highlight>
            </Body>
            <Meta>
              {role.location} | {role.period}
            </Meta>
            <Body muted className="mt-2">
              {role.description}
            </Body>
            {'link' in role && role.link && (
              <Body className="mt-1">
                <Highlight href={role.link} className="inline-flex items-center gap-1">
                  Learn more <ExternalLink className="size-4" aria-hidden="true" />
                </Highlight>
              </Body>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
