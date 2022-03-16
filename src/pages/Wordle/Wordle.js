import Glide from '@glidejs/glide'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { get_types } from '../../service/game.service'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'
import ContestCard from '../../components/wordle/ContestCard/ContestCard'
import Bar from '../../components/wordle/Bar/Bar'


import './Wordle.css'

const Wordle = () => {

	const [game_types, set_game_types] = useState({ game_types: [] })

	useEffect(() => {
		get_types().then(res => {
			set_game_types({ game_types: res.data.game_types })
			new Glide(".glide", {
				type: "slider",
				perView: 4,
				startAt: 0,
				autoplay: false,
				rewind: true,
				gap: 10,
				bound: false,
				focusAt: 'center'
			})
				.mount();
		}).catch(err => console.log(err))


	}, [])


	return (<div style={{ background: "#ffffff" }}>
		<Header />
		<div className="container__bg">
			<Bar />
			<div className="glide">
				<div className="glide__arrows" data-glide-el="controls">
					<ArrowLeftIcon style={{ color: "black", borderRadius: "2vh" }} className="glide__arrow glide__arrow--left h-12 w-12 my-3 cursor-pointer dark:stroke-dark" data-glide-dir="<">
					</ArrowLeftIcon>
				</div>
				<div className="glide__track" data-glide-el="track">
					<ul className="glide__slides">
						{game_types.game_types.map((i) =>
							<ContestCard className="glide__slide" key={i.starts_on} gameConfig={i}></ContestCard>
						)}
					</ul>
				</div>
				<div className="glide__arrows" data-glide-el="controls">
					<ArrowRightIcon style={{ color: "black", borderRadius: "2vh" }} className="glide__arrow glide__arrow--right h-12 w-12 my-3 cursor-pointer dark:stroke-dark" data-glide-dir=">">
					</ArrowRightIcon>
				</div>
			</div>
		</div>
	</div>)
}
export default Wordle
