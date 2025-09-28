import React, { useEffect, useMemo, useState } from 'react'
import Home from './pages/Home'
import Detail from './pages/Detail'

type Route = { name: 'home' } | { name: 'detail', slug: string }

function parseRoute(hash: string): Route {
  const h = hash.replace(/^#/, '')
  if (!h || h === '/' || h.startsWith('?')) return { name: 'home' }
  const parts = h.split('?')[0].split('/').filter(Boolean)
  if (parts[0] === 'q' && parts[1]) return { name: 'detail', slug: decodeURIComponent(parts[1]) }
  return { name: 'home' }
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute(location.hash))
  useEffect(() => {
    const onHash = () => setRoute(parseRoute(location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const content = useMemo(() => {
    if (route.name === 'detail') return <Detail slug={route.slug} />
    return <Home />
  }, [route])

  return (
    <div>
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#/">面试题刷题</a>
          <nav className="nav">
            <a href="#/">首页</a>
            <a href="#/">分类</a>
            <a href="https://github.com/pro-collection/interview-question" target="_blank" rel="noreferrer">源仓库</a>
          </nav>
        </div>
      </header>
      {content}
      <footer className="site-footer">© 面试题刷题（React）</footer>
    </div>
  )
}

