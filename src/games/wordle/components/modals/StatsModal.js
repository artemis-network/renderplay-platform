import { StatBar } from '../stats/StatBar'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
} from '../../constants/strings'
import { Button } from 'react-bootstrap'

export const StatsModal = ({
  isOpen,
  handleClose,
  gameStats,
  isGameLost,
  isGameWon,
}) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={""}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {isGameLost ? (
        <h2>Better Luck next time!.</h2>
      ) : null}
      {isGameWon ? (
        <h2>Congrats you completed, resutls will be announced soon.</h2>
      ) : null}

      <div style={{ padding: "2rem" }}>
        <Button variant="outline-primary" onClick={handleClose}>Close</Button>
      </div>


    </BaseModal>
  )
}
