import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'

export const isWordInWordList = (word, WORDS, VALID_GUESSES) => {
  return (
    WORDS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word, guesses, solution) => {
  if (guesses.length === 0) return false

  const lettersLeftArray = []
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(guess, solution)

  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present')
      lettersLeftArray.push(guess[i])
    if (statuses[i] === 'correct' && word[i] !== guess[i])
      return WRONG_SPOT_MESSAGE(guess[i], i + 1)
  }
  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of word) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) lettersLeftArray.splice(n, 1)
  }

  if (lettersLeftArray.length > 0) return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  return false
}

export const unicodeSplit = (word) => {
  const letters = []
  for (let i = 0; i < word.length; i++) letters[i] = word[i]
  return letters
}

export const unicodeLength = (word) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getWordOfDay = (WORDS) => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = new Date()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: localeAwareUpperCase(WORDS[index % WORDS.length]),
    solutionIndex: index, tomorrow: nextday,
  }
}

export const isWinningWord = (word, solution) => solution === word
