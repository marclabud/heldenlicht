import type { GalleryItem, GalleryCategory, GalleryManifest } from '~/types/gallery'
import { resolveImageUrl, filterGalleryItems } from '~/utils/gallery'

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'hf-2024-001',
    title: 'Loose Cannon — Arcane Jinx',
    src: '/2024/cosplay-jinx-arcane.webp',
    aspectRatio: 'portrait',
    category: 'cosplay',
    tags: ['Arcane', 'League of Legends', 'Neon', 'Props'],
    cosplayer: '@shirou_cos',
    character: 'Jinx',
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Hall 2.1',
    date: 'HeroFest Day 2',
    cameraInfo: 'Sony A7 IV • 85mm f/1.4 GM • 1/320s ISO 400',
    highlight: true
  },
  {
    id: 'hf-2024-002',
    title: 'Blade of Miquella — Malenia',
    src: '/2024/cosplay-malenia-eldenring.webp',
    aspectRatio: 'portrait',
    category: 'cosplay',
    tags: ['Elden Ring', 'Armor', 'Prosthetic', 'Golden Order'],
    cosplayer: '@valkyrie_craft',
    character: 'Malenia',
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Cosplay Village',
    date: 'HeroFest Day 1',
    cameraInfo: 'Sony A7 IV • 50mm f/1.2 GM • 1/500s ISO 200',
    highlight: true
  },
  {
    id: 'hf-2024-003',
    title: 'Cosplay Championship Finals',
    src: '/2024/stage-cosplay-finals.webp',
    aspectRatio: 'landscape',
    category: 'stage',
    tags: ['Contest', 'Main Stage', 'Showcase', 'Winners'],
    cosplayer: 'Championship Top 5',
    character: 'Group Showcase',
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Main Stage (Hall 3)',
    date: 'HeroFest Day 2',
    cameraInfo: 'Sony A7 IV • 70-200mm f/2.8 GM II • 1/640s ISO 1600',
    highlight: true
  },
  {
    id: 'hf-2024-004',
    title: 'Cyberpunk 2077 — Sandevistan Rush',
    src: '/2024/cosplay-david-edgerunners.webp',
    aspectRatio: 'square',
    category: 'cosplay',
    tags: ['Cyberpunk', 'Edgerunners', 'LED', 'Night City'],
    cosplayer: '@cyber_swiss',
    character: 'David Martinez',
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Neon Alley',
    date: 'HeroFest Day 2',
    cameraInfo: 'Sony A7 IV • 35mm f/1.4 GM • 1/250s ISO 800',
    highlight: false
  },
  {
    id: 'hf-2024-005',
    title: 'Grand Finals Atmosphere — Swiss Esports',
    src: '/2024/gaming-esports-arena.webp',
    aspectRatio: 'landscape',
    category: 'gaming',
    tags: ['Esports', 'Valorant', 'Crowd', 'Bernexpo'],
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Red Bull Gaming Sphere',
    date: 'HeroFest Day 3',
    cameraInfo: 'Sony A7 IV • 24-70mm f/2.8 GM II • 1/400s ISO 2500',
    highlight: false
  },
  {
    id: 'hf-2024-006',
    title: 'Plenilune Gaze — Raiden Shogun',
    src: '/2024/cosplay-raiden-genshin.webp',
    aspectRatio: 'portrait',
    category: 'portraits',
    tags: ['Genshin Impact', 'Inazuma', 'Katana', 'Studio Light'],
    cosplayer: '@kiri_art',
    character: 'Raiden Ei',
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Heldenlicht Pop-Up Studio',
    date: 'HeroFest Day 1',
    cameraInfo: 'Sony A7 IV • 85mm f/1.4 GM • 1/200s ISO 100',
    highlight: true
  },
  {
    id: 'hf-2024-007',
    title: 'Neon Alley Corridor Vibe',
    src: '/2024/atmosphere-hall-lights.webp',
    aspectRatio: 'landscape',
    category: 'atmosphere',
    tags: ['Hall 3.0', 'Neon', 'Cyberpunk', 'Lighting'],
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Hall 3.0',
    date: 'HeroFest Day 2',
    cameraInfo: 'Sony A7 IV • 24mm f/1.4 GM • 1/160s ISO 1250',
    highlight: false
  },
  {
    id: 'hf-2024-008',
    title: 'Tears of the Kingdom — Royal Pair',
    src: '/2024/cosplay-zelda-link.webp',
    aspectRatio: 'portrait',
    category: 'cosplay',
    tags: ['Zelda', 'Nintendo', 'Master Sword', 'Hyrule'],
    cosplayer: '@swiss_zelda & @linq_craft',
    character: 'Link & Princess Zelda',
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Festhalle Exterior',
    date: 'HeroFest Day 1',
    cameraInfo: 'Sony A7 IV • 50mm f/1.2 GM • 1/1000s ISO 160',
    highlight: true
  },
  {
    id: 'hf-2024-009',
    title: 'Buster Sword Unleashed — Cloud Strife',
    src: '/2024/cosplay-cloud-ff7.webp',
    aspectRatio: 'square',
    category: 'cosplay',
    tags: ['Final Fantasy', 'FFVII Rebirth', 'Buster Sword', 'Midgar'],
    cosplayer: '@bex_props',
    character: 'Cloud Strife',
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Hall 2.0 Plaza',
    date: 'HeroFest Day 3',
    cameraInfo: 'Sony A7 IV • 85mm f/1.4 GM • 1/400s ISO 320',
    highlight: false
  },
  {
    id: 'hf-2024-010',
    title: 'Stage Pyro & Taiko Performance',
    src: '/2024/stage-pyro-taiko.webp',
    aspectRatio: 'landscape',
    category: 'stage',
    tags: ['Drums', 'Pyrotechnics', 'Main Stage', 'Opening'],
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Main Arena',
    date: 'HeroFest Day 1',
    cameraInfo: 'Sony A7 IV • 70-200mm f/2.8 GM II • 1/800s ISO 3200',
    highlight: false
  },
  {
    id: 'hf-2024-011',
    title: 'Retro Arcade Nostalgia',
    src: '/2024/gaming-arcade-crt.webp',
    aspectRatio: 'portrait',
    category: 'gaming',
    tags: ['Arcade', 'CRT', 'Street Fighter', 'Retro'],
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Retro Zone',
    date: 'HeroFest Day 2',
    cameraInfo: 'Sony A7 IV • 35mm f/1.4 GM • 1/200s ISO 1600',
    highlight: false
  },
  {
    id: 'hf-2024-012',
    title: 'Bernexpo Golden Dusk — Con Close',
    src: '/2024/atmosphere-bernexpo-dusk.webp',
    aspectRatio: 'landscape',
    category: 'atmosphere',
    tags: ['Bern', 'Sunset', 'Convention', 'Architecture'],
    photographer: 'Heldenlicht',
    location: 'Bernexpo • Bernese Skyline',
    date: 'HeroFest Day 2',
    cameraInfo: 'Sony A7 IV • 24mm f/1.4 GM • 1/250s ISO 200',
    highlight: false
  }
]

