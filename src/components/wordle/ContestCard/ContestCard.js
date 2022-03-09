import Countdown from "react-countdown"

import WinIcon from '../../../assets/icons/win.svg'
import ChipIcon from '../../../assets/icons/chip.svg'
import TimerIcon from '../../../assets/icons/timer.svg'
import CoinIcon from '../../../assets/coin.png'
import { Button } from 'react-bootstrap'

import './ContestCard.css'

const ContestCard = (props) => {

	const Completion = () => <span>Open now</span>

	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			return <Completion />
		} else {
			return <span>{hours}:{minutes}:{seconds}</span>;
		}
	};

	return (
		<div key={props.i} className='contest_card'>
			<div className="contest_card__image">
				<Button>New</Button>
				<img width="100%" alt='coin' src={CoinIcon} />
			</div>
			<div className='contest_card__content'>
				<div className='c_item'>
					<div>
						<img src={WinIcon} alt="coin2"></img>
						<div>2BNB</div>
					</div>
					<div>
						<img src={ChipIcon} alt="coin2"></img>
						<div>10 PTS</div>
					</div>

				</div>
				<div className='c_item'>
					<div>
						<img src={TimerIcon} alt="coin2"></img>
						<div>  {"Starts in _  "}
							<Countdown renderer={renderer} date={Date.now() + 10000 * 100} />
						</div>
					</div>
				</div>
			</div>
			<div className='contest_card__action'>
				<Button onClick={props.isCheck}>Play Now</Button>
			</div>
		</div>

	)
}

export default ContestCard