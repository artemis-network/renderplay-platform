import './ContestCard.css'
import { SwitchVerticalIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const Card2 = (props) => {
	return (
		<div style={{ background: `#321E43` }} className={"c-mobile-view"}>
			{/* CONTROLLERS */}
			<input style={{ display: "none" }} type="checkbox" id={"u-mobile__button" + props.index} name={"u-mobile__button" + props.index} />
			<input style={{ display: "none" }} type="checkbox" id={"u-topbar__button" + props.index} name={"u-topbar__button" + props.index} />
			<input style={{ display: "none" }} type="checkbox" id={"u-cards-switcher__button" + props.index} name={"u-cards-switcher__button" + props.index} />
			{/* / controllers*/}
			{/* MOBILE VIEW CONTAINER */}

			<img style={{ position: "absolute", margin: "3.2rem 0", padding: ".5rem" }} src={props.img} alt="img" />
			<img style={{ position: "absolute", margin: "4rem 0", padding: ".5rem", top: "15rem", zIndex: 4, width: "60rem" }} src={props.icon} alt="img" />
			<div className={"c-mobile-view__inner"}>
				<div className={"c-mobile__topbar"}>
					<label htmlFor={"u-topbar__button" + props.index} className={"c-button c-topbar__button--menu fa fa-bars"}>
						<MenuIcon style={{ transform: "translateY(-1rem)" }} className='h-6 2-6' color='white' />
					</label>
					<label htmlFor={"u-topbar__button" + props.index} className={"c-button c-topbar__button--close fa fa-times"}>
						<XIcon style={{ transform: "translateY(-1rem)" }} className='h-6 2-6' color='white' />
					</label>
					<ul>
						<li><a href className={"u-link__effect"}>Events list</a></li>
						<li><a href className={"u-link__effect"}>Favorites</a></li>
						<li><a href className={"u-link__effect"}>Credits</a></li>
					</ul>
				</div>
				{/* CARDS */}


				<div className={"c-cards__inner"}>
					<div className={"c-card c-card--back"}>
						<div className={"c-card__details"}>
							<div className={"c-card__details__top"}>
								<h1>201-217 Central Park West</h1>
								<p>New York, NY 10024, Stati Uniti</p>
								<p>40.782093, -73.971731</p>
							</div>
							<div className={"c-card__details__bottom"}>12<span>km</span></div>
						</div>
					</div>
					<div className={"c-card c-card--front"}>
						<div className={"c-card__details"}>
							<div className={"c-card__details__top"}>
								<h1>284 5th Avenue</h1>
								<p>New York, NY 10001, Stati Uniti</p>
								<p>40.737330, -73.987470</p>
							</div>
							<div className={"c-card__details__bottom"}>2.4<span>km</span></div>
						</div>
					</div>
				</div>
			</div>
			<div className={"c-overlay"}>

				<div className={"c-overay__inner"}>
					{/* BUTTON 1 */}
					<label htmlFor={"u-mobile__button" + props.index} className={"c-button"}>
						<span className={"c-overlay-inner__button fa fa-star button__1"} />
					</label>
					{/* BUTTON 2 */}
					<label htmlFor={"u-mobile__button" + props.index} className={"c-button"}>
						<span className={"c-overlay-inner__button fa fa-search button__2"} />
					</label>
				</div>
			</div>


			{/* SWITCHER CARDS BUTTON */}
			<label htmlFor={"u-cards-switcher__button" + props.index} className={"c-button c-switcher__button"}>
				<SwitchVerticalIcon className='h-4 w-4' color="white" />
			</label>
			{/* BUTTON + */}
			<label htmlFor={"u-mobile__button" + props.index} className={"c-button c-mobile__button"}>
			</label>
		</div>
	);
}


export default Card2