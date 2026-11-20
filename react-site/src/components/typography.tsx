import { cn } from '@/lib/utils';

// The type scale as components, so every section uses the same sizes:
//   ItemTitle 18px semibold, Body 16px (leading-7), Meta 14px muted.
type P = { className?: string; children: React.ReactNode };

export function ItemTitle({ className, children, as: Tag = 'h3' }: P & { as?: 'h3' | 'h4' | 'p' }) {
  return <Tag className={cn('text-lg font-semibold leading-snug', className)}>{children}</Tag>;
}

export function Body({ className, children, muted = false }: P & { muted?: boolean }) {
  return <p className={cn('leading-7', muted && 'text-muted-foreground', className)}>{children}</p>;
}

export function Meta({ className, children }: P) {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>;
}
