#!/usr/bin/env node
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const INPUT_DIR = path.join(ROOT, 'interview-question');
const OUTPUT_DIR = path.join(ROOT, 'site');
const REACT_PUBLIC_DIR = path.join(ROOT, 'react-app', 'public');

// -------- utils --------
function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slugify(input) {
  return String(input)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function stripMarkdown(md) {
  // very lightweight strip for excerpts
  return md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\!\[[^\]]*\]\([^\)]+\)/g, '')
    .replace(/\[[^\]]*\]\([^\)]+\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function mdToHtml(md) {
  // A minimal Markdown to HTML converter sufficient for these notes
  // Handles: headings, fenced code, blockquotes, lists, paragraphs, inline code, links, images, bold/italic
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  let html = '';
  let inCode = false;
  let codeLang = '';
  let listType = null; // 'ul' or 'ol'
  let listOpen = false;

  const flushList = () => {
    if (listOpen) {
      html += `</${listType}>`;
      listOpen = false;
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // fenced code blocks
    const fence = line.match(/^```(.*)$/);
    if (fence) {
      if (!inCode) {
        inCode = true;
        codeLang = fence[1].trim();
        flushList();
        html += `<pre class="code-block"><code${codeLang ? ` class="language-${escapeHtml(codeLang)}"` : ''}>`;
      } else {
        inCode = false;
        html += `</code></pre>`;
      }
      continue;
    }
    if (inCode) {
      html += `${escapeHtml(line)}\n`;
      continue;
    }

    // headings
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushList();
      const level = h[1].length;
      const text = h[2].trim();
      html += `<h${level}>${inline(text)}</h${level}>`;
      continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      flushList();
      const quote = line.replace(/^>\s?/, '');
      html += `<blockquote>${inline(quote)}</blockquote>`;
      continue;
    }

    // lists
    const ul = line.match(/^\s*[-*+]\s+(.*)$/);
    const ol = line.match(/^\s*(\d+)\.\s+(.*)$/);
    if (ul) {
      if (!listOpen || listType !== 'ul') {
        flushList();
        listOpen = true;
        listType = 'ul';
        html += `<ul>`;
      }
      html += `<li>${inline(ul[1].trim())}</li>`;
      continue;
    } else if (ol) {
      if (!listOpen || listType !== 'ol') {
        flushList();
        listOpen = true;
        listType = 'ol';
        html += `<ol>`;
      }
      html += `<li>${inline(ol[2].trim())}</li>`;
      continue;
    } else {
      // not a list line
      flushList();
    }

    // horizontal rule
    if (/^\s*---+\s*$/.test(line)) {
      html += '<hr />';
      continue;
    }

    // paragraph or empty
    if (line.trim() === '') {
      html += '';
    } else {
      html += `<p>${inline(line.trim())}</p>`;
    }
  }

  flushList();
  return html;

  function inline(text) {
    // images ![alt](src)
    text = text.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, (m, alt, src) => {
      return `<img alt="${escapeHtml(alt)}" src="${escapeHtml(src)}" />`;
    });
    // links [text](url)
    text = text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (m, label, href) => {
      const safeHref = href.replace(/"/g, '%22');
      return `<a href="${escapeHtml(safeHref)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
    });
    // bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // italic
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // inline code
    text = text.replace(/`([^`]+)`/g, (m, code) => `<code>${escapeHtml(code)}</code>`);
    return text;
  }
}

async function walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    else return [full];
  }));
  return files.flat();
}

function parseMeta(content) {
  const meta = {};
  const lines = content.split(/\r?\n/);
  // title
  const titleLine = lines.find((l) => l.startsWith('# '));
  meta.title = titleLine ? titleLine.replace(/^#\s+/, '').trim() : '';
  // fields
  const findField = (key) => {
    const l = lines.find((l) => l.startsWith(`- ${key}:`));
    if (!l) return null;
    return l.split(':').slice(1).join(':').trim();
  };
  const issueStr = findField('Issue');
  if (issueStr) {
    const m = issueStr.match(/#?(\d+)/);
    if (m) meta.issue = m[1];
  }
  const labelsStr = findField('Labels');
  if (labelsStr) meta.labels = labelsStr.split(',').map((s) => s.trim()).filter(Boolean);
  const url = findField('URL');
  if (url) meta.url = url;
  const created = findField('Created');
  if (created) meta.created = created;
  const updated = findField('Updated');
  if (updated) meta.updated = updated;

  // body after ## Body
  const bodyIndex = lines.findIndex((l) => /^##\s+Body\s*$/.test(l));
  meta.body = bodyIndex >= 0 ? lines.slice(bodyIndex + 1).join('\n').trim() : lines.join('\n');
  return meta;
}

function pageTemplate({ title, category, labels, created, updated, url, bodyHtml, backLink }) {
  const subtitleBits = [];
  if (category) subtitleBits.push(category);
  if (labels && labels.length) subtitleBits.push(labels.join(' · '));
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} - 面试题刷题</title>
  <link rel="stylesheet" href="../assets/styles.css" />
  <meta name="description" content="${escapeHtml(stripMarkdown(bodyHtml).slice(0, 140))}" />
  <link rel="icon" href="../assets/favicon.svg" />
  <style>.content a{color:var(--brand);} .content img{max-width:100%;}</style>
  
  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:type" content="article" />
  <meta property="og:description" content="${escapeHtml(stripMarkdown(bodyHtml).slice(0, 200))}" />
  <meta property="og:locale" content="zh_CN" />
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="../index.html">面试题刷题</a>
      <nav class="nav">
        <a href="../index.html">首页</a>
        <a href="../index.html#categories">分类</a>
        <a href="${url || '#'}" target="_blank" rel="noopener">原始链接</a>
      </nav>
    </div>
  </header>
  <main class="container article">
    <div class="article-head">
      <a class="back" href="${backLink}">← 返回列表</a>
      <h1>${escapeHtml(title)}</h1>
      ${subtitleBits.length ? `<div class="subtitle">${subtitleBits.map(escapeHtml).join(' · ')}</div>` : ''}
      <div class="meta">${created ? `创建：${escapeHtml(created)} · ` : ''}${updated ? `更新：${escapeHtml(updated)}` : ''}</div>
    </div>
    <article class="content markdown-body">${bodyHtml}</article>
  </main>
  <footer class="site-footer">© 面试题刷题 · 由本地静态页面生成</footer>
</body>
</html>`;
}

