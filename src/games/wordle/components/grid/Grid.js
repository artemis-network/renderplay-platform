import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

export const Grid = ({
  solution,
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName, }) => {

  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <div>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          solution={solution}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}

      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} />
      )}

      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
