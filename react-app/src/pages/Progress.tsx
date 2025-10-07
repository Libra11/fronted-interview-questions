import { useEffect, useState, useMemo } from 'react'
import { fetchIndex } from '../api'
import { getAllQuestionStates, getStatistics } from '../storage'
import type { QuestionItem } from '../types'

export default function Progress() {
  const [items, setItems] = useState<QuestionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'favorited' | 'completed' | 'reviewing'>('favorited')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchIndex()
      .then((data) => {
        if (!mounted) return
        setItems(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
    return () => { mounted = false }
  }, [])

  const stats = useMemo(() => getStatistics(), [])
  const questionStates = useMemo(() => getAllQuestionStates(), [])

  const filteredItems = useMemo(() => {
    const slugs = Object.keys(questionStates).filter(slug => {
      const state = questionStates[slug]
      if (activeTab === 'favorited') return state.favorited
      if (activeTab === 'completed') return state.status === 'completed'
      if (activeTab === 'reviewing') return state.status === 'reviewing'
      return false
    })

    return items.filter(it => {
      const slug = it.page.replace(/^q\//, '').replace(/\.html$/, '')
      return slugs.includes(slug)
    }).sort((a, b) => {
      const slugA = a.page.replace(/^q\//, '').replace(/\.html$/, '')
      const slugB = b.page.replace(/^q\//, '').replace(/\.html$/, '')
      const timeA = questionStates[slugA]?.lastVisited || 0
      const timeB = questionStates[slugB]?.lastVisited || 0
      return timeB - timeA // 最近访问的在前
    })
  }, [items, questionStates, activeTab])

  function goto(slug: string) {
    location.hash = `#/q/${encodeURIComponent(slug)}`
  }

  const completionRate = items.length > 0 ? Math.round((stats.completed / items.length) * 100) : 0

  return (
    <main className="container progress-page">
      <div className="progress-header">
        <h1>学习进度</h1>
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-value">{stats.favorited}</div>
            <div className="stat-label">收藏题目</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">已完成</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.reviewing}</div>
            <div className="stat-label">需要复习</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{completionRate}%</div>
            <div className="stat-label">完成率</div>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionRate}%` }}></div>
          </div>
          <div className="progress-text">
            {stats.completed} / {items.length} 题已完成
          </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'favorited' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorited')}
        >
          收藏 ({stats.favorited})
        </button>
        <button
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          已完成 ({stats.completed})
        </button>
        <button
          className={`tab ${activeTab === 'reviewing' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviewing')}
        >
          需要复习 ({stats.reviewing})
        </button>
      </div>

      <div className="progress-content">
        {loading ? (
          <div className="empty-state">加载中...</div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            {activeTab === 'favorited' && '还没有收藏的题目'}
            {activeTab === 'completed' && '还没有完成的题目'}
            {activeTab === 'reviewing' && '还没有需要复习的题目'}
          </div>
        ) : (
          <div className="question-list">
            {filteredItems.map((it) => {
              const slug = it.page.replace(/^q\//, '').replace(/\.html$/, '')
              const state = questionStates[slug]
              return (
                <div key={it.page} className="question-item" onClick={() => goto(slug)}>
                  <div className="question-main">
                    <h3 className="question-title">{it.title}</h3>
                    <div className="question-meta">
                      <span className="badge">{it.category || '未分类'}</span>
                      {(it.labels || []).slice(0, 3).map(l => (
                        <span key={l} className="label">{l}</span>
                      ))}
                    </div>
                  </div>
                  <div className="question-indicators">
                    {state.favorited && <span className="indicator favorited" title="已收藏">★</span>}
                    {state.status === 'completed' && <span className="indicator completed" title="已完成">✓</span>}
                    {state.status === 'reviewing' && <span className="indicator reviewing" title="需要复习">⟳</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
