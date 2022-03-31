import React, { useEffect, useState, lazy } from 'react'
import { Container } from 'react-bootstrap'

import FiveRendleImg from '../../assets/5rendle.webp'
import SixRendleImg from '../../assets/6rendle.webp'
import SevenRendleImg from '../../assets/7rendle.webp'
import Line1Img from '../../assets/line1.webp'
import Line2Img from '../../assets/line2.webp'
import RendleFive from '../../assets/rendle_5.webp'
import RendleSix from '../../assets/rendle_6.webp'
import RendleSeven from '../../assets/rendle_7.webp'

import { get_types } from '../../service/game.service'

import './Wordle.css'

const ContestCard = lazy(() => import('../../components/wordle/ContestCard/ContestCard'))
const Bar = lazy(() => import("../../components/wordle/Bar/Bar"))
const Footer = lazy(() => import("../../components/wordle/Footer/Footer"))

const Wordle = () => {

	const [game_types, set_game_types] = useState({ game_types: [] })

	useEffect(() => {
		localStorage.removeItem("game_state_id")
		localStorage.removeItem("gameState")
		get_types().then(res => {
			let data = res.data.game_types
			let temp = []
			data[0].img = FiveRendleImg
			data[0].line = Line2Img
			data[0].banner = RendleFive
			data[1].img = SixRendleImg
			data[1].line = Line1Img
			data[1].banner = RendleSix
			data[2].img = SevenRendleImg
			data[2].line = Line2Img
			data[2].banner = RendleSeven

			for (let i in data) {
				const now = new Date(Date.now())
				const time = new Date(data[i].starts_on)
				const isLive = time.getTime() - now.getTime()

				if (isLive < 0 && isLive > -1000 * 60 * 60 * 8) {
					temp[1] = data[i]
					temp[1].css = "_scale"
				}
				if (isLive < - 1000 * 60 * 60 * 8) {
					temp[0] = data[i]
					temp[0].css = "_fade"
				}
				if (isLive > 0) {
					temp[2] = data[i]
					temp[2].css = "_fade"
				}

				if (isLive) data[i].live = true
				else data[i].live = false
			}
			set_game_types({ game_types: temp })
		}).catch(err => console.log(err))
	}, [game_types.game_types.length])

	return (<div>
		<div className="container__bg">
			<Bar isGame={false} />
			<Container>
				<div className="contest">
					{game_types.game_types.map((game, i) => <div className={game.css}>
						<ContestCard  {...game} key={i} index={i} />
					</div>)}
				</div>
			</Container>
		</div>
		<Footer />
	</div>)
}
export default Wordle