export const CHARACTERS = [
  {
    id: 'blue',
    name: 'Multi',
    body1: '#7dd3fc',
    body2: '#0284c7',
    stroke: '#38bdf8',
    cheek: 'rgba(244,114,182,0.25)',
    shadow: 'rgba(56,189,248,0.12)',
  },
  {
    id: 'pink',
    name: 'Cifra',
    body1: '#f9a8d4',
    body2: '#db2777',
    stroke: '#f472b6',
    cheek: 'rgba(251,146,60,0.25)',
    shadow: 'rgba(244,114,182,0.12)',
  },
  {
    id: 'green',
    name: 'Factor',
    body1: '#86efac',
    body2: '#16a34a',
    stroke: '#34d399',
    cheek: 'rgba(244,114,182,0.2)',
    shadow: 'rgba(52,211,153,0.12)',
  },
  {
    id: 'purple',
    name: 'Signo',
    body1: '#c4b5fd',
    body2: '#7c3aed',
    stroke: '#a78bfa',
    cheek: 'rgba(251,146,60,0.2)',
    shadow: 'rgba(167,139,250,0.12)',
  },
]

export function getCharacter(id) {
  return CHARACTERS.find(c => c.id === id) || CHARACTERS[0]
}

export const DEFAULT_CHARACTER = CHARACTERS[0].id
