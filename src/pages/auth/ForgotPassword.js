import { lazy, useState } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router";

import { forgotPasswordRequest } from "../../service/user.service";

import Dialog from '../common/dialog/Dialog'

const Bar = lazy(() => import("../common/bar/Bar"));

import { UserCircleIcon } from '@heroicons/react/outline'
import './Form.css'

const isValidEmail = (email) =>
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);

const toLowerCase = (text) => String(text).toLowerCase();

const validate = (values) => {
	const errors = {};
	if (!values.email) errors.email = "*requried";
	else if (!isValidEmail(toLowerCase(values.email)))
		errors.email = "*invalid email";
	return errors
};


const ForgotPassword = () => {

	const history = useHistory()

	const form = useFormik({
		initialValues: { email: "" },
		validate,
		enableReinitialize: true,
		onSubmit: (values) => {
			forgotPasswordRequest(values)
				.then((res => {
					setDialog(true)
				})).catch(err => console.log(err))
		},
	});

	const [dialog, setDialog] = useState(false)


	return (
		<div style={{ background: "#321E43", minHeight: "100vh" }}>
			<Bar />
			<Dialog
				show={dialog} close={() => setDialog(false)} action={() => history.push("/login")}
				message={`Password reset link has been sent to your email`}
				header="Successfully" buttonText="Close"
				buttonColor="green" justifyButton="center"
			/>
			<div style={{ display: "flex", justifyContent: "center", margin: "10rem " }}>
				<div className="content">
					<div style={{ color: "white", padding: "2rem", fontSize: "1.1rem", fontWeight: "bold", justifyContent: 'center', alignItems: "center" }}>
						<div style={{ fontSize: '2.6rem', fontWeight: 'bold', paddingBottom: ".5rem" }}>Forgot Password? </div>
						<div>Enter your email to reset password.</div>
					</div>
					<form action="#">
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
							{form.touched.email || form.errors.email ? (
								<div style={error}> {form.errors.email} </div>
							) : (
								<div> </div>
							)}
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

const error = {
	fontSize: ".9rem",
	color: "#FF5403",
	padding: "0 .5rem",
	display: "block",
};



export default ForgotPassword;
