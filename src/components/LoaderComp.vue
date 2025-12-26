<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div
    class="w-full max-w-6xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-60"
  >
    <div v-for="i in 6" :key="i" class="p-6 rounded-xl border-2 border-muted bg-card">
      <div class="space-y-3">
        <Skeleton class="h-6 w-3/4" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-5/6" />
      </div>
    </div>
  </div>
</template>
