import { useState } from 'react';

// Every logo gets the same visual area (about 70 x 70 for a square mark), so
// wide wordmarks and square crests read at the same optical size. The files are
// trimmed to their content (*-trim.png), so the area is all logo. Logos sit in
// one fixed-width slot, so the text beside them always starts at the same x.
// On phones the logo sits above the entry instead of beside it.
const AREA = 4900;
const MAX_W = 150;
const MIN_H = 40;
const MAX_H = 72;

function fit(aspect: number) {
  let w = Math.sqrt(AREA * aspect);
  let h = Math.sqrt(AREA / aspect);
  if (h > MAX_H) { h = MAX_H; w = h * aspect; }
  if (h < MIN_H) { h = MIN_H; w = h * aspect; }
  if (w > MAX_W) { w = MAX_W; h = w / aspect; }
  return { w: Math.round(w), h: Math.round(h) };
}

export default function Logo({ src, alt = '' }: { src: string; alt?: string }) {
  const [aspect, setAspect] = useState(1);
  const { w, h } = fit(aspect);
  return (
    <div className="flex h-18 shrink-0 items-center sm:w-38">
      <img
        src={src}
        alt={alt}
        onLoad={(e) => setAspect(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
        style={{ '--logo-w': `${w}px`, '--logo-h': `${h}px` } as React.CSSProperties}
        className="h-(--logo-h) w-(--logo-w) object-contain"
      />
    </div>
  );
}
