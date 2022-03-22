import { BaseModal } from './BaseModal'
import {
} from '../../constants/strings'
import { Button } from 'react-bootstrap'

export const StatsModal = ({
  isOpen,
  handleClose,
  isGameLost,
  isGameWon,
}) => {
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
