import { Separator } from '@/components/ui/separator';
import { education, certificates, moreCertificatesUrl } from '../data/content';
import Highlight from './Highlight';
import Logo from './Logo';
import SectionHeader, { Section } from './SectionHeader';
import { Body, ItemTitle } from './typography';

export default function Education() {
  return (
    <Section id="education">
      <SectionHeader id="education-title" title="Education" />

      <ul className="mb-12">
        {education.map((edu, i) => (
          <li key={`${edu.institution} · ${edu.degree}`}>
            {i > 0 && <Separator className="my-6" />}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
              <Logo src={edu.logo} alt={edu.institution} />
              <div className="min-w-0 flex-1">
                <ItemTitle>{edu.institution}</ItemTitle>
                <Body>
                  <Highlight>{edu.degree}</Highlight>
                </Body>
                {edu.details.map((detail) => (
                  <Body key={detail} muted>
                    {detail}
                  </Body>
                ))}
                {(edu.link || edu.transcript) && (
                  <Body>
                    <Highlight href={edu.link || edu.transcript}>{edu.link ? 'Learn more →' : 'View transcript →'}</Highlight>
                  </Body>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <SectionHeader title="Certifications" level="h3" />
      <ul className="grid gap-4">
        {certificates.map((cert) => (
          <li key={cert.title}>
            <a href={cert.link} target="_blank" rel="noopener" className="flex items-center gap-4 underline-offset-4 hover:underline sm:gap-6">
              <Logo src={cert.image} />
              <span className="leading-7">{cert.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <Body className="mt-4">
        <Highlight href={moreCertificatesUrl}>More certifications</Highlight>
      </Body>
    </Section>
  );
}
