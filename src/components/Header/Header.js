import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Header.css'

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

const Header = () => {
	return (
		<header className="navbar_shadow">
			<div className="navbar_contents">
				<div className="navbar_item">
					<div>WORDLE JACKPOT</div>
					<div className="navbar_sub_item">
						<div>250 BNB</div>
						<div>$222250</div>
					</div>
				</div>
			</div>

			<div className="navbar_end">
				<div className="navbar_end_items">
					{
						localStorage.getItem("username") !== null ?
							<div style={{ display: "flex", flexDirection: "column" }}>
								<p style={{ color: "white" }}>Welcome, {localStorage.getItem("username")}</p>
								<Button onClick={logout}>Logout</Button>
							</div>
							:
							<Link to="/login"><Button>Login</Button></Link>
					}
					<Button>Connect Wallet</Button>
				</div>
			</div>

		</header>
	)
}

export default Header