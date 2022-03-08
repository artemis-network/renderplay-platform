let MAX_WORD_LENGTH_ = 0
let MAX_CHALLENGES_ = 0

const result = { level: 'low' }

if (result.level === 'low') {
  MAX_WORD_LENGTH_ = 5
  MAX_CHALLENGES_ = 7
}

if (result.level === 'medium') {
  MAX_WORD_LENGTH_ = 6
  MAX_CHALLENGES_ = 7
}

if (result.level === 'high') {
  MAX_WORD_LENGTH_ = 7
  MAX_CHALLENGES_ = 7
}

export const MAX_WORD_LENGTH = MAX_WORD_LENGTH_
export const MAX_CHALLENGES = MAX_CHALLENGES_
export const ALERT_TIME_MS = 2000
export const REVEAL_TIME_MS = 350
export const GAME_LOST_INFO_DELAY = (MAX_WORD_LENGTH + 1) * REVEAL_TIME_MS
export const WELCOME_INFO_MODAL_MS = 350
