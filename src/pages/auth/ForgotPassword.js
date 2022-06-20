import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { forgotPasswordRequest } from "../../service/user.service";


const Bar = lazy(() => import("../common/bar/Bar"));

import { UserCircleIcon } from '@heroicons/react/outline'
import './Form.css'

const ForgotPassword = () => {

	const [status, setStatus] = useState({ status: null, message: "", errorType: "", error: false });

	const form = useFormik({
		initialValues: {
			email: "",
		},
		onSubmit: (values) => {
			forgotPasswordRequest(values)
				.then((res => {
					console.log(res)
				})).catch(err => console.log(err))
			setTimeout(() => {
				setStatus({});
			}, 5000);
		},
	});



	return (
		<div style={{ background: "#321E43", }}>
			<Bar />
			<div style={{ display: "flex", justifyContent: "center", margin: "10rem " }}>
				<div className="content">
					<div style={{ color: "white", padding: "2rem", fontSize: "1.1rem", fontWeight: "bold", justifyContent: 'center', alignItems: "center" }}>
						<div style={{ fontSize: '2.6rem', fontWeight: 'bold', paddingBottom: ".5rem" }}>Forgot Password? </div>
						<div>Enter your email to reset password.</div>
					</div>
					<form action="#">
						{status.status ? (
							<div>
								<div>
									{!status.error ? (
										<div className="alert alert-success">{status.message}</div>
									) : null}
								</div>
								<div>
									{status.error ? (
										<div className="alert alert-danger">{status.message}</div>
									) : null}
								</div>
							</div>
						) : null}

						<div className="field">
							<span>
								<UserCircleIcon className="h-6 w-6" color="white" />
							</span>
							<input
								id="email"
								name="email"
								placeholder="Email"
								value={form.values.email}
								onChange={form.handleChange}
								type="email"
								autoComplete="off"
							/>
						</div>

						<div style={{ display: 'flex', justifyContent: 'center', }}>

							<button
								className="n_button"
								style={{ width: "20vw" }}
								onClick={form.handleSubmit}
								type="submit"
							>
								Submit
							</button>
						</div>


						<p className="mb-0 text-light mt-3 text-center">
							© Renderverse.
						</p>
					</form>
				</div>
			</div>
		</div >
	);
};

export default ForgotPassword;
