<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { GalleryItem } from '~/types/gallery'
import { resolveImageUrl, getPlaceholderImageSvg } from '~/utils/gallery'

const props = defineProps<{
  item: GalleryItem
  r2BaseUrl?: string
}>()

const emit = defineEmits<{
  click: [item: GalleryItem]
}>()

const { t } = useI18n()

const isLoaded = ref(false)
const imageStage = ref<'primary' | 'local' | 'placeholder'>('primary')

watch(() => props.item.id, () => {
  imageStage.value = 'primary'
  isLoaded.value = false
})

const primarySrc = computed(() => {
  if (imageStage.value === 'placeholder') {
    return getPlaceholderImageSvg(props.item)
  }
  if (imageStage.value === 'local') {
    return props.item.src
  }
  return resolveImageUrl(props.item.src, props.r2BaseUrl)
})

const onError = () => {
  // If remote CDN failed, attempt to load local file from public/
  if (imageStage.value === 'primary' && props.r2BaseUrl && props.item.src.startsWith('/')) {
    imageStage.value = 'local'
  } else {
    imageStage.value = 'placeholder'
    isLoaded.value = true
  }
}

const onLoad = () => {
  isLoaded.value = true
}

const aspectClass = computed(() => {
  switch (props.item.aspectRatio) {
    case 'square':
      return 'aspect-square'
    case 'landscape':
      return 'aspect-[16/10]'
    case 'portrait':
    default:
      return 'aspect-[4/5]'
  }
})
</script>

<template>
  <div
    class="group relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/60 transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    :class="aspectClass"
    role="button"
    tabindex="0"
    :aria-label="`Open ${item.title} photography view`"
    @click="emit('click', item)"
    @keydown.enter.prevent="emit('click', item)"
    @keydown.space.prevent="emit('click', item)"
  >
    <!-- Skeleton loader blur while loading -->
    <div
      v-if="!isLoaded"
      class="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center text-zinc-700"
    >
      <svg class="w-8 h-8 animate-spin text-zinc-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>

    <!-- Image asset -->
    <img
      :src="primarySrc"
      :alt="item.title"
      loading="lazy"
      decoding="async"
      class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      :class="{ 'opacity-0': !isLoaded, 'opacity-100': isLoaded }"
      @load="onLoad"
      @error="onError"
    >

    <!-- Top floating pill: Category and Highlight badge -->
    <div class="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-zinc-950/70 border border-zinc-800/60 text-zinc-300 backdrop-blur-md">
        {{ t(`categories.${item.category}`) }}
      </span>

      <span
        v-if="item.highlight"
        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-500/20 border border-amber-500/40 text-amber-300 backdrop-blur-md"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
        {{ t('gallery.featured') }}
      </span>
    </div>

    <!-- Hover Gradient Overlay revealing title and metadata -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 pointer-events-none z-10"
    >
      <div class="space-y-1.5 transform transition-transform duration-300 translate-y-0 sm:translate-y-2 group-hover:translate-y-0">
        <h3 class="text-base sm:text-lg font-bold text-zinc-100 leading-snug line-clamp-1 drop-shadow-md">
          {{ item.title }}
        </h3>

        <div v-if="item.cosplayer || item.character" class="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
          <span v-if="item.character" class="text-zinc-200">{{ item.character }}</span>
          <span v-if="item.character && item.cosplayer" class="text-zinc-500">•</span>
          <span v-if="item.cosplayer" class="text-amber-400/90">{{ item.cosplayer }}</span>
        </div>

        <div class="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/60">
          <span class="truncate">{{ item.location || 'Bernexpo' }}</span>
          <span class="font-mono text-zinc-500 shrink-0">{{ item.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
