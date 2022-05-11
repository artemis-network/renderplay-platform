import { Cell } from './Cell'
import { useEffect, useState } from 'react'

export const EmptyRow = () => {

  const [MAX_WORD_LENGTH, SET_MAX] = useState(5)
  const data = JSON.parse(localStorage.getItem("gameConfig"))
  useEffect(() => {
    SET_MAX(data.gameType)
  }, [MAX_WORD_LENGTH, data.gameType])

  const emptyCells = Array.from(Array(MAX_WORD_LENGTH))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
