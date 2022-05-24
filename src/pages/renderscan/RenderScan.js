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

};

const defaultOptions_PAID = {
	loop: true,
	autoplay: true,
	animationData: PAID,
};

const Bar = lazy(() => import("../common/bar/Bar"));

const RenderScan = () => {

	const history = useHistory()

	const [index, setIndex] = useState(null);
	const [renderScanTypes, setRendleGameTypes] = useState([])

	const [confirmModal, setConfirmModal] = useState(false);
	const [insufficentModal, setInsufficentModal] = useState(false)

	const confirmModalClose = () => setConfirmModal(false);
	const confirmModalOpen = (index) => {
		const userId = localStorage.getItem("userId")
		if (userId !== null) {
			return enterContest(index, true)
		} else return history.push("/login")
	}

	const insufficentModalClose = () => setInsufficentModal(false);
	const insufficentModalOpen = () => setInsufficentModal(true)

	const scanPage = () => history.push("/renderscan/lobby")

	useEffect(() => {
		getRenderScanTypes()
			.then((resp) => setRendleGameTypes([...resp.data.renderScanTypes]))
			.catch((err) => console.log(err))
	}, [])


	const enterContest = (index, confirm) => {
		setIndex(index)
		const data = {
			userId: localStorage.getItem("userId"),
			contestId: renderScanTypes[index].contestId,
			request: confirm
		}
		enterRenderScanGame(data).then(
			(res) => {
				console.log(res.data)
				// if user cleared all criteriea [APPROVED]
				if (res.data.status === "[APPROVED]") {
					return setConfirmModal(true);
				}
				// if user already in contest [ALREADY_IN_CONTEST]
				if (res.data.status === "[ALREADY_IN_CONTEST]" || res.data.status === "[PAID]") {
					const renderScanDetails = {
						startsOn: renderScanTypes[index].startsOn,
						contestId: renderScanTypes[index].contestId,
						index: index
					}
					localStorage.setItem("renderScanData", JSON.stringify(renderScanDetails))
					return scanPage()
				}
				// if user has insufficient  [INSUFFICIENT_FUNDS]
				if (res.data.status === "[INSUFFICENT_FUNDS]") {
					return setInsufficent(res.data.error)
				}
			}
		).catch(
			(err) => { console.log(err) }
		)
	}



	return (
		<div style={{ background: "#321e43", }}>
			<Bar />
			<ConfirmModal
				show={confirmModal}
				gameData={renderScanTypes[index]}
				modalOpen={() => confirmModalOpen(index)}
				modalClose={confirmModalClose}
				play={() => enterContest(index, false)}
			/>
			<InsufficentFunds
				show={insufficentModal}
				modalOpen={insufficentModalOpen}
				modalClose={insufficentModalClose}
			/>
			<div className='renderscan_types'>
				<div style={{ display: "flex", position: "relative", justifyContent: 'center', flexDirection: "column" }}>
					<Lottie
						className="renderscan_type_size"
						options={defaultOptions_FREE}
					/>
					<img
						alt="play"
						src={Play1Png}
						onClick={() => confirmModalOpen(0, true)}
						className='cursor-pointer renderscan_type_button'
						color="green" />
				</div>

				<div style={{ display: "flex", position: "relative", justifyContent: 'center', flexDirection: "column" }}>
					<Lottie
						className="renderscan_type_size"
						options={defaultOptions_PAID}
					/>
					<img
						alt="play"
						onClick={() => confirmModalOpen(1, false)}
						src={Play2Png}
						className='cursor-pointer renderscan_type_button'
						color="green" />
				</div>
			</div>
		</div >)

}



export default RenderScan