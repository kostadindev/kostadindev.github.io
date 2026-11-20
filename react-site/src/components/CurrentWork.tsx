import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { currentWork } from '../data/content';
import Highlight from './Highlight';
import { LinkIcon } from './icons';
import SectionHeader, { Section } from './SectionHeader';
import SkillCovariance from './SkillCovariance';
import SkillPipeline from './SkillPipeline';
import { Meta } from './typography';

type Visual =
  | { kind: 'image'; src: string; caption?: string }
  | { kind: 'component'; name: string; caption?: string };

const vizRegistry: Record<string, React.ComponentType> = {
  'skill-covariance': SkillCovariance,
  'skill-pipeline': SkillPipeline,
};

/** The visual of a work card: one or more slides (images or live diagrams)
 *  shown at the card's full width. Single-visual cards show no controls. */
function WorkVisual({ visuals, title }: { visuals: Visual[]; title: string }) {
  const [i, setI] = useState(0);
  const many = visuals.length > 1;
  const v = visuals[Math.min(i, visuals.length - 1)];
  const go = (d: number) => setI((p) => (p + d + visuals.length) % visuals.length);
  const Comp = v.kind === 'component' ? vizRegistry[v.name] : null;

  return (
    <figure className="border-b bg-muted/40">
      <div className="relative flex aspect-[16/10] items-center justify-center">
        {v.kind === 'image' ? (
          <img src={v.src} alt={v.caption ?? title} className="size-full object-contain p-4" />
        ) : Comp ? (
          <Comp />
        ) : null}
        {many && (
          <>
            <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Previous visual" className="absolute left-3">
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Next visual" className="absolute right-3">
              <ChevronRight />
            </Button>
          </>
        )}
      </div>
      {(many || v.caption) && (
        <figcaption className="flex items-center justify-between gap-4 border-t bg-background px-6 py-2">
          <Meta>{v.caption}</Meta>
          {many && (
            <div className="flex shrink-0">
              {visuals.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Show visual ${k + 1} of ${visuals.length}`}
                  aria-current={k === i}
                  className="flex size-6 items-center justify-center rounded-full"
                >
                  <span className={cn('size-2 rounded-full', k === i ? 'bg-accent-mark' : 'bg-border')} />
                </button>
              ))}
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function CopyableCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center rounded-md border bg-muted/40">
      <code className="flex-1 overflow-x-auto px-4 py-2 whitespace-nowrap">
        <span className="mr-2 text-muted-foreground">$</span>
        {command}
      </code>
      <Button variant="ghost" size="sm" onClick={copy} className="mr-1">
        {copied ? 'Copied' : 'Copy'}
      </Button>
    </div>
  );
}

function renderDescription(text: string) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    return m ? (
      <Highlight key={i} href={m[2]}>
        {m[1]}
      </Highlight>
    ) : (
      part
    );
  });
}

export function LinkButtons({ links }: { links: { type: string; url: string }[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {links.map((link) => (
        <Tooltip key={link.url}>
          <TooltipTrigger asChild>
            <Button asChild variant="ghost" size="icon" className="text-muted-foreground">
              <a href={link.url} target="_blank" rel="noopener" aria-label={link.type}>
                <LinkIcon type={link.type} />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="capitalize">{link.type}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

export default function CurrentWork() {
  return (
    <Section id="work">
      <SectionHeader id="work-title" title="Research & building" subtitle="My MPhil thesis and the platform I built alongside it." />

      <div className="grid gap-8">
        {currentWork.map((project) => {
          const p = project as typeof project & { visuals?: Visual[]; commands?: string[] };
          return (
            <Card key={project.title} className="gap-0 overflow-hidden py-0">
              <WorkVisual title={project.title} visuals={p.visuals ?? [{ kind: 'image', src: project.image }]} />
              <CardHeader className="pt-6">
                <CardTitle className="text-lg leading-snug">
                  <h3>{project.title}</h3>
                </CardTitle>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 pt-4 pb-6">
                <CardDescription className="text-base leading-7">{renderDescription(project.description)}</CardDescription>
                {p.commands && (
                  <div className="grid gap-2">
                    {p.commands.map((cmd) => (
                      <CopyableCommand key={cmd} command={cmd} />
                    ))}
                  </div>
                )}
                <LinkButtons links={project.links} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