export function useGalleryData() {
  const config = useRuntimeConfig()
  const r2BaseUrl = typeof config.public?.r2Url === 'string' ? config.public.r2Url : ''


  const items = useState<GalleryItem[]>('gallery-items', () => INITIAL_GALLERY_ITEMS)
  const manifestMeta = useState<{ event: string, location: string, updatedAt: string } | null>(
    'gallery-manifest-meta',
    () => ({
      event: 'HeroFest Bernexpo',
      location: 'Bern, Switzerland',
      updatedAt: '2024-10-14T20:00:00Z'
    })
  )
  const isFetching = useState<boolean>('gallery-loading', () => false)
  const selectedCategory = useState<GalleryCategory>('gallery-category', () => 'all')
  const searchQuery = useState<string>('gallery-search', () => '')
  const activeIndex = useState<number | null>('gallery-lightbox-index', () => null)

  const loadManifest = async () => {
    isFetching.value = true
    try {
      const data = await $fetch<GalleryManifest>('/gallery-manifest.json')
      if (data?.items && Array.isArray(data.items)) {
        items.value = data.items
        manifestMeta.value = {
          event: data.event,
          location: data.location,
          updatedAt: data.updatedAt
        }
      }
    } catch {
      // Keep initial items if manifest file cannot be fetched dynamically
    } finally {
      isFetching.value = false
    }
  }

  const filteredItems = computed(() => {
    return filterGalleryItems(items.value, selectedCategory.value, searchQuery.value)
  })

  const activeItem = computed<GalleryItem | null>(() => {
    if (activeIndex.value === null) return null
    return filteredItems.value[activeIndex.value] ?? null
  })

  const openLightbox = (item: GalleryItem) => {
    const idx = filteredItems.value.findIndex(i => i.id === item.id)
    if (idx !== -1) {
      activeIndex.value = idx
    }
  }

  const closeLightbox = () => {
    activeIndex.value = null
  }

  const nextItem = () => {
    if (activeIndex.value === null || filteredItems.value.length === 0) return
    activeIndex.value = (activeIndex.value + 1) % filteredItems.value.length
  }

  const prevItem = () => {
    if (activeIndex.value === null || filteredItems.value.length === 0) return
    activeIndex.value = (activeIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length
  }

  const getFullImageUrl = (src: string) => resolveImageUrl(src, r2BaseUrl)

  return {
    items,
    manifestMeta,
    isFetching,
    selectedCategory,
    searchQuery,
    filteredItems,
    activeIndex,
    activeItem,
    r2BaseUrl,
    loadManifest,
    openLightbox,
    closeLightbox,
    nextItem,
    prevItem,
    getFullImageUrl
  }
}
