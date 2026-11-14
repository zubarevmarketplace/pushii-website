import Image from 'next/image';

export function Logo({ light = false, width = 126, original = false }: { light?: boolean; width?: number; original?: boolean }) {
  return <Image src={`/brand/logo-${light ? 'pink' : original ? 'green' : 'plum'}.svg`} alt="PUSHII — pet care" width={width} height={Math.round(width * 179 / 410)} />;
}

export function Paw({ className }: { className?: string }) {
  return <svg className={className} width="32" height="32" viewBox="0 0 62 57" fill="currentColor" aria-hidden="true"><path d="M16 42c-1-9 6-14 13-15 8-1 17 5 18 13 1 9-6 10-13 6-7 2-17 6-18-4Z"/><ellipse cx="12" cy="23" rx="6" ry="8" transform="rotate(-25 12 23)"/><ellipse cx="24" cy="12" rx="6" ry="8"/><ellipse cx="38" cy="13" rx="6" ry="8"/><ellipse cx="51" cy="24" rx="6" ry="8" transform="rotate(25 51 24)"/></svg>;
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{diagonal ? <path d="M6 18 18 6M6 6h12v12"/> : <path d="M4 12h15m-6-6 6 6-6 6"/>}</svg>;
}
