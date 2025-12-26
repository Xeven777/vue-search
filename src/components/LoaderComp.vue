<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="w-full max-w-2xl mx-auto py-8 space-y-4">
    <div v-for="i in 3" :key="i" class="p-6 rounded-xl border-2 border-muted bg-card">
      <div class="space-y-3">
        <Skeleton class="h-6 w-3/4" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-5/6" />
      </div>
    </div>
  </div>
</template>
