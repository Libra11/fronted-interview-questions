import React, { useEffect, useMemo, useState } from 'react'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Progress from './pages/Progress'

type Route = { name: 'home' } | { name: 'detail', slug: string } | { name: 'progress' }

type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'interview-theme'

function resolveInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {}
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'dark'
}

function parseRoute(hash: string): Route {
  const h = hash.replace(/^#/, '')
  if (!h || h === '/' || h.startsWith('?')) return { name: 'home' }
  const parts = h.split('?')[0].split('/').filter(Boolean)
  if (parts[0] === 'q' && parts[1]) return { name: 'detail', slug: decodeURIComponent(parts[1]) }
  if (parts[0] === 'progress') return { name: 'progress' }
  return { name: 'home' }
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute(location.hash))
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = resolveInitialTheme()
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = initial
    }
    return initial
  })

  useEffect(() => {
    const onHash = () => setRoute(parseRoute(location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme
    }
    if (typeof window !== 'undefined') {
      try { window.localStorage.setItem(THEME_STORAGE_KEY, theme) } catch {}
    }
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const content = useMemo(() => {
    if (route.name === 'detail') return <Detail slug={route.slug} />
    if (route.name === 'progress') return <Progress />
    return <Home />
  }, [route])

  const themeToggleLabel = theme === 'dark' ? '切换到日间模式' : '切换到夜间模式'
  const themeToggleText = theme === 'dark' ? '日间模式' : '夜间模式'

  return (
    <div>
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#/">面试题刷题</a>
          <div className="header-actions">
            <nav className="nav">
              <a href="#/">首页</a>
              <a href="#/progress">学习进度</a>
              <a href="https://github.com/pro-collection/interview-question" target="_blank" rel="noreferrer">源仓库</a>
            </nav>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={themeToggleLabel}
              title={themeToggleLabel}
            >
              {themeToggleText}
            </button>
          </div>
        </div>
      </header>
      {content}
      <footer className="site-footer">© 面试题刷题（React）</footer>
    </div>
  )
}
