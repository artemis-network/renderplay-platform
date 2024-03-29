import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { localeAwareUpperCase } from '../../lib/words'

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
  MAX_WORD_LENGTH
}) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = localeAwareUpperCase(e.key)
        // TODO: check this test if the range works with non-english letters
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => window.removeEventListener('keyup', listener)
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            MAX_WORD_LENGTH={MAX_WORD_LENGTH}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            MAX_WORD_LENGTH={MAX_WORD_LENGTH}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key MAX_WORD_LENGTH={MAX_WORD_LENGTH} width={65.4} value="DELETE" onClick={onClick}>
          {"DELETE"}
        </Key>
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            MAX_WORD_LENGTH={MAX_WORD_LENGTH}
          />
        ))}
        <Key MAX_WORD_LENGTH={MAX_WORD_LENGTH} width={65.4} value="ENTER" onClick={onClick}>
          {"ENTER"}
        </Key>

      </div>
    </div>
  )
}
