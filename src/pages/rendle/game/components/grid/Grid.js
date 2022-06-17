import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

export const Grid = ({
  status,
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
  MAX_CHALLENGES
}) => {
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
          status={status[i]}
          gameType={MAX_CHALLENGES}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}

      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow gameType={MAX_CHALLENGES} guess={currentGuess} className={currentRowClassName} />
      )}

      {empties.map((_, i) => (
        <EmptyRow gameType={MAX_CHALLENGES} key={i} />
      ))}
    </div>
  )
}
