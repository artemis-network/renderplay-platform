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

import { get_rendles } from '../../service/game.service'

import './Wordle.css'

const ContestCard = lazy(() => import('../../components/wordle/ContestCard/ContestCard'))
const Bar = lazy(() => import("../../components/wordle/Bar/Bar"))
const Footer = lazy(() => import("../../components/wordle/Footer/Footer"))

const game_types_data = [
	{
		contest_id: null,
		game_type: 5,
		id: 1,
		is_expired: true,
		starts_on: null
	},
	{
		contest_id: 2,
		game_type: 6,
		id: 2,
		is_expired: false,
		starts_on: null
	},
	{
		contest_id: 3,
		game_type: 7,
		id: 3,
		is_expired: false,
		starts_on: null
	}
]


const Wordle = () => {


	const [game_types, set_game_types] = useState(
		{
			game_types: [...game_types_data],
			mobile_view: [...game_types_data]
		}
	)

	useEffect(() => {
		localStorage.removeItem("game_state_id")
		localStorage.removeItem("gameState")
		localStorage.removeItem("gameConfig")
		get_rendles().then(res => {
			let data = res.data.game_types
			let temp = []
			let temp_m = []
			console.log(res.data)
			if (data[0] !== undefined) {
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
						temp_m[0] = data[i]
						temp_m[0].css = "_scale"
					}
					if (isLive < - 1000 * 60 * 60 * 8) {
						temp[0] = data[i]
						temp[0].css = "_fade"
						temp_m[2] = data[i]
						temp_m[2].css = "_fade"
					}
					if (isLive > 0) {
						temp[2] = data[i]
						temp[2].css = "_fade"
						temp_m[1] = data[i]
						temp_m[1].css = "_fade"
					}

					if (isLive) data[i].live = true
					else data[i].live = false
				}
				set_game_types({ game_types: temp, mobile_view: temp_m })
			}
		}).catch(err => set_game_types({ game_types: [...game_types_data], mobile_view: [...game_types_data] }))
	}, [game_types.game_types[0].starts_on])

	return (<div >
		<div className="container__bg">
			<Bar isGame={false} />
			<Container>
				<div className="contest">
					{game_types.game_types.map((game, i) => <div key={game.contest_id} className={game.css}>
						<ContestCard  {...game} key={i} index={i} />
					</div>)}
				</div>

				<div className="contest_mobile">
					{game_types.mobile_view.map((game, i) => <div key={game.contest_id} className={game.css}>
						<ContestCard  {...game} key={i} index={i} />
					</div>)}
				</div>
			</Container>
		</div>
		<Footer />
	</div>)
}
export default Wordle