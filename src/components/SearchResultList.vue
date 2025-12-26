<script setup lang="ts">
import SearchResultItem from './SearchResultItem.vue'

interface Props {
  results: Array<{
    id: number
    title: string
    snippet: string
    description: string
    metadata?: string
  }>
  isLoading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="w-full max-w-2xl mx-auto py-8">
    <div v-if="results.length > 0" class="space-y-4">
      <TransitionGroup
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
      >
        <SearchResultItem v-for="result in results" :key="result.id" :result="result" />
      </TransitionGroup>
    </div>

    <div
      v-else-if="!isLoading"
      class="text-center py-12 px-4 rounded-xl border-2 border-dashed border-muted bg-muted/30"
    >
      <p class="text-muted-foreground text-lg">
        No results found. Try searching for something else!
      </p>
    </div>
  </div>
</template>
