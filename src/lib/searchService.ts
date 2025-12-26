export interface SearchResult {
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

export const searchResults = async (
  query: string,
  options?: { mode?: 'relevance' | 'date'; hitsPerPage?: number; page?: number },
): Promise<SearchResult[]> => {
  if (!query.trim()) return []

  const { mode = 'relevance', hitsPerPage = 20, page = 0 } = options || {}

  const endpoint = mode === 'date' ? 'search_by_date' : 'search'
  const url = `https://hn.algolia.com/api/v1/${endpoint}?query=${encodeURIComponent(
    query,
  )}&tags=story&hitsPerPage=${hitsPerPage}&page=${page}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    interface AlgoliaHit {
      objectID?: string
      title?: string
      story_title?: string
      story_text?: string
      comment_text?: string
      url?: string
      story_url?: string
      author?: string
      points?: number
      created_at?: string
      _highlightResult?: Record<string, unknown>
    }

    const hits: AlgoliaHit[] = Array.isArray(data.hits) ? data.hits : []

    const stripHtml = (s: string | undefined) => (s ? s.replace(/<[^>]+>/g, '') : '')

    return hits.slice(0, hitsPerPage).map((hit: AlgoliaHit, idx: number) => {
      const numericId = Number(hit.objectID) || Date.now() + idx
      const title = hit.title || hit.story_title || '(no title)'
      const storyText = stripHtml(hit.story_text || hit.comment_text || '')
      const urlField = hit.url || hit.story_url || ''
      const snippet = storyText
        ? storyText.substring(0, 120) + (storyText.length > 120 ? '...' : '')
        : urlField
      const description = storyText || (urlField ? `URL: ${urlField}` : '')
      const metadata = `Author: ${hit.author || 'unknown'} • Points: ${
        hit.points ?? 0
      } • ${hit.created_at ? new Date(hit.created_at).toLocaleString() : ''}`

      return {
        id: numericId,
        title: title.charAt(0).toUpperCase() + title.slice(1),
        snippet,
        description,
        metadata,
        url: urlField,
        author: hit.author,
        points: hit.points,
        created_at: hit.created_at,
      } as SearchResult
    })
  } catch (error) {
    console.error('Search API error:', error)
    return []
  }
}
