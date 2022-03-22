const letters = JSON.parse(localStorage.getItem("gameConfig"))
let number = 5
if (letters.game_type !== null) number = letters.game_type
export const MAX_WORD_LENGTH = number
export const MAX_CHALLENGES = 7
export const ALERT_TIME_MS = 2000
export const REVEAL_TIME_MS = 350
export const GAME_LOST_INFO_DELAY = (MAX_WORD_LENGTH + 1) * REVEAL_TIME_MS
export const WELCOME_INFO_MODAL_MS = 350
