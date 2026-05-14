const STAGE_KEY = 'funmultis_stage_progress'
const RANK_KEY = 'albamulti_rankings'
const USER_KEY = 'funmultis_username'

export function getStageProgress() {
  try {
    return JSON.parse(localStorage.getItem(STAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export function saveStageProgress(progress) {
  localStorage.setItem(STAGE_KEY, JSON.stringify(progress))
}

export function getRankings() {
  try {
    return JSON.parse(localStorage.getItem(RANK_KEY)) || []
  } catch {
    return []
  }
}

export function saveRankings(rankings) {
  localStorage.setItem(RANK_KEY, JSON.stringify(rankings))
}

export function getUsername() {
  return localStorage.getItem(USER_KEY) || ''
}

export function setUsername(name) {
  localStorage.setItem(USER_KEY, name.trim())
}

export function clearUsername() {
  localStorage.removeItem(USER_KEY)
}

const TABLE_KEY = 'funmultis_selected_tables'
const DEFAULT_TABLES = []

export function getSelectedTables() {
  try {
    const raw = localStorage.getItem(TABLE_KEY)
    if (!raw) return [...DEFAULT_TABLES]
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : [...DEFAULT_TABLES]
  } catch {
    return [...DEFAULT_TABLES]
  }
}

export function saveSelectedTables(tables) {
  localStorage.setItem(TABLE_KEY, JSON.stringify(tables))
}

const CHAR_KEY = 'funmultis_character'

export function getSelectedCharacter() {
  return localStorage.getItem(CHAR_KEY) || 'blue'
}

export function saveSelectedCharacter(charId) {
  localStorage.setItem(CHAR_KEY, charId)
}

const ERRORS_KEY = 'funmultis_error_facts'

export function getErrorFacts() {
  try {
    return JSON.parse(localStorage.getItem(ERRORS_KEY)) || []
  } catch {
    return []
  }
}

export function saveErrorFacts(facts) {
  localStorage.setItem(ERRORS_KEY, JSON.stringify(facts))
}

export function addErrorFact(table, multiplier) {
  const facts = getErrorFacts()
  const filtered = facts.filter(f => !(f.table === table && f.multiplier === multiplier))
  filtered.push({ table, multiplier })
  if (filtered.length > 20) {
    filtered.splice(0, filtered.length - 20)
  }
  saveErrorFacts(filtered)
}
