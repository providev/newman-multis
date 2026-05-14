function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function buildPool(selectedTables) {
  const pool = []
  for (const table of selectedTables) {
    const min = table === 1 ? 1 : 2
    for (let m = min; m <= 10; m++) {
      pool.push({ table, multiplier: m })
    }
  }
  return pool
}

function buildOptions(table, multiplier, answer) {
  const options = [answer]
  while (options.length < 4) {
    const fakeMultiplier = Math.max(1, multiplier + (Math.floor(Math.random() * 5) - 2))
    const fakeAnswer = table * fakeMultiplier + (Math.floor(Math.random() * 3) - 1)
    if (!options.includes(fakeAnswer) && fakeAnswer > 0) {
      options.push(fakeAnswer)
    }
  }
  return options.sort(() => Math.random() - 0.5)
}

export function generateQuestions(selectedTables, numQuestions) {
  const pool = shuffle(buildPool(selectedTables))
  const questions = []
  for (let i = 0; i < numQuestions; i++) {
    const pair = pool[i % pool.length]
    const answer = pair.table * pair.multiplier
    questions.push({ table: pair.table, multiplier: pair.multiplier, answer, options: buildOptions(pair.table, pair.multiplier, answer) })
  }
  return questions
}

export function generateErrorQuestions(errorFacts, numQuestions) {
  if (!errorFacts || errorFacts.length === 0) return []
  const valid = errorFacts.filter(f => f.table === 1 || f.multiplier !== 1)
  if (valid.length === 0) return []
  const questions = []
  for (let i = 0; i < numQuestions; i++) {
    const fact = valid[i % valid.length]
    const table = fact.table
    const multiplier = fact.multiplier
    const answer = table * multiplier
    questions.push({ table, multiplier, answer, options: buildOptions(table, multiplier, answer) })
  }
  return questions
}
