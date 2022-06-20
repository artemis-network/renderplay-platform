import { useState, lazy } from "react";
import { useFormik } from "formik";

import { useHistory, useParams } from "react-router-dom";

const Bar = lazy(() => import("../common/bar/Bar"));

import PasswordStrengthBar from "react-password-strength-bar";

import { LockClosedIcon, } from "@heroicons/react/outline";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

import './Form.css'

import { changePasswordRequest } from "../../service/user.service";

const validate = (values) => {
	const errors = {};
	if (!values.password) errors.password = "*requried";
	if (values.password.length < 7) errors.password = "*min 8 characters";

	if (!values.confirmPassword) errors.confirmPassword = "*requried";
	else if (values.confirmPassword !== values.password)
		errors.confirmPassword = "*password and confirm password are not same";

	return errors;
};

const ChangePassword = () => {
	const history = useHistory();
	const params = useParams();

	const form = useFormik({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validate,
		enableReinitialize: true,
		onSubmit: (values) => {
			changePasswordRequest(values, params.token).then((res) => {
				console.log(res)
			}).catch((err) => console.log(res))
		},
	});

	const [status, setStatus] = useState({ status: null, message: "", errorType: "", error: false, });
	const [showPassword, setShowPassword] = useState(false);

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
				<div className="content">
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


						{!showPassword ? (
							<div className="field" style={{ position: "relative" }}>
								<span>
									<LockClosedIcon className="h-6 w-6" color="white" />
								</span>
								<input
									type="password"
									id="password"
									placeholder="Password"
									value={form.values.password}
									onChange={form.handleChange}
									autoComplete="off"
								/>
								<div style={{ position: "absolute", right: "1%", top: "30%" }}>
									<EyeIcon
										onClick={() => setShowPassword(true)}
										className="h-6 w-6 cursor-pointer"
										color="white"
									/>
								</div>
								{form.touched.password || form.errors.password ? (
									<div style={error}> {form.errors.password} </div>
								) : null}
							</div>
						) : (
							<div className="field" style={{ position: "relative" }}>
								<span>
									<LockClosedIcon className="h-6 w-6" color="white" />
								</span>
								<input
									type="text"
									id="password"
									placeholder="Password"
									value={form.values.password}
									onChange={form.handleChange}
									autoComplete="off"
								/>
								<div style={{ position: "absolute", right: "1%", top: "30%" }}>
									<EyeOffIcon
										onClick={() => setShowPassword(false)}
										className="h-6 w-6 cursor-pointer"
										color="white"
									/>
								</div>
								{form.touched.password || form.errors.password ? (
									<div style={error}> {form.errors.password} </div>
								) : null}
							</div>
						)}
						<PasswordStrengthBar password={form.values.password} />
						<div className="field">
							<span>
								<LockClosedIcon className="h-7 w-7" color="white" />
							</span>
							<input
								id="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								value={form.values.confirmPassword}
								onChange={form.handleChange}
								onFocus={form.handleChange}
								autoComplete="off"
							/>
							{form.touched.confirmPassword || form.errors.confirmPassword ? (
								<div style={error}> {form.errors.confirmPassword} </div>
							) : null}
						</div>

						<button
							className="n_button"
							onClick={form.handleSubmit}
							type="submit"
						>
							Change
						</button>
						<p className="mb-0 text-light mt-3 text-center">© Renderverse.</p>
					</form>
				</div>
			</div>
		</div>
	);
};

const error = {
	fontSize: ".9rem",
	color: "#FF5403",
	padding: "0 .5rem",
	display: "block",
};

export default ChangePassword;
