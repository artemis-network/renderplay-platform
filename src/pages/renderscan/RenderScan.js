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

	return (<div style={{ background: "#321e43", }}>
		<Bar />
		<ConfirmModal show={show} gameData={renderScanTypes[index]} modalOpen={ModalOpen} modalClose={ModalClose} play={() => enterContest(index, true)} />
		<InsufficentFunds show={Insufficent} modalOpen={InsufficentModalOpen} modalClose={InsufficentModalClose} />
		<div style={{ display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: "row", paddingTop: "4rem" }}>

			<div style={{ position: "relative" }}>
				<Lottie
					style={{ width: "40rem", }}
					options={defaultOptions_FREE}
				/>
				<img
					alt="play"
					src={Play1Png}
					onClick={() => ModalOpen(0, false)}
					className='h-56 w-56 cursor-pointer'
					style={{
						position: "absolute",
						margin: "auto",
						left: 0,
						right: 0,
						bottom: "-6rem"
					}}
					color="green" />
			</div>
			<div style={{ position: "relative" }}>
				<Lottie
					style={{ width: "38.5rem", }}
					options={defaultOptions_PAID}
				/>
				<img
					alt="play"
					onClick={() => ModalOpen(1, false)}
					src={Play2Png}
					className='h-56 w-56 cursor-pointer'
					style={{
						position: "absolute",
						margin: "auto",
						left: 0,
						right: 0,
						bottom: "-6rem"
					}}
					color="green" />
			</div>
		</div>
	</div>)

}



export default RenderScan