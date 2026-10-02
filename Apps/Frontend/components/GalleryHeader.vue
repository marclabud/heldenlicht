<script setup lang="ts">
import type { GalleryCategory } from '~/types/gallery'

const props = defineProps<{
  categories: { key: GalleryCategory; count: number }[]
  activeCategory: GalleryCategory
  searchQuery: string
  totalCount: number
}>()

const emit = defineEmits<{
  'update:activeCategory': [value: GalleryCategory]
  'update:searchQuery': [value: string]
}>()

const { t } = useI18n()
</script>

<template>
  <header class="relative pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950">
    <!-- Ambient ambient glow behind title -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-48 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-cyan-500/10 blur-3xl pointer-events-none -z-10" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top bar: Location, CDN status & Language Toggle -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div class="flex flex-wrap items-center gap-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 backdrop-blur-sm">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span class="font-medium tracking-wide">{{ t('header.location') }}</span>
            <span class="text-zinc-600">•</span>
            <span class="text-zinc-400">{{ t('header.locationDetail') }}</span>
          </div>

          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-400">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{{ t('header.cdnStatus') }}</span>
            <span class="text-zinc-600">/</span>
            <span class="text-zinc-300 font-mono text-[11px]">{{ t('header.photosCount', { count: totalCount }) }}</span>
          </div>
        </div>

        <!-- German / English Language Toggle -->
        <LanguageToggle />
      </div>

      <!-- Main Title & Hero Description -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-zinc-100 uppercase select-none hero-text-glow font-sans">
          {{ t('header.titlePart1') }}<span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">{{ t('header.titlePart2') }}</span>
        </h1>
        <p class="text-base sm:text-lg md:text-xl font-light text-zinc-400 tracking-wide">
          {{ t('header.subtitle') }}
        </p>
        <p class="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
          {{ t('header.heroDescription') }}
        </p>
      </div>

      <!-- Search & Filters Container -->
      <div class="mt-10 max-w-4xl mx-auto space-y-5">
        <!-- Search bar -->
        <div class="relative max-w-md mx-auto">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            :value="searchQuery"
            type="text"
            :placeholder="t('header.searchPlaceholder')"
            class="w-full pl-10 pr-10 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200"
            @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          >
          <button
            v-if="searchQuery"
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="Clear search"
            @click="emit('update:searchQuery', '')"
          >
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Category pills -->
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <button
            v-for="cat in props.categories"
            :key="cat.key"
            type="button"
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200"
            :class="[
              activeCategory === cat.key
                ? 'bg-amber-500 text-zinc-950 font-semibold shadow-md shadow-amber-500/20'
                : 'bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 border border-zinc-800/80'
            ]"
            @click="emit('update:activeCategory', cat.key)"
          >
            <span>{{ t(`categories.${cat.key}`) }}</span>
            <span
              class="px-1.5 py-0.5 rounded text-[10px]"
              :class="activeCategory === cat.key ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-500'"
            >
              {{ cat.count }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
