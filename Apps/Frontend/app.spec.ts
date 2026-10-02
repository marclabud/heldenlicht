import { describe, it, expect } from 'vitest'
import { resolveImageUrl, filterGalleryItems, getPlaceholderImageSvg } from './utils/gallery'
import type { GalleryItem } from './types/gallery'

const mockItems: GalleryItem[] = [
  {
    id: 'test-1',
    title: 'Arcane Jinx',
    src: '/2024/jinx.webp',
    category: 'cosplay',
    tags: ['League of Legends', 'Arcane'],
    cosplayer: '@shirou_cos',
    character: 'Jinx',
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Hall 2.1'
  },
  {
    id: 'test-2',
    title: 'Malenia Blade of Miquella',
    src: 'https://custom-cdn.example.com/malenia.webp',
    category: 'cosplay',
    tags: ['Elden Ring'],
    cosplayer: '@valkyrie',
    character: 'Malenia',
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Stage'
  },
  {
    id: 'test-3',
    title: 'Esports Arena Grand Finals',
    src: 'gaming/finals.webp',
    category: 'gaming',
    tags: ['Valorant', 'Esports'],
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Red Bull Arena'
  }
]

describe('Heldenlicht Gallery R2 URL Resolution', () => {
  it('resolves relative path with default R2 CDN domain', () => {
    const url = resolveImageUrl('/2024/cosplay.webp')
    expect(url).toBe('https://cdn.heldenlicht.ch/2024/cosplay.webp')
  })

  it('resolves relative path without leading slash', () => {
    const url = resolveImageUrl('2024/cosplay.webp')
    expect(url).toBe('https://cdn.heldenlicht.ch/2024/cosplay.webp')
  })

  it('respects custom R2 CDN domain with trailing slash', () => {
    const url = resolveImageUrl('/hero.jpg', 'https://r2.heldenlicht.ch/')
    expect(url).toBe('https://r2.heldenlicht.ch/hero.jpg')
  })

  it('preserves absolute URLs without alteration', () => {
    const absUrl = 'https://custom-cdn.example.com/malenia.webp'
    expect(resolveImageUrl(absUrl)).toBe(absUrl)
  })

  it('serves local path when r2BaseUrl is empty', () => {
    const url = resolveImageUrl('/2024/cosplay.webp', '')
    expect(url).toBe('/2024/cosplay.webp')
  })

  it('handles empty source gracefully', () => {
    expect(resolveImageUrl('')).toBe('')
  })

})

describe('Heldenlicht Gallery Filtering', () => {
  it('returns all items when category is "all" and search is empty', () => {
    const results = filterGalleryItems(mockItems, 'all', '')
    expect(results).toHaveLength(3)
  })

  it('filters strictly by category', () => {
    const cosplayResults = filterGalleryItems(mockItems, 'cosplay', '')
    expect(cosplayResults).toHaveLength(2)
    expect(cosplayResults.every(item => item.category === 'cosplay')).toBe(true)

    const gamingResults = filterGalleryItems(mockItems, 'gaming', '')
    expect(gamingResults).toHaveLength(1)
    expect(gamingResults[0]?.id).toBe('test-3')
  })

  it('searches by cosplayer handle case-insensitively', () => {
    const results = filterGalleryItems(mockItems, 'all', 'shirou')
    expect(results).toHaveLength(1)
    expect(results[0]?.cosplayer).toBe('@shirou_cos')
  })

  it('searches by character name', () => {
    const results = filterGalleryItems(mockItems, 'all', 'malenia')
    expect(results).toHaveLength(1)
    expect(results[0]?.character).toBe('Malenia')
  })

  it('searches by tag', () => {
    const results = filterGalleryItems(mockItems, 'all', 'arcane')
    expect(results).toHaveLength(1)
    expect(results[0]?.title).toBe('Arcane Jinx')
  })

  it('returns empty array when no items match search query', () => {
    const results = filterGalleryItems(mockItems, 'all', 'nonexistent-query-xyz')
    expect(results).toHaveLength(0)
  })
})

describe('Heldenlicht Placeholder SVG Generation', () => {
  it('generates a valid SVG data URI containing title and Heldenlicht branding', () => {
    const firstItem = mockItems[0]
    expect(firstItem).toBeDefined()
    if (!firstItem) return
    const svgDataUri = getPlaceholderImageSvg(firstItem)
    expect(svgDataUri.startsWith('data:image/svg+xml;utf8,')).toBe(true)
    expect(decodeURIComponent(svgDataUri)).toContain('Arcane Jinx')
    expect(decodeURIComponent(svgDataUri)).toContain('HELDENLICHT')
  })
})

