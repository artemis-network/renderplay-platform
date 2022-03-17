import Countdown from "react-countdown"

import { Button, ProgressBar } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { PlayIcon, BanIcon } from '@heroicons/react/outline'
import React from 'react'


import { useEffect, useState } from "react"
import { get_player_status } from '../../../service/game.service'
import Card2 from './Card2'

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

	const indexFinder = () => {
		const ind = "_" + Number(props.index + 1)
		console.log(ind)
		return ind
	}

	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			return <div className='contest_card__action'>
				<div>
					{expiredIn() > -1000 * 60 * 30 ?
						<Button onClick={() => gameConfig(props.gameConfig)}>Play Now</Button>
						:
						null
					}
				</div>
			</div>
		}
		else return null
	};

	const exp_renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			return <div>
				{
					expiredIn() > -1000 * 60 * 30 ?
						<div className={"contest_card__header " + colorFinder()}>
							<PlayIcon
								color="#219f94"
								className="h-8 w-8 m-2 cursor-pointer dark:stroke-white"
							/>
							<div style={{ color: "#219f94" }}>
								Live
							</div>
						</div>
						:
						<div className={"contest_card__header " + colorFinder()}>
							<BanIcon
								color="#74959A"
								className="h-6 w-6 m-2 cursor-pointer dark:stroke-white"
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
		return (
			<div key={props.gameConfig.id} className={'contest_card ' + colorFinder()}>
				<Countdown renderer={exp_renderer} date={Date.now() + expiredIn()} />
				{expiredIn() < 0 && expiredIn() > -1000 * 60 * 30 ? <ProgressBar now={progressFinder()} /> : null}
				<div className={"contest_card__content " + colorFinder()}>
					<div className="c_items">
						<div className='c_item'>
							<div>Pool Prize</div>
							<div>Winner</div>
						</div>
						<div className='c_item'>
							<div>$50</div>
							<div>0/5</div>
						</div>
					</div>
				</div>
				<div className="contest_card__action">
					<Countdown renderer={renderer} date={Date.now() + expiredIn()} />
				</div>
			</div>
		)
	}

	const Running = () => {
		return (
			<div key={props.gameConfig.id} className={'contest_card ' + colorFinder()}>
				<Countdown renderer={exp_renderer} date={Date.now() + expiredIn()} />
				{expiredIn() < 0 && expiredIn() > -1000 * 60 * 30 ? <ProgressBar now={progressFinder()} /> : null}
				<div className={"contest_card__content " + colorFinder()}>
					<div className="c_items">
						<div className='c_item'>
							<div>Pool Prize</div>
							<div>Winner</div>
						</div>
						<div className='c_item'>
							<div>$50</div>
							<div>0/5</div>
						</div>
					</div>
				</div>
				<div className="contest_card__action">
					<Countdown renderer={renderer} date={Date.now() + expiredIn()} />
				</div>
			</div>
		)
	}

	const svgRef = React.useRef(null)
	const [toggle, setToggle] = React.useState(false)

	useEffect(() => {
		console.log()
	}, [svgRef])

	const onMenuShow = () => {
		setToggle(!toggle)
		if (toggle) {
			svgRef.current.setAttribute("height", "50")
			svgRef.current.setAttribute("viewBox", "0 0 1400 700")
		}
		else {
			svgRef.current.setAttribute("viewBox", "0 0 1400 700")
			svgRef.current.setAttribute("height", "400")
		}
	}

	return (
		<div>
			<Card2 index={indexFinder()} />
		</div>
	)
}

export default ContestCard