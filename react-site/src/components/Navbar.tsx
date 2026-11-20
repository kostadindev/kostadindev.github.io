import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { navItems, personalInfo } from '../data/content';
import { PageColumn } from './SectionHeader';

/** The id of the section currently under the header, for the active nav item. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const ids = navItems.map((i) => i.href.slice(1));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  const links = (onClick?: () => void) =>
    navItems.map((item) => (
      <Button
        key={item.name}
        asChild
        variant="ghost"
        className={cn(active === item.href.slice(1) && 'bg-accent text-accent-foreground')}
      >
        <a href={item.href} onClick={onClick} aria-current={active === item.href.slice(1) ? 'true' : undefined}>
          {item.name}
        </a>
      </Button>
    ));

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <PageColumn className="flex h-16 items-center gap-2">
        <a href="#about" className="mr-auto font-semibold">
          {personalInfo.name}
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links()}
          <Button asChild variant="outline" className="ml-2">
            <a href={personalInfo.cvUrl} target="_blank" rel="noopener">
              Resume
            </a>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-4">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav aria-label="Main" className="mt-8 flex flex-col items-stretch gap-1 [&>a]:justify-start">
              {links(() => setOpen(false))}
              <Button asChild variant="outline" className="mt-2">
                <a href={personalInfo.cvUrl} target="_blank" rel="noopener">
                  Resume
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </PageColumn>
    </header>
  );
}
