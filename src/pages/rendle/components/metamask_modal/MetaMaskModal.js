import { Modal } from 'react-bootstrap'
import { XCircleIcon } from '@heroicons/react/solid'

const MetaMaskWalletAddressModal = (props) => {
	return (
		<Modal
			style={{ color: "#321e43", }}
			centered
			show={props.show} onHide={props.modalClose}>
			<div className="custom_modal_close" style={{ position: "relative" }}>
				<XCircleIcon onClick={props.modalClose} className='h-12 w-12 cursor-pointer' color="#ffeeee" />
			</div>
			<div className='custom_modal_content' style={{ background: "#ffffff", color: "#321e43", padding: "1rem 0rem", rowGap: 0, borderBottomLeftRadius: "2vh", borderBottomRightRadius: "2vh" }}>
				<div className='custom_modal_body'>
					<div className='custom_modal_header' style={{ fontSize: "1.25rem", color: "#321e43" }}>Sorry!</div>
					<div style={{ fontSize: '1rem', }}>
						Connect to your meta mask wallet address
					</div>
				</div>
				<div className='custom_modal_footer'>
					<button style={{
						background: "#FF6B6B", padding: ".5rem 2rem",
						fontSize: "1.15rem",
						fontWeight: "bold",
						borderRadius: "2vh"

					}} onClick={props.modalClose}>
						Close
					</button>
				</div>
			</div>
		</Modal>

	);
}

export default MetaMaskWalletAddressModal
