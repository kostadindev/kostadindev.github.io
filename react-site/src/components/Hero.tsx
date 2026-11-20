import { useState } from 'react';
import { Check, Copy, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { personalInfo } from '../data/content';
import Highlight from './Highlight';
import { LinkIcon } from './icons';
import { PageColumn } from './SectionHeader';
import { Body } from './typography';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const email = personalInfo.email;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" aria-labelledby="about-title">
      <PageColumn className="grid items-start gap-6 py-10 sm:grid-cols-[15rem_1fr] sm:gap-10 sm:py-14">
        <img
          src={personalInfo.avatar}
          alt={personalInfo.name}
          className="size-44 rounded-lg object-cover object-top sm:size-60"
        />

        <div>
          <h1 id="about-title" className="text-3xl font-semibold tracking-tight">
            Kostadin Devedzhiev
          </h1>
          <Body muted className="mt-1">PhD student, Trustworthy AI Lab, University of Cambridge</Body>

          <Body className="mt-5">
            I study multi-agent human–AI systems, with a focus on AI security and safety, at Cambridge's{' '}
            <Highlight href="https://www.chia.cam.ac.uk/">Centre for Human-Inspired AI</Highlight> (CHIA), supervised
            by <Highlight href="https://umangsbhatt.github.io/">Professor Umang Bhatt</Highlight> and{' '}
            <Highlight href="http://mlg.eng.cam.ac.uk/adrian/">Professor Adrian Weller</Highlight>. Before Cambridge, I
            was a software engineer at <Highlight href="https://stellarcyber.ai">Stellar Cyber</Highlight>, where I
            built AI security tools, including a multi-agent autonomous security triage system and a language-driven
            security data visualisation interface, presented at RSA and Black Hat.
          </Body>

          <Button asChild variant="outline" className="mt-6">
            <a href="#work">View my work</a>
          </Button>

          <div className="mt-6 flex flex-wrap items-center gap-x-1 gap-y-2">
            {personalInfo.socials.map((social) => (
              <Tooltip key={social.name}>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon" className="text-muted-foreground">
                    <a href={social.url} target="_blank" rel="noopener" aria-label={social.name}>
                      <LinkIcon type={social.icon} />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{social.name}</TooltipContent>
              </Tooltip>
            ))}
            <span className="ml-2 flex items-center">
              <Highlight href={`mailto:${email}`} className="text-sm">
                {email}
              </Highlight>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={copyEmail} aria-label="Copy email" className="text-muted-foreground">
                    {copied ? <Check /> : <Copy />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{copied ? 'Copied' : 'Copy email'}</TooltipContent>
              </Tooltip>
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
              Cambridge, UK
            </span>
          </div>
        </div>
      </PageColumn>
    </section>
  );
}