function indexTemplate() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>面试题刷题</title>
  <link rel="stylesheet" href="assets/styles.css" />
  <link rel="icon" href="assets/favicon.svg" />
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="index.html">面试题刷题</a>
      <nav class="nav">
        <a href="#categories">分类</a>
        <a href="#">关于</a>
      </nav>
    </div>
  </header>
  <section class="hero">
    <div class="container">
      <h1>前端面试题 · 高效刷题</h1>
      <p>覆盖公司与专题分类，支持搜索、筛选与快速跳转原始问题。</p>
      <div class="search-bar">
        <input id="search-input" type="search" placeholder="搜索题目、标签、编号..." />
      </div>
      <div class="quick-filters" id="quick-filters"></div>
    </div>
  </section>

  <main class="container layout">
    <aside class="sidebar">
      <h2 id="categories">分类</h2>
      <div id="category-list" class="category-list"></div>
    </aside>
    <section class="results">
      <div id="stats" class="stats"></div>
      <div id="cards" class="cards"></div>
      <div id="pagination" class="pagination"></div>
    </section>
  </main>

  <footer class="site-footer">© 面试题刷题 · 本地静态站点</footer>
  <script src="assets/index-data.js"></script>
  <script src="assets/app.js"></script>
  
</body>
</html>`;
}

async function main() {
  ensureDirSync(OUTPUT_DIR);
  ensureDirSync(path.join(OUTPUT_DIR, 'assets'));
  ensureDirSync(path.join(OUTPUT_DIR, 'q'));
  ensureDirSync(REACT_PUBLIC_DIR);
  ensureDirSync(path.join(REACT_PUBLIC_DIR, 'data'));
  ensureDirSync(path.join(REACT_PUBLIC_DIR, 'q'));
  ensureDirSync(path.join(REACT_PUBLIC_DIR, 'md'));

  // copy static assets (created separately in repo)
  const staticAssets = ['styles.css', 'app.js', 'favicon.svg'];
  for (const asset of staticAssets) {
    const src = path.join(ROOT, 'site', 'assets', asset);
    // if asset does not exist yet (first run), create placeholders for now
    if (!fs.existsSync(src)) {
      if (asset === 'styles.css') await fsp.writeFile(src, '');
      if (asset === 'app.js') await fsp.writeFile(src, '');
      if (asset === 'favicon.svg') await fsp.writeFile(src, '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#6c5ce7" d="M12 2L2 7l10 5l10-5z"/><path fill="#a29bfe" d="M2 17l10 5l10-5l-10-5z"/></svg>');
    }
  }

  // write index.html
  await fsp.writeFile(path.join(OUTPUT_DIR, 'index.html'), indexTemplate(), 'utf-8');

  // gather files
  const all = (await walk(INPUT_DIR)).filter((p) => p.endsWith('.md'));

  const items = [];
  for (const file of all) {
    const rel = path.relative(INPUT_DIR, file);
    const category = rel.split(path.sep)[0];
    const raw = await fsp.readFile(file, 'utf-8');
    const meta = parseMeta(raw);
    const bodyHtml = mdToHtml(meta.body || '');
    const id = meta.issue || slugify(path.basename(file, '.md'));
    const slug = `${slugify(category)}-${id}`;
    const page = `q/${slug}.html`;
    const labels = meta.labels || [];
    const excerpt = stripMarkdown(meta.body || '').slice(0, 160);

    // write page
    const html = pageTemplate({
      title: meta.title || path.basename(file, '.md'),
      category,
      labels,
      created: meta.created,
      updated: meta.updated,
      url: meta.url,
      bodyHtml,
      backLink: '../index.html',
    });
    await fsp.writeFile(path.join(OUTPUT_DIR, page), html, 'utf-8');
    await fsp.writeFile(path.join(REACT_PUBLIC_DIR, page), html, 'utf-8');
    // write markdown body for React to render with react-markdown
    const mdSlugPath = path.join(REACT_PUBLIC_DIR, 'md', `${slug}.md`);
    const mdContent = `${meta.body || ''}`;
    await fsp.writeFile(mdSlugPath, mdContent, 'utf-8');

    items.push({
      id,
      title: meta.title || path.basename(file, '.md'),
      category,
      labels,
      url: meta.url || '',
      page,
      excerpt,
    });
  }

  // sort by category then id numeric if possible
  items.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category, 'zh');
    const an = Number(a.id);
    const bn = Number(b.id);
    if (!Number.isNaN(an) && !Number.isNaN(bn)) return bn - an; // desc by id
    return a.title.localeCompare(b.title, 'zh');
  });

  // write data file
  const dataJs = `window.QUESTIONS_INDEX = ${JSON.stringify(items)};`;
  await fsp.writeFile(path.join(OUTPUT_DIR, 'assets', 'index-data.js'), dataJs, 'utf-8');
  await fsp.writeFile(path.join(REACT_PUBLIC_DIR, 'data', 'index.json'), JSON.stringify(items), 'utf-8');

  console.log(`Built ${items.length} questions into ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
