import React, { useEffect, useMemo, useState } from 'react'
import type { QuestionItem } from '../types'
import { fetchIndex } from '../api'
import { getQuestionState } from '../storage'

type State = {
  q: string
  category: string
  page: number
}

const PAGE_SIZE = 24

export default function Home() {
  const [items, setItems] = useState<QuestionItem[]>([])
  const [state, setState] = useState<State>(() => ({ q: '', category: '全部', page: 1 }))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchIndex()
      .then((data) => {
        if (!mounted) return
        setItems(data)
        setLoading(false)
      })
      .catch((e) => {
        setError(String(e))
        setLoading(false)
      })
    return () => { mounted = false }
  }, [])

  const categories = useMemo(() => {
    const map = new Map<string, number>()
    for (const it of items) map.set(it.category || '未分类', (map.get(it.category || '未分类') || 0) + 1)
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1])
  }, [items])

  const filtered = useMemo(() => {
    const lower = state.q.trim().toLowerCase()
    let list = items
    if (state.category !== '全部') list = list.filter((it) => (it.category || '未分类') === state.category)
    if (lower) {
      list = list.filter((it) =>
        it.title.toLowerCase().includes(lower) ||
        it.category.toLowerCase().includes(lower) ||
        (it.labels || []).join(',').toLowerCase().includes(lower) ||
        (it.id || '').toLowerCase().includes(lower)
      )
    }
    return list
  }, [items, state])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const start = (state.page - 1) * PAGE_SIZE
  const pageItems = filtered.slice(start, start + PAGE_SIZE)

  function highlight(text: string, q: string) {
    if (!q) return text
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig')
    return text.replace(re, (m) => `<mark>${m}</mark>`)
  }

  function goto(slug: string) {
    location.hash = `#/q/${encodeURIComponent(slug)}`
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>前端面试题 · 高效刷题</h1>
          <p>覆盖公司与专题分类，支持搜索、筛选与快速跳转原始问题。</p>
          <div className="search-bar">
            <input
              id="search-input"
              type="search"
              placeholder="搜索题目、标签、编号..."
              value={state.q}
              onChange={(e) => { const q = e.currentTarget.value; setState(s => ({ ...s, q, page: 1 })); }}
            />
          </div>
          <div className="quick-filters">
            {categories.slice(0, 8).map(([name]) => (
              <button key={name} className="chip" onClick={() => setState(s => ({ ...s, category: name, page: 1 }))}>{name}</button>
            ))}
          </div>
        </div>
      </section>

      <main className="container layout">
        <aside className="sidebar">
          <h2 id="categories">分类</h2>
          <div className="category-list">
            <div className={`category-item${state.category==='全部'?' active':''}`} onClick={() => setState(s=>({ ...s, category: '全部', page: 1 }))}>
              <span>全部</span>
              <span className="label">{items.length}</span>
            </div>
            {categories.map(([name, count]) => (
              <div key={name} className={`category-item${state.category===name?' active':''}`} onClick={() => setState(s=>({ ...s, category: name, page: 1 }))}>
                <span>{name}</span>
                <span className="label">{count}</span>
              </div>
            ))}
          </div>
        </aside>
        <section className="results">
          {loading ? (
            <div className="stats">加载中…</div>
          ) : error ? (
            <div className="stats">加载失败：{error}</div>
          ) : (
            <>
              <div className="stats">共 {filtered.length} 题 · 当前分类：{state.category} · 关键词：{state.q || '无'}</div>
              <div id="cards" className="cards">
                {pageItems.map((it) => {
                  const slug = it.page.replace(/^q\//, '').replace(/\.html$/, '')
                  const qState = getQuestionState(slug)
                  return (
                    <div key={it.page} className="card">
                      <div className="card-header">
                        <h3 className="title" dangerouslySetInnerHTML={{ __html: highlight(it.title, state.q) }} />
                        <div className="card-indicators">
                          {qState.favorited && <span className="indicator favorited" title="已收藏">★</span>}
                          {qState.status === 'completed' && <span className="indicator completed" title="已完成">✓</span>}
                          {qState.status === 'reviewing' && <span className="indicator reviewing" title="需要复习">⟳</span>}
                        </div>
                      </div>
                      <div className="meta-row">
                        <span className="badge">{it.category || '未分类'}</span>
                        {(it.labels || []).slice(0, 3).map(l => <span key={l} className="label">{l}</span>)}
                      </div>
                      <div className="excerpt">{(it.excerpt || '').slice(0, 120)}{(it.excerpt || '').length > 120 ? '…' : ''}</div>
                      <div className="actions">
                        <button className="btn primary" onClick={() => goto(slug)}>查看</button>
                        {it.url ? <a className="btn ghost" target="_blank" rel="noreferrer" href={it.url}>原始链接</a> : null}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="pagination">
                <button className="page-btn" disabled={state.page<=1} onClick={()=> setState(s=>({ ...s, page: Math.max(1, s.page-1) }))}>上一页</button>
                <span style={{ color: '#9aa3b2' }}>第 {state.page} / {pages} 页</span>
                <button className="page-btn" disabled={state.page>=pages} onClick={()=> setState(s=>({ ...s, page: Math.min(pages, s.page+1) }))}>下一页</button>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  )
}
