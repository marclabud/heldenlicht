<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { GalleryItem } from '~/types/gallery'
import { resolveImageUrl, getPlaceholderImageSvg } from '~/utils/gallery'

const props = defineProps<{
  item: GalleryItem | null
  currentIndex: number
  totalCount: number
  r2BaseUrl?: string
}>()

const emit = defineEmits<{
  close: []
  prev: []
  next: []
}>()

const { t } = useI18n()

const imageStage = ref<'primary' | 'local' | 'placeholder'>('primary')
const touchStartX = ref(0)
const touchEndX = ref(0)

// Reset image stage whenever current item changes
watch(() => props.item?.id, () => {
  imageStage.value = 'primary'
})

const currentSrc = computed(() => {
  if (!props.item) return ''
  if (imageStage.value === 'placeholder') {
    return getPlaceholderImageSvg(props.item)
  }
  if (imageStage.value === 'local') {
    return props.item.src
  }
  return resolveImageUrl(props.item.src, props.r2BaseUrl)
})

const onImageError = () => {
  if (imageStage.value === 'primary' && props.r2BaseUrl && props.item?.src.startsWith('/')) {
    imageStage.value = 'local'
  } else {
    imageStage.value = 'placeholder'
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.item) return

  switch (e.key) {
    case 'Escape':
      emit('close')
      break
    case 'ArrowLeft':
      emit('prev')
      break
    case 'ArrowRight':
      emit('next')
      break
  }
}

// Mobile swipe handling
const onTouchStart = (e: TouchEvent) => {
  const touch = e.changedTouches[0]
  if (touch) {
    touchStartX.value = touch.screenX
  }
}

const onTouchEnd = (e: TouchEvent) => {
  const touch = e.changedTouches[0]
  if (touch) {
    touchEndX.value = touch.screenX
    handleSwipe()
  }
}

const handleSwipe = () => {
  const diff = touchEndX.value - touchStartX.value
  const threshold = 50
  if (diff > threshold) {
    emit('prev')
  } else if (diff < -threshold) {
    emit('next')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  // Prevent body scrolling while modal is open
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="item"
        class="fixed inset-0 z-50 flex flex-col justify-between backdrop-blur-md bg-black/90 p-4 sm:p-6 select-none overflow-y-auto"
        role="dialog"
        aria-modal="true"
        :aria-label="item.title"
        @click.self="emit('close')"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <!-- Top Toolbar -->
        <div class="flex items-center justify-between gap-4 w-full max-w-7xl mx-auto z-20">
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-3 py-1 rounded-full">
              {{ t('lightbox.counter', { current: currentIndex + 1, total: totalCount }) }}
            </span>
            <span class="hidden sm:inline-block text-xs uppercase tracking-wider text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
              {{ t(`categories.${item.category}`) }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <!-- Open original CDN link -->
            <a
              :href="resolveImageUrl(item.src, r2BaseUrl)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-colors"
              :title="t('lightbox.fullResTitle')"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span class="hidden md:inline">{{ t('lightbox.fullRes') }}</span>
            </a>

            <!-- Close button -->
            <button
              type="button"
              class="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
              :aria-label="t('lightbox.close')"
              @click="emit('close')"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Center Stage: Navigation & High-Res Image -->
        <div class="relative flex-1 flex items-center justify-center my-4 sm:my-6 w-full max-w-7xl mx-auto min-h-0">
          <!-- Previous Button -->
          <button
            type="button"
            class="absolute left-2 sm:left-4 z-20 p-3 sm:p-3.5 rounded-full text-zinc-300 hover:text-white bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-800 shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500"
            :aria-label="t('lightbox.prev')"
            @click.stop="emit('prev')"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Main High Resolution Render -->
          <div class="relative max-h-[72vh] sm:max-h-[78vh] flex items-center justify-center">
            <img
              :src="currentSrc"
              :alt="item.title"
              class="max-h-[72vh] sm:max-h-[78vh] max-w-[86vw] sm:max-w-[80vw] object-contain rounded-xl shadow-2xl border border-zinc-800/80 transition-all duration-300"
              @error="onImageError"
            >
          </div>

          <!-- Next Button -->
          <button
            type="button"
            class="absolute right-2 sm:right-4 z-20 p-3 sm:p-3.5 rounded-full text-zinc-300 hover:text-white bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-800 shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500"
            :aria-label="t('lightbox.next')"
            @click.stop="emit('next')"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Bottom Caption Area -->
        <div class="w-full max-w-4xl mx-auto bg-zinc-950/90 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md z-20 text-center sm:text-left space-y-2">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 class="text-lg sm:text-xl font-bold text-zinc-100">
                {{ item.title }}
              </h2>
              <div v-if="item.character || item.cosplayer" class="text-sm text-amber-400 font-medium">
                <span v-if="item.character" class="text-zinc-200">{{ item.character }}</span>
                <span v-if="item.character && item.cosplayer" class="text-zinc-500"> • </span>
                <span v-if="item.cosplayer">{{ item.cosplayer }}</span>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap items-center justify-center sm:justify-end gap-1.5">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Metadata row -->
          <div class="flex flex-wrap items-center justify-center sm:justify-between gap-y-1 text-xs text-zinc-500 pt-2 border-t border-zinc-800/80">
            <div class="flex items-center gap-2">
              <span>{{ t('lightbox.photoBy') }} <strong class="text-zinc-300 font-normal">{{ item.photographer }}</strong></span>
              <span class="text-zinc-700">•</span>
              <span>{{ item.location || t('lightbox.bernexpo') }}</span>
              <span class="text-zinc-700">•</span>
              <span>{{ item.date }}</span>
            </div>

            <div v-if="item.cameraInfo" class="font-mono text-[11px] text-zinc-400">
              {{ item.cameraInfo }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
