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
  }
}

defineProps<Props>()

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <Card
    class="group cursor-pointer hover:shadow-md transition-all duration-300 border-muted-foreground/10 mb-4 overflow-hidden"
    :class="{ 'ring-2 ring-primary/20': isExpanded }"
    @click="toggleExpand"
  >
    <CardHeader class="pb-2">
      <div class="flex items-start justify-between gap-4">
        <div class="space-y-1">
          <CardTitle class="text-xl font-semibold group-hover:text-primary transition-colors">
            {{ result.title }}
          </CardTitle>
          <CardDescription class="text-base line-clamp-2" v-if="!isExpanded">
            {{ result.snippet }}
          </CardDescription>
        </div>
        <div class="mt-1">
          <ChevronDown v-if="!isExpanded" class="h-5 w-5 text-muted-foreground" />
          <ChevronUp v-else class="h-5 w-5 text-primary" />
        </div>
      </div>
    </CardHeader>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2 max-h-0"
      enter-to-class="opacity-100 translate-y-0 max-h-[500px]"
      leave-from-class="opacity-100 translate-y-0 max-h-[500px]"
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
