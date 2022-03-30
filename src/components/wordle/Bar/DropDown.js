/* eslint-disable */
import { UserCircleIcon, BriefcaseIcon, LogoutIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import './DropDown.css'

const CustomDropDown = () => {

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

	const [toggle, setToggle] = useState("custom_drop_down close")

	const toggler = () => {
		if (toggle === "custom_drop_down close") return setToggle("custom_drop_down open")
		if (toggle === "custom_drop_down open") setToggle("custom_drop_down close")
	}

	return (
		<div onClick={toggler} style={{ padding: ".4rem .2rem" }} className="neu neu_end drop_container no_border">
			<div className='scaler'>
				<UserCircleIcon className="h-10 w-10 " />
			</div>
			<div className={toggle}>
				<div className="custom_drop_down_header">
					<div>Welcome, {localStorage.getItem("username")}</div>
				</div>
				<hr className='divider' />
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
				<div className="custom_drop_down_footer">
					<div onClick={logout} className='custom_drop_down_content_item neu neu_end no_border scaler'>
						<LogoutIcon className="h-8 w-8" />
						<div>Logout</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CustomDropDown 