import { Modal } from 'react-bootstrap'
import { XCircleIcon } from '@heroicons/react/solid'

import TryAgainLottie from '../../../../assets/renderscan/lottie/little-boy-with-a-pointing-stick.json'

import Lottie from 'lottie-react-web'

export const GameModal = ({
	isOpen,
	handleClose }) => {

	const defaultOptions_DONE = {
		loop: true,
		autoplay: true,
		animationData: TryAgainLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	const Body = () => <div>
		<Lottie
			style={{ height: "14rem", width: "14rem", paddingBottom: "2rem" }}
			options={defaultOptions_DONE}
		/>
		<div className='custom_modal_header'>
			Try next contest!
		</div>
		<h2>You already participated in this contest, stay tuned for announcements.</h2>
	</div>


	return (
		<Modal
			centered
			show={isOpen} onHide={handleClose}>
			<div className="custom_modal_close">
				<XCircleIcon onClick={handleClose} className='h-12 w-12 cursor-pointer' color="#ffeeee" />
			</div>
			<div className='custom_modal_content'>

				<div className='custom_modal_body'>
					<Body />
				</div>
				<div className='custom_modal_footer'>
					<button className='custom_modal_primary' onClick={handleClose}>
						Close
					</button>
				</div>
			</div>
		</Modal>
	)
}
