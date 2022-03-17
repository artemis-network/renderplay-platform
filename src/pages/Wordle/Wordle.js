import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { get_types } from '../../service/game.service'
import Bar from '../../components/wordle/Bar/Bar'
import Card2 from '../../components/wordle/ContestCard/Card2'
import Five from '../../assets/5rendle.png'
import Six from '../../assets/6rendle.png'
import Seven from '../../assets/7rendle.png'


import Line1 from '../../assets/line1.png'
import Line2 from '../../assets/line2.png'

import './Wordle.css'
import { Container } from 'react-bootstrap'

const Wordle = () => {

	const [game_types, set_game_types] = useState({ game_types: [] })
	console.log(game_types)

	useEffect(() => {
		get_types().then(res => {
			set_game_types({ game_types: res.data.game_types.splice(0, 3) })
		}).catch(err => console.log(err))


	}, [])


	return (<div style={{ background: "#ffffff" }}>
		<Header />
		<div className="container__bg">
			<Bar />
			<Container>
				<div className="contest">
					<Card2 icon={Line2} img={Five} index={"_1"} />
					<Card2 icon={Line1} img={Six} index={"_2"} />
					<Card2 icon={Line2} img={Seven} index={"_3"} />
				</div>
			</Container>
		</div>
	</div>)
}
export default Wordle
