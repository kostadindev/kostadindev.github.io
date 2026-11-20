import { skills } from '../data/content';
import SectionHeader, { Section } from './SectionHeader';
import { Body, ItemTitle } from './typography';

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeader id="skills-title" title="Technical skills" />
      <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {Object.entries(skills).map(([category, skillList]) => (
          <li key={category}>
            <ItemTitle>{category}</ItemTitle>
            <Body muted>{skillList.join(', ')}</Body>
          </li>
        ))}
      </ul>
    </Section>
  );
}
