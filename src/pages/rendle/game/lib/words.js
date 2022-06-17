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