import variants from '@/config/image-variants.json';

type Props = { src: keyof typeof variants; alt: string; width: number; height: number; sizes: string; className?: string; priority?: boolean };

export default function ResponsiveImage({ src, alt, width, height, sizes, className, priority = false }: Props) {
  return <img src={src} srcSet={variants[src].map(image => `${image.src} ${image.width}w`).join(', ')} sizes={sizes} alt={alt} width={width} height={height} className={className} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async"/>;
}
