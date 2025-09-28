(() => {
  const data = (window.QUESTIONS_INDEX || []).map((it, i) => ({ ...it, idx: i }));
  const input = document.getElementById('search-input');
  const cardsEl = document.getElementById('cards');
  const statsEl = document.getElementById('stats');
  const catListEl = document.getElementById('category-list');
  const quickFiltersEl = document.getElementById('quick-filters');
  const pagerEl = document.getElementById('pagination');

  const PAGE_SIZE = 24;
  let state = { q: '', category: '全部', page: 1 };

  const categories = (() => {
    const map = new Map();
    for (const it of data) {
      const k = it.category || '未分类';
      map.set(k, (map.get(k) || 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  })();

  function highlight(text, q) {
    if (!q) return text;
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig');
    return text.replace(re, (m) => `<mark>${m}</mark>`);
  }

  function renderCategories() {
    if (!catListEl) return;
    catListEl.innerHTML = '';
    const makeItem = (name, count) => {
      const div = document.createElement('div');
      div.className = 'category-item' + (state.category === name ? ' active' : '');
      div.innerHTML = `<span>${name}</span><span class="label">${count}</span>`;
      div.addEventListener('click', () => { state.category = name; state.page = 1; syncSearchFromHash(); render(); });
      return div;
    };
    catListEl.appendChild(makeItem('全部', data.length));
    categories.forEach(([name, count]) => catListEl.appendChild(makeItem(name, count)));
  }

  function renderQuickFilters() {
    if (!quickFiltersEl) return;
    quickFiltersEl.innerHTML = '';
    const topCats = categories.slice(0, 8).map(([n]) => n);
    for (const c of topCats) {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.textContent = c;
      chip.addEventListener('click', () => { state.category = c; state.page = 1; render(); });
      quickFiltersEl.appendChild(chip);
    }
  }

  function applyFilter() {
    let list = data;
    if (state.category && state.category !== '全部') {
      list = list.filter((it) => (it.category || '未分类') === state.category);
    }
    const q = state.q.trim();
    if (q) {
      const lower = q.toLowerCase();
      list = list.filter((it) => {
        return (
          it.title.toLowerCase().includes(lower) ||
          it.category.toLowerCase().includes(lower) ||
          (it.labels || []).join(',').toLowerCase().includes(lower) ||
          (it.id || '').toString().includes(lower)
        );
      });
    }
    return list;
  }

  function renderCards(list) {
    cardsEl.innerHTML = '';
    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = list.slice(start, start + PAGE_SIZE);
    for (const it of pageItems) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3 class="title">${highlight(escapeHtml(it.title), state.q)}</h3>
        <div class="meta-row">
          <span class="badge">${escapeHtml(it.category || '未分类')}</span>
          ${(it.labels || []).slice(0, 3).map(l => `<span class="label">${escapeHtml(l)}</span>`).join('')}
        </div>
        <div class="excerpt">${escapeHtml(it.excerpt || '').slice(0, 120)}${(it.excerpt || '').length > 120 ? '…' : ''}</div>
        <div class="actions">
          <a class="btn primary" href="${it.page}">查看</a>
          ${it.url ? `<a class="btn ghost" target="_blank" rel="noopener" href="${it.url}">原始链接</a>` : ''}
        </div>
      `;
      cardsEl.appendChild(card);
    }
  }

  function renderPager(total) {
    pagerEl.innerHTML = '';
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const prev = document.createElement('button');
    prev.className = 'page-btn';
    prev.textContent = '上一页';
    prev.disabled = state.page <= 1;
    prev.addEventListener('click', () => { if (state.page > 1) { state.page--; syncHash(); render(); } });
    const next = document.createElement('button');
    next.className = 'page-btn';
    next.textContent = '下一页';
    next.disabled = state.page >= pages;
    next.addEventListener('click', () => { if (state.page < pages) { state.page++; syncHash(); render(); } });
    const info = document.createElement('span');
    info.style.color = '#9aa3b2';
    info.textContent = `第 ${state.page} / ${pages} 页`;
    pagerEl.append(prev, info, next);
  }

  function render() {
    const filtered = applyFilter();
    statsEl.textContent = `共 ${filtered.length} 题 · 当前分类：${state.category} · 关键词：${state.q || '无'}`;
    renderCards(filtered);
    renderPager(filtered.length);
    syncHash();
  }

  function syncHash() {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.category && state.category !== '全部') p.set('c', state.category);
    if (state.page && state.page !== 1) p.set('p', String(state.page));
    const s = p.toString();
    const hash = s ? `#${s}` : '';
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }

  function syncSearchFromHash() {
    const s = new URLSearchParams(location.hash.replace(/^#/, ''));
    state.q = s.get('q') || state.q || '';
    state.category = s.get('c') || state.category || '全部';
    state.page = Number(s.get('p') || 1);
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  // events
  if (input) {
    input.addEventListener('input', (e) => {
      state.q = e.target.value || '';
      state.page = 1;
      render();
    });
  }
  window.addEventListener('hashchange', () => { syncSearchFromHash(); render(); });

  // init
  renderCategories();
  renderQuickFilters();
  syncSearchFromHash();
  if (input && state.q) input.value = state.q;
  render();
})();

