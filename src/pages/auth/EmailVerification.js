import { useState, lazy, useEffect } from "react";
import { useHistory, useParams } from "react-router";

const Bar = lazy(() => import("../common/bar/Bar"));

import { validateToken } from "../../service/user.service";

const EmailVerification = () => {
	const history = useHistory()
	const params = useParams()

	const [status, setStatus] = useState({ message: "", error: false, });

	const update = ({ isVerified }) => {
		if (!isVerified) {
			return setStatus({ error: isVerified, message: "Invalid Email or Token." })
		}
		return setStatus({ error: isVerified, message: "Email Verified." })
	}

	useEffect(() => {
		const { token } = params
		validateToken(token)
			.then((res) => update(res.data))
			.catch(err => console.log(err))
	}, [])

	return (
		<div style={{ background: "#321E43" }}>
			<Bar />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					margin: "10rem ",
				}}
			>
				<div style={{ border: `10xp solid gray` }}>
					<div>
						<div style={{ fontSize: "2rem", fontWeight: "bold" }}>
							{status.error ? (
								<div className="alert alert-success text-center">{status.message} </div>
							) : null}
						</div>
						<div>
							{!status.error ? (
								<div className="alert alert-danger text-center">{status.message}</div>
							) : null}
						</div>
					</div>

					<button
						className="btn btn-primary w-64"
						onClick={() => history.push("/login")}
						type="submit"
					>
						Login
					</button>
					<p className="mb-0 text-light mt-3 text-center">© Renderverse.</p>
				</div>
			</div>
		</div>
	);
};

export default EmailVerification;
