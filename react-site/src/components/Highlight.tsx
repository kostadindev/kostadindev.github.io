import { cn } from '@/lib/utils';

/**
 * The site's one accent: text or a link in --primary (orange, AA on white).
 * External links open in a new tab; mailto and in-page links do not.
 */
export default function Highlight({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (!href) return <span className={cn('text-primary', className)}>{children}</span>;
  const external = /^https?:|\.pdf$/.test(href);
  return (
    <a
      href={href}
      className={cn('text-primary underline-offset-4 hover:underline focus-visible:underline', className)}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
    >
      {children}
    </a>
  );
}
