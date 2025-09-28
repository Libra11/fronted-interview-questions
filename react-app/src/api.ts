import type { IndexData } from './types'

const BASE = (import.meta as any).env?.BASE_URL || '/'
const u = (p: string) => `${BASE.replace(/\/$/, '/')}${p.replace(/^\//, '')}`

export async function fetchIndex(): Promise<IndexData> {
  const res = await fetch(u('data/index.json'))
  if (!res.ok) throw new Error('无法加载索引')
  const json = await res.json()
  return json
}

export async function fetchDetailHtml(slug: string): Promise<{ title: string, contentHtml: string, metaHtml: string, backLink: string }>{
  const res = await fetch(u(`q/${encodeURIComponent(slug)}.html`))
  if (!res.ok) throw new Error('无法加载题目详情')
  const html = await res.text()
  // naive extract
  const title = (html.match(/<h1>(.*?)<\/h1>/)?.[1] ?? '').replace(/<[^>]+>/g, '')
  const articleMatch = html.match(/<article class=\"content[^\"]*\">([\s\S]*?)<\/article>/)
  const contentHtml = articleMatch ? articleMatch[1] : ''
  const metaMatch = html.match(/<div class=\"meta\">([\s\S]*?)<\/div>/)
  const metaHtml = metaMatch ? metaMatch[1] : ''
  return { title, contentHtml, metaHtml, backLink: '#/' }
}

export async function fetchDetailMd(slug: string): Promise<string> {
  const res = await fetch(u(`md/${encodeURIComponent(slug)}.md`))
  if (!res.ok) throw new Error('无法加载 Markdown')
  return await res.text()
}
