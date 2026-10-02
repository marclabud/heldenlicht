<script setup lang="ts">
const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-20 border-t border-zinc-900 bg-zinc-950/80 text-zinc-500 text-xs py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
      <div class="space-y-1.5">
        <div class="flex items-center justify-center md:justify-start gap-2 font-bold tracking-widest text-zinc-300 uppercase">
          <span class="w-2 h-2 rounded-full bg-amber-400" />
          <span>{{ t('footer.title') }}</span>
        </div>
        <p class="text-zinc-500 max-w-sm">
          {{ t('footer.description') }}
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-6 text-zinc-400">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span class="text-zinc-400">{{ t('footer.cloudflarePages') }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span class="text-zinc-400">{{ t('footer.cloudflareR2') }}</span>
        </div>
      </div>

      <div class="text-zinc-600 font-mono text-[11px]">
        {{ t('footer.copyright', { year: currentYear }) }}
      </div>
    </div>
  </footer>
</template>
