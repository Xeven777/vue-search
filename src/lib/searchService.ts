export interface SearchResult {
  id: number
  title: string
  snippet: string
  description: string
  metadata?: string
}

export const searchResults = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return []

  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 800))

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(query)}`,
    )
    const data = await response.json()

    interface Post {
      id: number
      title: string
      body: string
      userId: number
    }

    // Map JSONPlaceholder data to our SearchResult format
    return data.slice(0, 10).map((item: Post) => ({
      id: item.id,
      title: item.title.charAt(0).toUpperCase() + item.title.slice(1),
      snippet: item.body.substring(0, 120) + '...',
      description: item.body + ' ' + item.body, // Make it longer for the expanded view
      metadata: `User ID: ${item.userId} • Category: General`,
    }))
  } catch (error) {
    console.error('Search API error:', error)
    return []
  }
}
