import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { useState, useEffect } from 'react'


export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  isRevealing,
}) => {

  const [MAX_WORD_LENGTH, SET_MAX] = useState(5)

  const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH
  const isHighContrast = getStoredIsHighContrastMode()

  const data = JSON.parse(localStorage.getItem("gameConfig"))
  useEffect(() => {
    SET_MAX(data.game_type)
  }, [MAX_WORD_LENGTH, data.game_type])

  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white',
    {
      'transition ease-in-out': isRevealing,
      'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400':
        !status,
      'bg-slate-400 dark:bg-slate-800 text-white': status === 'absent',
      'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white':
        status === 'correct' && isHighContrast,
      'bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white':
        status === 'present' && isHighContrast,
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
        status === 'correct' && !isHighContrast,
      'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white':
        status === 'present' && !isHighContrast,
    }
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
    height: '58px',
  }

  const handleClick = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button style={styles} className={classes} onClick={handleClick}>
      {children || value}
    </button>
  )
}
