import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'

export const CompletedRow = ({ guess, isRevealing, status }) => {
  const splitGuess = unicodeSplit(guess)
  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={status[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}
