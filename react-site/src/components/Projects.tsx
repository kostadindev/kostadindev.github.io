import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { projects, type Project } from '../data/content';
import { LinkButtons } from './CurrentWork';
import SectionHeader, { Section } from './SectionHeader';
import { Body } from './typography';

// Display labels for the category keys used in content.ts. Any key missing from
// this map falls back to the raw key, so a new category is still filterable.
const CATEGORY_LABELS: Record<string, string> = {
  'human-ai': 'Human–AI',
  agentic: 'Agentic AI',
  genai: 'GenAI',
  nlp: 'NLP & IR',
  cv: 'Computer Vision',
  mcp: 'MCP',
  hpc: 'HPC',
  iot: 'IoT',
};

// A filter that returns a single project is not worth its own toggle, so the
// tail categories stay reachable through "All" and their co-assigned category.
const MIN_PER_FILTER = 2;

/** "Threat Explorer: Agentic Architectures…" → "Threat Explorer" */
function displayTitle(p: Project) {
  return p.shortTitle ?? p.title.split(':')[0].trim();
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Badge key={tag} variant="outline">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

function Figure({ project }: { project: Project }) {
  return (
    <div className="flex aspect-[4/3] items-center justify-center border-b bg-muted/40">
      <img src={project.image} alt={`${displayTitle(project)} figure`} loading="lazy" className="size-full object-contain p-4" />
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  // Desktop: which project the preview card shows.
  const [activeTitle, setActiveTitle] = useState(projects[0].title);
  // Mobile: which row is expanded (no preview pane there).
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  // The list scrolls inside a fixed height on desktop, so the selected row
  // never scrolls away from its preview. Fades mark more list above or below.
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });
  const syncEdges = useCallback(() => {
    const el = listRef.current;
    if (!el || el.clientHeight === 0) return setEdges({ top: false, bottom: false });
    const max = el.scrollHeight - el.clientHeight;
    setEdges({ top: el.scrollTop > 2, bottom: max > 2 && el.scrollTop < max - 2 });
  }, []);
  useLayoutEffect(syncEdges, [syncEdges, filter]);
  useEffect(() => {
    window.addEventListener('resize', syncEdges);
    return () => window.removeEventListener('resize', syncEdges);
  }, [syncEdges]);

  // Derived from the data so the filters never drift out of sync with content.ts.
  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const c of p.category) counts.set(c, (counts.get(c) ?? 0) + 1);
    const derived = [...counts.entries()]
      .filter(([, n]) => n >= MIN_PER_FILTER)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([id, count]) => ({ id, label: CATEGORY_LABELS[id] ?? id, count }));
    return [{ id: 'all', label: 'All', count: projects.length }, ...derived];
  }, []);

  const visible = projects.filter((p) => filter === 'all' || p.category.includes(filter));
  // Fall back to the first visible row so a filter change never leaves the
  // preview showing a project that is no longer listed.
  const active = visible.find((p) => p.title === activeTitle) ?? visible[0];

  return (
    <Section id="projects">
      <SectionHeader id="projects-title" title="Past projects" />

      <ToggleGroup
        type="single"
        variant="outline"
        spacing={2}
        value={filter}
        onValueChange={(v) => {
          if (v) {
            setFilter(v);
            setOpenTitle(null);
          }
        }}
        aria-label="Filter projects by topic"
        className="mb-6 flex-wrap"
      >
        {filters.map((f) => (
          <ToggleGroupItem key={f.id} value={f.id} className="px-3">
            {f.label} <span className="text-muted-foreground">{f.count}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
        {/* Index */}
        <div className="relative">
          <ul ref={listRef} onScroll={syncEdges} className="border-t md:max-h-[40rem] md:overflow-y-auto">
            {visible.map((project) => {
              const open = openTitle === project.title;
              const isActive = active?.title === project.title;
              return (
                <li key={project.title} className="border-b">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveTitle(project.title)}
                    onFocus={() => setActiveTitle(project.title)}
                    onClick={() => {
                      setActiveTitle(project.title);
                      setOpenTitle(open ? null : project.title);
                    }}
                    aria-expanded={open}
                    className={cn(
                      'flex w-full items-start gap-2 border-l-2 border-transparent px-3 py-3 text-left hover:bg-accent focus-visible:bg-accent focus-visible:outline-none',
                      isActive && 'md:border-accent-mark md:bg-accent',
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-semibold leading-snug">{displayTitle(project)}</span>
                      <span className="mt-0.5 block leading-7 text-muted-foreground">{project.tagline}</span>
                      <span className="mt-2 block">
                        <Tags tags={project.tags} />
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn('mt-1 size-5 shrink-0 text-muted-foreground md:hidden', open && 'rotate-180')}
                    />
                  </button>

                  {/* Mobile-only inline detail; on md+ the preview card shows it. */}
                  {open && (
                    <div className="grid gap-3 px-3 pb-4 md:hidden">
                      <div className="overflow-hidden rounded-lg border">
                        <Figure project={project} />
                      </div>
                      <Body muted>{project.description}</Body>
                      {project.links.length > 0 && <LinkButtons links={project.links} />}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          {(['top', 'bottom'] as const).map((edge) => (
            <div
              key={edge}
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-x-0 hidden h-7 from-background to-transparent md:block',
                edge === 'top' ? 'top-0 bg-linear-to-b' : 'bottom-0 bg-linear-to-t',
                !edges[edge] && 'md:hidden',
              )}
            />
          ))}
        </div>

        {/* Preview: one card serving every row. */}
        {active && (
          <div className="hidden md:block">
            <Card className="sticky top-20 gap-0 overflow-hidden py-0">
              <Figure project={active} />
              <CardHeader className="pt-6">
                <CardTitle className="text-lg leading-snug">
                  <h3>{displayTitle(active)}</h3>
                </CardTitle>
                <CardDescription className="text-base leading-7">{active.description}</CardDescription>
              </CardHeader>
              {active.links.length > 0 && (
                <CardFooter className="pt-4 pb-6">
                  <LinkButtons links={active.links} />
                </CardFooter>
              )}
              {active.links.length === 0 && <CardContent className="pb-6" />}
            </Card>
          </div>
        )}
      </div>
    </Section>
  );
}
