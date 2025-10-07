// 管理题目的收藏和学习状态
export type QuestionStatus = 'completed' | 'reviewing' | null

export interface QuestionState {
  favorited: boolean
  status: QuestionStatus
  lastVisited?: number
}

const STORAGE_KEY = 'interview-questions-state'

// 获取所有题目状态
export function getAllQuestionStates(): Record<string, QuestionState> {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

// 保存所有题目状态
function saveAllQuestionStates(states: Record<string, QuestionState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(states))
  } catch (e) {
    console.error('Failed to save question states:', e)
  }
}

// 获取单个题目状态
export function getQuestionState(slug: string): QuestionState {
  const all = getAllQuestionStates()
  return all[slug] || { favorited: false, status: null }
}

// 更新单个题目状态
export function updateQuestionState(slug: string, update: Partial<QuestionState>) {
  const all = getAllQuestionStates()
  all[slug] = { ...getQuestionState(slug), ...update, lastVisited: Date.now() }
  saveAllQuestionStates(all)
}

// 切换收藏状态
export function toggleFavorite(slug: string): boolean {
  const current = getQuestionState(slug)
  const newFavorited = !current.favorited
  updateQuestionState(slug, { favorited: newFavorited })
  return newFavorited
}

// 设置学习状态
export function setQuestionStatus(slug: string, status: QuestionStatus) {
  updateQuestionState(slug, { status })
}

// 获取收藏的题目列表
export function getFavoritedSlugs(): string[] {
  const all = getAllQuestionStates()
  return Object.keys(all).filter(slug => all[slug].favorited)
}

// 获取已完成的题目列表
export function getCompletedSlugs(): string[] {
  const all = getAllQuestionStates()
  return Object.keys(all).filter(slug => all[slug].status === 'completed')
}

// 获取需要复习的题目列表
export function getReviewingSlugs(): string[] {
  const all = getAllQuestionStates()
  return Object.keys(all).filter(slug => all[slug].status === 'reviewing')
}

// 获取统计数据
export function getStatistics() {
  const all = getAllQuestionStates()
  const slugs = Object.keys(all)
  return {
    total: slugs.length,
    favorited: slugs.filter(slug => all[slug].favorited).length,
    completed: slugs.filter(slug => all[slug].status === 'completed').length,
    reviewing: slugs.filter(slug => all[slug].status === 'reviewing').length,
  }
}
