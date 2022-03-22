import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'
import { useState, useEffect } from 'react'


export const CurrentRow = ({ guess, className }) => {
  const splitGuess = unicodeSplit(guess)

  const [MAX_WORD_LENGTH, SET_MAX] = useState(5)
  const data = JSON.parse(localStorage.getItem("gameConfig"))
  useEffect(() => {
    SET_MAX(data.game_type)
  }, [MAX_WORD_LENGTH, data.game_type])

  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
