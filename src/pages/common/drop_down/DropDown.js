/* eslint-disable */
/* eslint-disable react/no-direct-mutation-state */
import { UserCircleIcon, BriefcaseIcon, LogoutIcon } from '@heroicons/react/outline'
import { CameraIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './DropDown.css'
import { useHistory } from 'react-router'

const CustomDropDown = () => {

	const history = useHistory()
	const logout = () => {
		history.push("/")
		localStorage.clear()
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
					<Link to="/scan" className='custom_drop_down_content_item neu neu_end no_border scaler'>
						<CameraIcon className="h-8 w-8" />
						<div>Scan</div>
					</Link>

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