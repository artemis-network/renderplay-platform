import { Cell } from './Cell'

export const EmptyRow = ({ gameType }) => {
  const emptyCells = Array.from(Array(gameType))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
