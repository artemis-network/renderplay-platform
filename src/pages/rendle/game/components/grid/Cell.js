import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = false

  const classes = classnames(
    'lg:w-16 lg:h-16 2xl:h-20 2xl:w-20 sm:w-16 sm:h-16 h-16 w-16 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded text-white',
    {
      'bg-dark border-slate-50':
        !status,
      'border-black': value && !status,
      'absent shadowed bg-slate-400 text-white border-slate-400':
        status === 'absent',
      'correct shadowed bg-red-400 text-white border-red-400':
        status === 'correct' && isHighContrast,
      'present shadowed bg-green-900 text-white border-green-900':
        status === 'present' && isHighContrast,
      'correct shadowed bg-lime-400 text-white border-lime-400':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-amber-400 text-white border-amber-400':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
