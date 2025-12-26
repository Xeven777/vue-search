<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-vue-next'

interface Props {
  placeholder?: string
  debounceMs?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search for results...',
  debounceMs: 500,
})

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const query = ref('')
let timeout: ReturnType<typeof setTimeout> | null = null

watch(query, (newQuery) => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    emit('search', newQuery)
  }, props.debounceMs)
})
</script>

<template>
  <div class="relative w-full max-w-2xl mx-auto">
    <div class="relative">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        v-model="query"
        :placeholder="placeholder"
        class="pl-10 pr-10 h-12 text-lg shadow-sm border-2 focus-visible:ring-primary transition-all duration-200"
      />
      <button
        v-if="query"
        @click="query = ''"
        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
      >
        <X class="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  </div>
</template>
