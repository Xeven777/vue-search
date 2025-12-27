export interface SearchResult {
  id: number
  title: string
  snippet: string
  description: string
  tags?: string[]
  metadata?: string
  url?: string
  author?: string
  points?: number
  created_at?: string
}

interface HighlightResultField {
  value: string
  matchLevel: 'none' | 'partial' | 'full'
  matchedWords: string[]
  fullyHighlighted?: boolean
}

interface AlgoliaHit {
  objectID: string
  title: string
  url: string
  author: string
  points: number
  created_at: string
  created_at_i: number
  num_comments: number
  story_id: number
  updated_at: string
  _tags: string[]
  children: number[]
  _highlightResult: {
    author: HighlightResultField
    title: HighlightResultField & { fullyHighlighted: boolean }
    url: HighlightResultField
  }
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

    const hits: AlgoliaHit[] = Array.isArray(data.hits) ? data.hits : []

    return hits.map((hit: AlgoliaHit, idx: number): SearchResult => {
      const date = new Date(hit.created_at)

      return {
        id: Number(hit.objectID) || Date.now() + idx,
        title: hit.title.charAt(0).toUpperCase() + hit.title.slice(1),
        snippet: hit.url,
        description: hit.url,
        tags: hit._tags,
        metadata: `Author: ${hit.author} • Points: ${hit.points} • Comments: ${hit.num_comments} • ${date.toLocaleString()}`,
        url: hit.url,
        author: hit.author,
        points: hit.points,
        created_at: hit.created_at,
      }
    })
  } catch (error) {
    console.error('Search API error:', error)
    return []
  }
}
