import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { news } from '../data/content';
import Highlight from './Highlight';
import { LinkIcon } from './icons';
import SectionHeader, { Section } from './SectionHeader';
import { Body, ItemTitle, Meta } from './typography';

const PAGE_SIZE = 5;

/** Renders *italic* and [label](url) in a news description. A label that names
 *  a link type (report, slide) is shown as that icon. */
function renderDescription(text: string) {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g).map((part, i) => {
    const italic = part.match(/^\*([^*]+)\*$/);
    if (italic) return <em key={i}>{italic[1]}</em>;
    const link = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (link) {
      const label = link[1];
      const isIcon = ['report', 'slide'].includes(label.toLowerCase());
      return (
        <Highlight key={i} href={link[2]} className={isIcon ? 'inline-flex align-middle' : undefined}>
          {isIcon ? (
            <>
              <LinkIcon type={label.toLowerCase()} className="size-4" />
              <span className="sr-only">{label}</span>
            </>
          ) : (
            label
          )}
        </Highlight>
      );
    }
    return part;
  });
}

export default function News() {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(news.length / PAGE_SIZE);
  const items = news.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (p >= 1 && p <= pageCount) setPage(p);
  };

  return (
    <Section id="news">
      <SectionHeader id="news-title" title="News" />

      <ul>
        {items.map((item, i) => (
          <li key={item.title}>
            {i > 0 && <Separator className="my-4" />}
            <div className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <div>
                <p className="text-sm">
                  <Highlight>{item.date}</Highlight>
                </p>
                <Meta>{item.location}</Meta>
              </div>
              <div>
                <ItemTitle>
                  <a href={item.link} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
                    {item.title}
                  </a>
                </ItemTitle>
                <Body muted>{renderDescription(item.description)}</Body>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {pageCount > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#news" onClick={go(page - 1)} aria-disabled={page === 1} />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, k) => k + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink href="#news" isActive={p === page} onClick={go(p)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#news" onClick={go(page + 1)} aria-disabled={page === pageCount} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </Section>
  );
}
