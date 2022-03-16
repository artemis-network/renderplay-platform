import Countdown from "react-countdown"
import CoinIcon from '../../../assets/coin.png'

import { Button, ProgressBar } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { PlayIcon, BanIcon } from '@heroicons/react/outline'


import './ContestCard.css'
import { useEffect, useState } from "react"
import { get_player_status } from '../../../service/game.service'

const ContestCard = (props) => {

	const [isCompleted, setIsCompleted] = useState(false)
	const history = useHistory()

	useEffect(() => {
		const username = localStorage.getItem("username")
		if (username) {
			get_player_status({ username: username })
				.then(res => {
					if (props.gameConfig.starts_on === res.data.status.began_at) {
						setIsCompleted(true)
					} else {
						setIsCompleted(false)
					}
				})
				.catch(err => { console.log(err) })
		}
	}, [isCompleted, props.gameConfig.starts_on])


	function expiredIn() {
		const now = new Date(Date.now() + (1000 * 60 * 60 * 5) + (1000 * 60 * 30))
		const time = new Date(props.gameConfig.starts_on)
		const exp = time.getTime() - now.getTime()
		return exp
	}

	function colorFinder() {
		const now = new Date(Date.now() + (1000 * 60 * 60 * 5) + (1000 * 60 * 30))
		const time = new Date(props.gameConfig.starts_on)
		const exp = time.getTime() - now.getTime()
		if (exp < 0)
			return "live"
		else return "next"
	}

	function progressFinder() {
		const curr = new Date();
		const start = new Date(props.gameConfig.starts_on);
		const end = new Date();
		start.setMinutes(start.getMinutes());
		end.setMinutes(start.getMinutes() + 30);
		const duration = end.getMinutes() - start.getMinutes();
		let t = (curr.getMinutes() - start.getMinutes()) / duration;
		t += 1
		t *= 100
		return t
	}

	const gameConfig = (i) => {
		const username = localStorage.getItem("username")
		if (username !== null) {
			history.push("/wordle/game")
			localStorage.setItem("gameConfig", JSON.stringify(i))
		}
		else
			history.push("/login")

	}

	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			return <div className='contest_card__action'>
				<div>
					{expiredIn() > -1000 * 60 * 30 ?
						<Button onClick={() => gameConfig(props.gameConfig)}>Play Now</Button>
						:
						<Button disabled>Completed</Button>
					}
				</div>
			</div>
		} else {
			return <div className='contest_card__action'>
				<Button disabled>Opens Soon</Button>;
			</div>
		}
	};

	const exp_renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			return <div>
				{
					expiredIn() > -1000 * 60 * 30 ?

						<div className="contest_card__header">
							<PlayIcon
								color="#219f94"
								className="h-8 w-8 m-2 cursor-pointer dark:stroke-white"
							/>
							<div style={{ color: "#219f94" }}>
								Live
							</div>
						</div>
						:
						<div className="contest_card__header expired">
							<BanIcon
								color="#74959A"
								className="h-8 w-8 m-2 cursor-pointer dark:stroke-white"
							/>
							<div style={{ color: "#74959A" }}>
								Expired
							</div>
						</div>
				}
			</div>
		} else {
			return <div className="contest_card__header next">
				<PlayIcon
					color="#F10086"
					className="h-8 w-8 m-2 cursor-pointer dark:stroke-red"
				/>
				<div style={{ color: "#F10086", display: "flex", columnGap: "6rem" }}>
					Later <div style={{ fontSize: ".8rem" }}>{hours}h:{minutes}m:{seconds}:s</div>
				</div>
			</div>
		}
	}

	const Completed = () => {
		return <div key={props.gameConfig.id} className='contest_card expired'>
			<Countdown renderer={exp_renderer} date={Date.now() + expiredIn()} />
			<div className="contest_card__image">
				<Button>New</Button>
				<img width="100%" alt='coin' src={CoinIcon} />
			</div>
			<div className='contest_card__content expired'>
				<div className="contest_card__content_header">Last Price</div>
				<div className="contest_card__content_subheader">$320</div>

				<div className='c_item'>
					<div>Pool Prize</div>
					<div>$342</div>
				</div>
				<div className='c_item'>
					<div>Challege</div>
					<div>{props.gameConfig.id} letters</div>

				</div>
			</div>
			<div className="contest_card__action">
				<div>
					<Button disabled>Completed</Button>
				</div>
			</div>
		</div>

	}

	const Running = () => {
		return (
			<div key={props.gameConfig.id} className={'contest_card ' + colorFinder()}>
				<Countdown renderer={exp_renderer} date={Date.now() + expiredIn()} />
				{expiredIn() < 0 && expiredIn() > -1000 * 60 * 30 ? <ProgressBar now={progressFinder()} /> : null}
				<div className="contest_card__image">
					<Button>New</Button>
					<img width="100%" alt='coin' src={CoinIcon} />
				</div>
				<div className={"contest_card__content " + colorFinder()}>
					<div className="contest_card__content_header">Last Price</div>
					<div className="contest_card__content_subheader">$320</div>

					<div className='c_item'>
						<div>Pool Prize</div>
						<div>$342</div>
					</div>
					<div className='c_item'>
						<div>Challege</div>
						<div>{props.gameConfig.id} letters</div>

					</div>
				</div>
				<div className="contest_card__action">
					<Countdown renderer={renderer} date={Date.now() + expiredIn()} />
				</div>
			</div>
		)
	}


	return (
		<div> {isCompleted ? <Completed /> : <Running />} </div>
	)
}

export default ContestCard