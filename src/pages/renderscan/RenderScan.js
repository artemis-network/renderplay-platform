import { lazy, useEffect, useState } from 'react';
import { useHistory } from 'react-router'

import Lottie from 'lottie-react-web'

import FREE from '../../assets/renderscan/free.json'
import PAID from '../../assets/renderscan/paid.json'

import Play1Png from '../../assets/renderscan/2.svg'
import Play2Png from '../../assets/renderscan/1.svg'

import { getRenderScanTypes, enterRenderScanGame } from '../../service/renderscan.service'

import ConfirmModal from './components/modals/ConfirmModal';
import InsufficentFunds from './components/modals/InsufficentFundsModal';

import './RenderScan.css'

const defaultOptions_FREE = {
	loop: true,
	autoplay: true,
	animationData: FREE,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const defaultOptions_PAID = {
	loop: true,
	autoplay: true,
	animationData: PAID,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const Bar = lazy(() => import("../common/bar/Bar"));

const RenderScan = () => {

	const history = useHistory()

	const [show, setShow] = useState(false);
	const [index, setIndex] = useState(null);
	const [renderScanTypes, setRendleGameTypes] = useState([])
	const scanPage = () => history.push("/renderscan/game")

	useEffect(() => {
		getRenderScanTypes().then((resp) => setRendleGameTypes([...resp.data.renderScanTypes])).catch((err) => console.log(err))
	}, [])


	const enterContest = (index, confirm) => {
		setIndex(index)
		const data = {
			userId: localStorage.getItem("userId"),
			contestId: renderScanTypes[index].contestId,
			entryFee: renderScanTypes[index].entryFee,
			confirm: confirm
		}
		enterRenderScanGame(data).then(
			(res) => {
				console.log(res.data)
				if (res.data.message === "PAID") {
					const renderScanDetails = {
						contestId: renderScanTypes[index].contestId,
						index: index
					}
					localStorage.setItem("renderScanData", JSON.stringify(renderScanDetails))
					return scanPage()
				}
				if (res.data.error)
					return setInsufficent(res.data.error)
				else
					return setShow(true);
			}
		).catch(
			(err) => { console.log(err) }
		)
	}

	const ModalClose = () => setShow(false);
	const ModalOpen = (index, confirm) => {
		const userId = localStorage.getItem("userId")
		if (userId !== null) {
			return enterContest(index, confirm)
		} else return history.push("/login")
	}

	const [Insufficent, setInsufficent] = useState(false)

	const InsufficentModalClose = () => setInsufficent(false);
	const InsufficentModalOpen = () => setInsufficent(true)

	return (
		<div style={{ background: "#321e43", }}>
			<Bar />
			<ConfirmModal show={show} gameData={renderScanTypes[index]} modalOpen={ModalOpen} modalClose={ModalClose} play={() => enterContest(index, true)} />
			<InsufficentFunds show={Insufficent} modalOpen={InsufficentModalOpen} modalClose={InsufficentModalClose} />

			<div className='renderscan_types'>
				<div style={{ display: "flex", position: "relative", justifyContent: 'center', flexDirection: "column" }}>
					<Lottie
						className="renderscan_type_1_size"
						options={defaultOptions_FREE}
					/>
					<img
						alt="play"
						src={Play1Png}
						onClick={() => ModalOpen(0, false)}
						className='cursor-pointer renderscan_type_button'
						color="green" />
					<div style={{ display: "flex", justifyContent: "center" }}>
						<div className='renderscan_bottom_info'>
							<div className='renderscan_bottom_content'>
								<div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "50%" }}>
									<div>
										Entry fee
									</div>
									<div >
										<span>0 </span>
										<span style={{ fontSize: ".85rem" }}>REND</span>
									</div>
								</div>
								<div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "50%" }}>
									<div>
										Now Playing
									</div>
									<div style={{ padding: ".2rem 0", display: "flex", justifyContent: 'center' }}>
										<div style={{ background: "#21ac94", width: "50%", borderRadius: "2vh", }}>
											500
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='renderscan_bottom_part_2' style={{ background: "#359297", }}>
							<p className='renderscan_bottom_part_2_text'>Play & win upto 10000 REND</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", position: "relative", justifyContent: 'center', flexDirection: "column" }}>
					<Lottie
						className="renderscan_type_2_size"
						options={defaultOptions_PAID}
					/>
					<img
						alt="play"
						onClick={() => ModalOpen(1, false)}
						src={Play2Png}
						className='cursor-pointer renderscan_type_button'
						color="green" />
					<div style={{ display: "flex", justifyContent: "center", margin: "4rem 0 0 0" }}>
						<div className='renderscan_bottom_info'>
							<div className='renderscan_bottom_content'>
								<div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "50%" }}>
									<div>
										Entry fee
									</div>
									<div >
										<span>1000 </span>
										<span style={{ fontSize: ".85rem" }}>REND</span>
									</div>
								</div>
								<div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "50%" }}>

									<div>
										Now Playing
									</div>
									<div style={{ padding: ".2rem 0", display: "flex", justifyContent: 'center' }}>
										<div style={{ background: "#21ac94", width: "50%", borderRadius: "2vh" }}>
											200
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="renderscan_bottom_part_2" style={{ background: "#973EE0", }}>
							<p className="renderscan_bottom_part_2_text">Play & win upto 50000 REND</p>
						</div>
					</div>
				</div>
			</div>
		</div >)

}



export default RenderScan