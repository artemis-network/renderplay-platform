import { BaseModal } from './BaseModal'
import {
} from '../../constants/strings'
import { Button } from 'react-bootstrap'

export const CompletedModal = ({
	isOpen,
	handleClose,
	isGameLost,
	isGameWon,
	isGameFinished
}) => {
	return (
		<BaseModal
			title={""}
			isOpen={isOpen}
			handleClose={handleClose}
		>
			{isGameFinished ? (
				<h2>You already participated in this contest, stay tuned for results.</h2>
			) : null}
			{isGameLost && !isGameFinished ? (
				<h2>Better Luck next time!.</h2>
			) : null}
			{isGameWon ? (
				<h2>Congrats you completed, results will be announced soon.</h2>
			) : null}

			<div style={{ padding: "2rem" }}>
				<Button variant="outline-primary" onClick={handleClose}>Close</Button>
			</div>
		</BaseModal>
	)
}

