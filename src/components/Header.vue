<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'
import { Github, SearchIcon, Sun, Moon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const mode = useColorMode()
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-lg">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
          <SearchIcon class="h-5 w-5 text-primary-foreground" />
        </div>
        <span class="text-xl font-bold tracking-tight">VueSearch</span>
      </div>
      <div class="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          class="rounded-full"
          @click="mode = mode === 'dark' ? 'light' : 'dark'"
        >
          <Sun class="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon
            class="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>

        <a
          href="https://github.com/Xeven777/vue-search"
          target="_blank"
          class="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <Github class="size-5" />
        </a>
      </div>
    </div>
  </header>
</template>
