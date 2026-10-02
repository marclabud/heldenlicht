export type GalleryCategory =
  | 'all'
  | 'cosplay'
  | 'stage'
  | 'gaming'
  | 'atmosphere'
  | 'portraits'

export interface GalleryItem {
  id: string
  title: string
  src: string // Relative path like '/2024/cosplay-jinx.webp' or full CDN URL
  thumbnailSrc?: string
  width?: number
  height?: number
  aspectRatio?: 'portrait' | 'square' | 'landscape'
  category: Exclude<GalleryCategory, 'all'>
  tags: string[]
  cosplayer?: string
  character?: string
  photographer: string
  location?: string
  date?: string
  cameraInfo?: string
  highlight?: boolean
}

export interface GalleryManifest {
  version: string
  updatedAt: string
  event: string
  location: string
  photographer: string
  items: GalleryItem[]
}
