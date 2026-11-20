import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

/** The page column: one max width (--container-page, 960px) for every block. */
export function PageColumn({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-page px-4 sm:px-6', className)}>{children}</div>;
}

/** A page section: a thin rule above, then the content in the page column. */
export function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <PageColumn>
        <Separator />
        <div className="py-12 sm:py-14">{children}</div>
      </PageColumn>
    </section>
  );
}

interface Props {
  title: string;
  subtitle?: string;
  id?: string;
  /** HTML level: h2 for a section, h3 for a subsection. Both look the same. */
  level?: 'h2' | 'h3';
}

export default function SectionHeader({ title, subtitle, id, level = 'h2' }: Props) {
  const Heading = level;
  return (
    <div className="mb-6">
      <Heading id={id} className="text-2xl font-semibold tracking-tight">
        {title}
      </Heading>
      {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
