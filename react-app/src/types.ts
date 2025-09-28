export type QuestionItem = {
  id: string
  title: string
  category: string
  labels: string[]
  url: string
  page: string // q/<slug>.html
  excerpt: string
}

export type IndexData = QuestionItem[]

