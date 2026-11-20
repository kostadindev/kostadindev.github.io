import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { personalInfo } from '../data/content';
import Highlight from './Highlight';
import { LinkIcon } from './icons';
import { PageColumn } from './SectionHeader';
import { Meta } from './typography';

export default function Footer() {
  return (
    <footer>
      <PageColumn>
        <Separator />
        <div className="flex flex-col items-start gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">{personalInfo.name}</p>
            <Meta>{personalInfo.tagline}</Meta>
            <p className="text-sm">
              <Highlight href={`mailto:${personalInfo.email}`}>{personalInfo.email}</Highlight>
            </p>
          </div>
          <div className="flex items-center gap-1">
            {personalInfo.socials.map((social) => (
              <Button key={social.name} asChild variant="ghost" size="icon" className="text-muted-foreground">
                <a href={social.url} target="_blank" rel="noopener" aria-label={social.name}>
                  <LinkIcon type={social.icon} />
                </a>
              </Button>
            ))}
            <Button asChild variant="ghost" className="ml-2 text-muted-foreground">
              <a href="#about">
                <ArrowUp />
                Back to top
              </a>
            </Button>
          </div>
        </div>
      </PageColumn>
    </footer>
  );
}
