
/* eslint-disable */
/* eslint-disable react/no-direct-mutation-state */
import { UserCircleIcon, BriefcaseIcon, LogoutIcon, PuzzleIcon } from '@heroicons/react/outline'
import Coin from '../../../assets/coin.webp'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './DropDown.css'

const MobileDropDown = (props) => {

	const logout = () => {
		localStorage.removeItem("username")
		localStorage.removeItem("publicToken")
		localStorage.removeItem('accessToken')
		localStorage.removeItem('gameState')
		localStorage.removeItem('gameConfig')
		localStorage.removeItem('isResultPosted')
		localStorage.removeItem('gameStats')
		window.location.reload()
	}

	const user = localStorage.getItem('username')
	const [isLogin, setIsLogin] = useState(false)

	useEffect(() => {
		if (user !== null) setIsLogin(true)
		else setIsLogin(false)
	}, [])


	return (
		<div style={{ padding: ".4rem .2rem", display: "flex", flexDirection: "column" }}>
			{isLogin ? <div className="custom_drop_down_header" style={{ color: "white" }}>
				<div>Welcome, {localStorage.getItem("username")}</div>
				<div style={{ display: "flex", justifyContent: "center", padding: ".5rem" }} >
					<div className='custom_drop_down_content_item neu neu_end no_border my-2 w-60 scaler'>
						<img width={"30px"} src={Coin} alt="coin" />
						<div>{props.balance} REND</div>
					</div>
				</div>
			</div> : null}
			{isLogin ?
				<div>
					<hr className='divider' />
					<div style={{ color: "wheat", fontSize: "1.2rem", fontWeight: "bold", margin: "1rem 1rem 1rem 1rem" }}>Profile</div>
					<div className="custom_drop_down_content">
						<div className='custom_drop_down_content_item neu neu_end no_border scaler'>
							<UserCircleIcon className="h-8 w-8" />
							<div>Profile</div>
						</div>
						<div className='custom_drop_down_content_item neu neu_end no_border scaler'>
							<BriefcaseIcon className="h-8 w-8" />
							<div>Wallet</div>
						</div>
					</div>
					<hr className='divider' />
				</div>
				: null
			}
			<div style={{ color: "wheat", fontSize: "1.2rem", fontWeight: "bold", margin: "0rem 1rem 1rem 1rem" }}>Games</div>
			<div className="custom_drop_down_content">
				<Link to="/rendle" className='custom_drop_down_content_item neu neu_end no_border scaler'>
					<PuzzleIcon className="h-8 w-8" />
					<div>Rendle</div>
				</Link>
				<Link to="/hangman" className='custom_drop_down_content_item neu neu_end no_border scaler'>
					<PuzzleIcon className="h-8 w-8" />
					<div>Hang-man</div>
				</Link>
				<Link to="/rendle-hunt" className='custom_drop_down_content_item neu neu_end no_border scaler'>
					<PuzzleIcon className="h-8 w-8" />
					<div>Render-hunt</div>
				</Link>

				<Link to="/raffle" className='custom_drop_down_content_item neu neu_end no_border scaler'>
					<PuzzleIcon className="h-8 w-8" />
					<div>Raffle</div>
				</Link>
			</div>

			<hr className='divider' />
			<div className="custom_drop_down_footer" style={{ marginBottom: 20 }}>
				{isLogin ?
					<div onClick={logout} className='custom_drop_down_content_item neu neu_end no_border scaler'>
						<LogoutIcon className="h-8 w-8" />
						<div>Logout</div>
					</div> :
					<Link to="/login" className='custom_drop_down_content_item neu neu_end no_border scaler'>
						<LogoutIcon className="h-8 w-8" />
						<div>Login</div>
					</Link>
				}
			</div>
		</div>
	)
}

export default MobileDropDown 