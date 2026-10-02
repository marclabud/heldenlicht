<script setup lang="ts">
import { onMounted, computed } from 'vue'
import type { GalleryCategory } from '~/types/gallery'
import { useGalleryData } from '~/composables/useGalleryData'

const { t } = useI18n()

const {
  items,
  filteredItems,
  selectedCategory,
  searchQuery,
  activeItem,
  activeIndex,
  r2BaseUrl,
  loadManifest,
  openLightbox,
  closeLightbox,
  nextItem,
  prevItem
} = useGalleryData()

onMounted(() => {
  loadManifest()
})

const categories = computed(() => {
  const list: { key: GalleryCategory; count: number }[] = [
    { key: 'all', count: items.value.length },
    { key: 'cosplay', count: items.value.filter(i => i.category === 'cosplay').length },
    { key: 'stage', count: items.value.filter(i => i.category === 'stage').length },
    { key: 'gaming', count: items.value.filter(i => i.category === 'gaming').length },
    { key: 'atmosphere', count: items.value.filter(i => i.category === 'atmosphere').length },
    { key: 'portraits', count: items.value.filter(i => i.category === 'portraits').length }
  ]
  return list
})

const resetFilters = () => {
  selectedCategory.value = 'all'
  searchQuery.value = ''
}

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogSiteName: 'Heldenlicht',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
    <!-- Header & Hero Section with Language Switcher -->
    <GalleryHeader
      :categories="categories"
      :active-category="selectedCategory"
      :search-query="searchQuery"
      :total-count="items.length"
      @update:active-category="selectedCategory = $event"
      @update:search-query="searchQuery = $event"
    />

    <!-- Main Content Area: Responsive Grid -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Active Results Bar -->
      <div class="flex items-center justify-between text-xs text-zinc-400 mb-6 pb-3 border-b border-zinc-900">
        <div class="flex flex-wrap items-center gap-2">
          <span>{{ t('gallery.showingCount', { filtered: filteredItems.length, total: items.length }) }}</span>
          <span v-if="searchQuery" class="text-amber-400/90 font-mono">
            {{ t('gallery.matching', { query: searchQuery }) }}
          </span>
        </div>

        <button
          v-if="selectedCategory !== 'all' || searchQuery"
          type="button"
          class="text-xs text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4"
          @click="resetFilters"
        >
          {{ t('gallery.resetFilters') }}
        </button>
      </div>

      <!-- Fluid Responsive Grid -->
      <div
        v-if="filteredItems.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        <GalleryCard
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          :r2-base-url="r2BaseUrl"
          @click="openLightbox"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-20 px-4 rounded-3xl border border-zinc-900 bg-zinc-900/30 max-w-lg mx-auto space-y-4"
      >
        <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-base font-semibold text-zinc-200">{{ t('gallery.noPhotosFound') }}</h3>
        <p class="text-sm text-zinc-400">
          {{ t('gallery.noPhotosDescription', { query: searchQuery }) }}
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
          @click="resetFilters"
        >
          {{ t('gallery.clearFilters') }}
        </button>
      </div>
    </main>

    <!-- Interactive Lightbox Modal -->
    <LightboxModal
      :item="activeItem"
      :current-index="activeIndex ?? 0"
      :total-count="filteredItems.length"
      :r2-base-url="r2BaseUrl"
      @close="closeLightbox"
      @prev="prevItem"
      @next="nextItem"
    />

    <!-- Footer -->
    <GalleryFooter />
  </div>
</template>
