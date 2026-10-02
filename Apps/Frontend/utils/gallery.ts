import type { GalleryItem, GalleryCategory } from '~/types/gallery'

export const DEFAULT_R2_URL = 'https://cdn.heldenlicht.ch'

/**
 * Resolves an image source path against the Cloudflare R2 CDN base URL.
 * Defaults to https://cdn.heldenlicht.ch, or serves locally if r2BaseUrl is empty.
 * Handles full URLs, relative paths, and trailing/leading slash normalization.
 */
export function resolveImageUrl(src: string, r2BaseUrl = DEFAULT_R2_URL): string {
  if (!src) return ''
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src
  }

  const cleanPath = src.startsWith('/') ? src : `/${src}`
  const cleanBase = (r2BaseUrl || '').replace(/\/+$/, '')

  return cleanBase ? `${cleanBase}${cleanPath}` : cleanPath
}

/**
 * Generates an SVG placeholder for mock/offline preview or pending R2 uploads.
 * Styled with Heldenlicht dark-mode aesthetic (zinc-950 background with subtle glow).
 */
export function getPlaceholderImageSvg(item: GalleryItem): string {
  const accentColor = item.category === 'cosplay' ? '#f59e0b' : item.category === 'stage' ? '#06b6d4' : item.category === 'gaming' ? '#8b5cf6' : item.category === 'portraits' ? '#ec4899' : '#10b981'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
      <defs>
        <radialGradient id="glow-${item.id}" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="bg-${item.id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#18181b"/>
          <stop offset="100%" stop-color="#09090b"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-${item.id})"/>
      <rect width="100%" height="100%" fill="url(#glow-${item.id})"/>
      <circle cx="400" cy="400" r="160" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="4 6" fill="none" opacity="0.4"/>
      <circle cx="400" cy="400" r="120" stroke="#3f3f46" stroke-width="1" fill="none" opacity="0.6"/>
      <polygon points="400,320 470,440 330,440" stroke="${accentColor}" stroke-width="2" fill="none" opacity="0.7"/>
      
      <!-- Text & Meta -->
      <text x="400" y="580" fill="#f4f4f5" font-family="system-ui, sans-serif" font-size="28" font-weight="700" text-anchor="middle" letter-spacing="1.5">${escapeXml(item.title)}</text>
      <text x="400" y="620" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="18" text-anchor="middle">${escapeXml(item.character || item.location || 'HeroFest Bernexpo')}</text>
      <text x="400" y="655" fill="${accentColor}" font-family="system-ui, sans-serif" font-size="15" font-weight="600" text-anchor="middle" letter-spacing="2">HELDENLICHT • R2 ASSET</text>
      
      <rect x="200" y="700" width="400" height="1" fill="#27272a"/>
      <text x="400" y="740" fill="#71717a" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">${escapeXml(item.cameraInfo || 'Sony A7 IV • High Res Capture')}</text>
    </svg>
  `
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Filter gallery items by category and search keyword (matches title, cosplayer, character, tags).
 */
export function filterGalleryItems(
  items: GalleryItem[],
  category: GalleryCategory,
  searchQuery: string = ''
): GalleryItem[] {
  const query = searchQuery.trim().toLowerCase()

  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category
    if (!matchesCategory) return false

    if (!query) return true

    const titleMatch = item.title.toLowerCase().includes(query)
    const cosplayerMatch = item.cosplayer?.toLowerCase().includes(query) ?? false
    const characterMatch = item.character?.toLowerCase().includes(query) ?? false
    const locationMatch = item.location?.toLowerCase().includes(query) ?? false
    const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(query))

    return titleMatch || cosplayerMatch || characterMatch || locationMatch || tagsMatch
  })
}
