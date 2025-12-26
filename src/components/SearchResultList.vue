<script setup lang="ts">
import SearchResultItem from './SearchResultItem.vue'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
  results: Array<{
    id: number
    title: string
    snippet: string
    description: string
    metadata?: string
    url?: string
    author?: string
    points?: number
    created_at?: string
  }>
  isLoading: boolean
  currentPage: number
  hitsPerPage: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  nextPage: []
  prevPage: []
}>()

const canGoPrev = () => props.currentPage > 0
const canGoNext = () => props.results.length === props.hitsPerPage
</script>

<template>
  <div class="w-full mx-auto py-8">
    <!-- Grid of 3 columns -->
    <div
      v-if="results.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
    >
      <TransitionGroup
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
      >
        <SearchResultItem v-for="result in results" :key="result.id" :result="result" />
      </TransitionGroup>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!isLoading"
      class="text-center py-12 px-4 rounded-xl border-2 border-dashed border-muted bg-muted/30"
    >
      <p class="text-muted-foreground text-lg">
        No results found. Try searching for something else!
      </p>
    </div>

    <!-- Pagination Controls -->
    <div v-if="results.length > 0" class="flex items-center justify-center gap-4 mt-8">
      <Button @click="emit('prevPage')" variant="outline" :disabled="!canGoPrev()">
        <ChevronLeft class="h-4 w-4" />
        Previous
      </Button>

      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground font-medium"> Page {{ currentPage + 1 }} </span>
      </div>

      <Button @click="emit('nextPage')" variant="outline" :disabled="!canGoNext()">
        Next
        <ChevronRight class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
