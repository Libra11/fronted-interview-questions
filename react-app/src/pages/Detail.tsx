import React, { useEffect, useMemo, useRef, useState } from 'react'
import { fetchDetailMd, fetchIndex } from '../api'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import hljs from 'highlight.js'
import type { QuestionItem } from '../types'
import { getQuestionState, toggleFavorite, setQuestionStatus, type QuestionStatus } from '../storage'

export default function Detail({ slug }: { slug: string }) {
  const [title, setTitle] = useState('题目详情')
  const [category, setCategory] = useState<string>('')
  const [labels, setLabels] = useState<string[]>([])
  const [md, setMd] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const usedIdsRef = useRef<Record<string, number>>({})
  const [copiedMd, setCopiedMd] = useState(false)
  const [prevQuestion, setPrevQuestion] = useState<QuestionItem | null>(null)
  const [nextQuestion, setNextQuestion] = useState<QuestionItem | null>(null)
  const [favorited, setFavorited] = useState(false)
  const [status, setStatus] = useState<QuestionStatus>(null)

  useEffect(() => {
    let mounted = true
    // 加载收藏和学习状态
    const state = getQuestionState(slug)
    setFavorited(state.favorited)
    setStatus(state.status)

    // 获取元数据
    fetchIndex().then(items => {
      if (!mounted) return
      const page = `q/${slug}.html`
      const currentIndex = items.findIndex(x => x.page === page)
      if (currentIndex === -1) return

      const current = items[currentIndex]
      setTitle(current.title)
      setCategory(current.category)
      setLabels(current.labels || [])

      // 找到同分类的所有题目
      const sameCategoryItems = items.filter(x => x.category === current.category)
      const currentIndexInCategory = sameCategoryItems.findIndex(x => x.page === page)

      // 设置上一题和下一题
      if (currentIndexInCategory > 0) {
        setPrevQuestion(sameCategoryItems[currentIndexInCategory - 1])
      } else {
        setPrevQuestion(null)
      }

      if (currentIndexInCategory < sameCategoryItems.length - 1) {
        setNextQuestion(sameCategoryItems[currentIndexInCategory + 1])
      } else {
        setNextQuestion(null)
      }
    })
    // 获取 Markdown 正文
    fetchDetailMd(slug)
      .then(text => { if (mounted) setMd(text) })
      .catch(e => setErr(String(e)))
    return () => { mounted = false }
  }, [slug])

  function handleToggleFavorite() {
    const newFavorited = toggleFavorite(slug)
    setFavorited(newFavorited)
  }

  function handleSetStatus(newStatus: QuestionStatus) {
    setQuestionStatus(slug, newStatus)
    setStatus(newStatus)
  }

  const subtitle = useMemo(() => [category, ...(labels||[])].filter(Boolean).join(' · '), [category, labels])
  const mdRender = useMemo(() => md.replace(/^\s*#\s+.+\n+/, ''), [md])

  // build toc from markdown (strip code fences, then collect headings)
  const toc = useMemo(() => {
    const text = md.replace(/```[\s\S]*?```/g, '')
    const lines = text.split(/\r?\n/)
    const list: { depth: number, text: string, id: string }[] = []
    const used: Record<string, number> = {}
    for (const line of lines) {
      const m = line.match(/^(#{1,6})\s+(.+?)\s*$/)
      if (!m) continue
      const depth = m[1].length
      if (depth === 1) continue // skip h1 in toc
      const raw = m[2].trim()
      let id = slugify(raw)
      if (used[id]) { used[id]++; id = `${id}-${used[id]}` } else { used[id] = 1 }
      list.push({ depth, text: raw, id })
    }
    return list
  }, [md])

  function slugify(input: string) {
    return input
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
  }

  function assignId(base: string) {
    const used = usedIdsRef.current
    let id = slugify(base)
    if (!used[id]) { used[id] = 1; return id }
    used[id]++
    return `${id}-${used[id]}`
  }

  function CodeBlock({ className, children }: { className?: string, children?: any }) {
    const [copied, setCopied] = useState(false)
    const code = String(children ?? '')
    const lang = (className || '').replace(/^language-/, '')
    const hasLang = !!lang
    const highlighted = hasLang
      ? hljs.highlight(code, { language: lang }).value
      : hljs.highlightAuto(code).value
    const lines = code.replace(/\n$/, '').split('\n')
    const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1)
    function copy() {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      }).catch(() => {})
    }
    return (
      <div className="code-block">
        <button className="code-copy-btn" onClick={copy}>{copied ? '已复制' : '复制'}</button>
        <div className="code-inner">
          <div className="code-gutter" aria-hidden>
            {lineNumbers.map(n => <div key={n}>{n}</div>)}
          </div>
          <pre className="code-pre"><code className={className} dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
        </div>
      </div>
    )
  }

  useEffect(() => { usedIdsRef.current = {} }, [md])

  function mdNodeText(node: any): string {
    if (!node) return ''
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(mdNodeText).join('')
    if (node.type === 'text' || node.type === 'inlineCode') return String(node.value || '')
    if (node.children) return node.children.map(mdNodeText).join('')
    return ''
  }

  function Heading(props: any) {
    const { level, node } = props
    const text = mdNodeText(node)
    const id = assignId(text)
    const Tag = (`h${level}` as any)
    return <Tag id={id}>{props.children}</Tag>
  }

  function copyText(text: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text)
    }
    return new Promise<void>((resolve) => {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      try { document.execCommand('copy') } catch {}
      document.body.removeChild(ta)
      resolve()
    })
  }

  async function copyMarkdown() {
    const text = mdRender || md
    if (!text) return
    try {
      await copyText(text)
      setCopiedMd(true)
      setTimeout(() => setCopiedMd(false), 1200)
    } catch {}
  }

  function getQuestionSlug(item: QuestionItem): string {
    return item.page.replace(/^q\//, '').replace(/\.html$/, '')
  }

  return (
    <main className="container article">
      <div className="article-head">
        <a className="back" href="#/">← 返回列表</a>
        <h1>{title}</h1>
        <div className="article-subline">
          <div className="subtitle">{subtitle}</div>
          <div className="article-tools">
            <button
              className={`btn icon-btn ${favorited ? 'favorited' : ''}`}
              onClick={handleToggleFavorite}
              title={favorited ? '取消收藏' : '收藏'}
            >
              {favorited ? '★' : '☆'}
            </button>
            <div className="status-buttons">
              <button
                className={`btn status-btn ${status === 'completed' ? 'active' : ''}`}
                onClick={() => handleSetStatus(status === 'completed' ? null : 'completed')}
              >
                {status === 'completed' ? '✓ 已完成' : '标记完成'}
              </button>
              <button
                className={`btn status-btn ${status === 'reviewing' ? 'active' : ''}`}
                onClick={() => handleSetStatus(status === 'reviewing' ? null : 'reviewing')}
              >
                {status === 'reviewing' ? '⟳ 复习中' : '需要复习'}
              </button>
            </div>
            <button className="btn ghost" disabled={!md} onClick={copyMarkdown}>
              {copiedMd ? '已复制 Markdown' : '复制 Markdown'}
            </button>
          </div>
        </div>
      </div>
      {(prevQuestion || nextQuestion) && (
        <div className="question-nav">
          {prevQuestion ? (
            <a className="btn nav-btn prev" href={`#/q/${getQuestionSlug(prevQuestion)}`}>
              ← 上一题: {prevQuestion.title}
            </a>
          ) : (
            <div></div>
          )}
          {nextQuestion ? (
            <a className="btn nav-btn next" href={`#/q/${getQuestionSlug(nextQuestion)}`}>
              下一题: {nextQuestion.title} →
            </a>
          ) : (
            <div></div>
          )}
        </div>
      )}
      {err ? (
        <div className="stats">加载失败：{err}</div>
      ) : (
        <>
          {toc.length > 0 && (
            <details className="toc-panel" open>
              <summary className="toc-title">目录</summary>
              <div className="toc-items">
                {toc.map(({ depth, text, id }) => (
                  <div key={id} className={`toc-item depth-${depth}`}>
                    <button
                      className="toc-link"
                      onClick={() => {
                        const el = document.getElementById(id)
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                    >
                      {text}
                    </button>
                  </div>
                ))}
              </div>
            </details>
          )}
          <article className="content markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                pre: (props: any) => {
                  const child = React.Children.toArray(props.children)[0] as any
                  const className: string = child?.props?.className || ''
                  const lang = (className || '').replace(/^language-/, '')
                  const childText = mdNodeText(child?.props?.children)
                  const isOneLine = childText && !/\n/.test(childText)
                  const isShort = (childText || '').length <= 60
                  const noLang = !lang
                  if (isOneLine && isShort && noLang) {
                    return <code className="inline-code">{childText}</code>
                  }
                  return <CodeBlock className={className} children={childText} />
                },
                h1: ({ children }) => <Heading level={1}>{children}</Heading>,
                h2: ({ children }) => <Heading level={2}>{children}</Heading>,
                h3: ({ children }) => <Heading level={3}>{children}</Heading>,
                h4: ({ children }) => <Heading level={4}>{children}</Heading>,
                h5: ({ children }) => <Heading level={5}>{children}</Heading>,
                h6: ({ children }) => <Heading level={6}>{children}</Heading>,
              }}
            >
              {mdRender}
            </ReactMarkdown>
          </article>
        </>
      )}
    </main>
  )
}
