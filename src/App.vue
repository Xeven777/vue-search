<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import SearchResultList from './components/SearchResultList.vue'
import Loader from './components/LoaderComp.vue'
import { SearchIcon } from 'lucide-vue-next'
import Header from './components/Header.vue'
import { searchResults, type SearchResult } from './lib/searchService'

const results = ref<SearchResult[]>([])
const isLoading = ref(false)
const hasSearched = ref(false)

const handleSearch = async (query: string) => {
  if (!query.trim()) {
    results.value = []
    hasSearched.value = false
    return
  }

  isLoading.value = true
  hasSearched.value = true

  try {
    results.value = await searchResults(query)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
    <Header />
    <main class="container mx-auto px-4 py-12 md:py-24">
      <div class="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground">
          Search the
          <span class="bg-linear-to-br from-teal-600 to-primary bg-clip-text text-transparent"
            >Future.</span
          >
        </h1>
        <p class="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
          A minimalist, fast, and interactive search tool built with Vue 3 and modern web
          principles.
        </p>
      </div>

      <!-- Search Interface -->
      <div class="space-y-8">
        <SearchBar @search="handleSearch" />

        <div v-if="isLoading">
          <Loader />
        </div>

        <div v-else-if="hasSearched">
          <SearchResultList :results="results" :isLoading="isLoading" />
        </div>

        <div v-else class="max-w-2xl mx-auto text-center py-24 space-y-4">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <SearchIcon class="h-6 w-6 text-muted-foreground" />
          </div>
          <p class="text-muted-foreground">Start typing above to search for post results...</p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t py-12 bg-muted/30">
      <div class="container mx-auto px-4 text-center space-y-4">
        <p class="text-sm text-muted-foreground">
          Built with <span class="text-red-500 animate-pulse">❤️</span> by
          <a href="https://anish7.me" target="_blank" class="hover:underline hover:text-primary"
            >Anish</a
          >
          for Saras Finance
        </p>
        <div class="flex items-center justify-center gap-6">
          <span class="text-xs text-muted-foreground/60 uppercase font-mono">Vue 3</span>
          <span class="text-xs text-muted-foreground/60 uppercase font-mono">Tailwind CSS</span>
          <span class="text-xs text-muted-foreground/60 uppercase font-mono">Shadcn Vue</span>
        </div>
      </div>
    </footer>
  </div>
</template>
