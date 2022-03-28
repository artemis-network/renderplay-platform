import React, { useEffect, useState } from 'react'

import { get_types } from '../../service/game.service'

import { Container } from 'react-bootstrap'

import ContestCard from '../../components/wordle/ContestCard/ContestCard'

import FiveRendleImg from '../../assets/5rendle.png'
import SixRendleImg from '../../assets/6rendle.png'
import SevenRendleImg from '../../assets/7rendle.png'
import Line1Img from '../../assets/line1.png'
import Line2Img from '../../assets/line2.png'
import RendleFive from '../../assets/rendle_5.png'
import RendleSix from '../../assets/rendle_6.png'
import RendleSeven from '../../assets/rendle_7.png'

import Bar from '../../components/wordle/Bar/Bar'

import './Wordle.css'

const Wordle = () => {

	const [game_types, set_game_types] = useState({ game_types: [] })

	useEffect(() => {
		get_types().then(res => {
			let data = res.data.game_types
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
				const now = new Date(Date.now() + (1000 * 60 * 60 * 9) + (1000 * 60 * 30))
				const time = new Date(data[i].starts_on)
				const isLive = time.getTime() - now.getTime()
				if (isLive) data[i].live = true
				else data[i].live = false
			}
			set_game_types({ game_types: data })
		}).catch(err => console.log(err))
	}, [])

	return (<div>
		<div className="container__bg">
			<Bar />
			<Container>
				<div className="contest">
					{game_types.game_types.map((game, i) => <ContestCard {...game} key={i} index={i} />)}
				</div>
			</Container>
		</div>
	</div>)
}
export default Wordle