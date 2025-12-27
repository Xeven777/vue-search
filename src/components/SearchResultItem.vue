<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

interface Props {
  result: {
    id: number
    title: string
    snippet: string
    description: string
    metadata?: string
    url?: string
    author?: string
    points?: number
    created_at?: string
  }
}

defineProps<Props>()

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const formatDate = (iso?: string) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}
</script>

<template>
  <Card
    class="group hover:border-primary mb-4 overflow-hidden"
    :class="{ 'ring-2 ring-primary/20': isExpanded }"
    @click="toggleExpand"
  >
    <CardHeader class="pb-2">
      <div class="flex items-start justify-between gap-4">
        <div class="space-y-1">
          <CardTitle
            class="text-xl line-clamp-2 font-semibold group-hover:text-primary transition-colors"
          >
            {{ result.title }}
          </CardTitle>
          <CardDescription class="text-base line-clamp-2" v-if="!isExpanded">
            {{ result.snippet }}
          </CardDescription>
          <div class="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span v-if="result.author">By {{ result.author }}</span>
            <span v-if="result.created_at">• {{ formatDate(result.created_at) }}</span>
          </div>
        </div>
        <div class="mt-1">
          <ChevronDown v-if="!isExpanded" class="size-5 text-muted-foreground" />
          <ChevronUp v-else class="size-5 text-primary" />
        </div>
      </div>
    </CardHeader>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2 max-h-0"
      enter-to-class="opacity-100 translate-y-0 max-h-125"
      leave-from-class="opacity-100 translate-y-0 max-h-125"
      leave-to-class="opacity-0 -translate-y-2 max-h-0"
    >
      <CardContent v-if="isExpanded" class="pt-0 pb-6">
        <div class="space-y-4">
          <p class="text-muted-foreground leading-relaxed">
            {{ result.description }}
          </p>
          <div
            v-if="result.metadata"
            class="pt-4 border-t border-muted flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wider"
          >
            <span>{{ result.metadata }}</span>
          </div>
        </div>
      </CardContent>
    </Transition>
  </Card>
</template>
