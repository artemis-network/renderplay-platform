import { useState, lazy } from "react";
import { useFormik } from "formik";

import { Link } from "react-router-dom";
import { signUp } from "../service/auth.service";
import { useHistory } from "react-router-dom";

const Bar = lazy(() => import("../components/wordle/Bar/Bar"));
import PasswordStrengthBar from "react-password-strength-bar";

import Logo from "../assets/logo.webp";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/outline";

const isValidUsername = (username) => /^[a-z0-9]{6}$/.test(username);

const isValidEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const toLowerCase = (text) => String(text).toLowerCase();

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = "*required";

  if (!values.username) errors.username = "*required";
  else if (isValidUsername(toLowerCase(values.username)))
    errors.username = "*username should be alpha numeric";
  else if (values.username.length < 7) errors.username = "*min 6 characters";

  if (!values.email) errors.email = "*requried";
  else if (!isValidEmail(toLowerCase(values.email)))
    errors.email = "*invalid email";

  if (!values.password) errors.password = "*requried";
  if (values.password.length < 7) errors.password = "*min 8 characters";

  if (!values.confirmPassword) errors.confirmPassword = "*requried";
  else if (values.confirmPassword !== values.password)
    errors.confirmPassword = "*password and confirm password are not same";

  if (!values.accept) errors.accept = "*please accepts terms and conditions";
  return errors;
};

const Signup = () => {
  const history = useHistory();

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
      accept: false,
    },
    validate,
    enableReinitialize: true,
    onSubmit: (values) => {
      signUp(values)
        .then((res) => {
          if (res.data.errorType === "USER_ALREADY_EXIST") {
            setStatus({
              status: res.data.status,
              error: res.data.error,
              message: res.data.message,
            });
          }

          if (res.data.errorType === "SUCCESS") {
            setStatus({
              status: res.data.status,
              error: res.data.error,
              message:
                "user registration successful, verification email has been sent",
            });
            form.resetForm();
            history.push("/login");
            setStatus({});
          }
        })
        .catch((err) => {
          setStatus({
            status: 500,
            error: true,
            message: "Internal Server Errror",
          });
        });
    },
  });

  const [status, setStatus] = useState({
    status: null,
    message: "",
    errorType: "",
    error: false,
  });

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
          <img src={Logo} alt="logo" />
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
                <UserCircleIcon className="h-7 w-7" color="white" />
              </span>
              <input
                type="text"
                placeholder="Name"
                value={form.values.name}
                onChange={form.handleChange}
                onFocus={form.handleChange}
                id="name"
                autocomplete="off"
              />
              {form.touched.name || form.errors.name ? (
                <div style={error}> {form.errors.name} </div>
              ) : null}
            </div>
            <div className="field">
              <span>
                <UserCircleIcon className="h-7 w-7" color="white" />
              </span>
              <input
                type="text"
                placeholder="Username"
                value={form.values.username}
                onChange={form.handleChange}
                onFocus={form.handleChange}
                id="username"
                autocomplete="off"
              />
              {form.touched.username || form.errors.username ? (
                <div style={error}> {form.errors.username} </div>
              ) : null}
            </div>

            <div className="field">
              <span>
                <UserCircleIcon className="h-7 w-7" color="white" />
              </span>
              <input
                type="email"
                placeholder="name@example.com"
                value={form.values.email}
                onChange={form.handleChange}
                onFocus={form.handleChange}
                id="email"
                autoComplete="off"
              />
              {form.touched.email || form.errors.email ? (
                <div style={error}> {form.errors.email} </div>
              ) : (
                <div> </div>
              )}
            </div>
            <div className="field">
              <span>
                <LockClosedIcon className="h-7 w-7" color="white" />
              </span>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={form.values.password}
                onChange={form.handleChange}
                onFocus={form.handleChange}
                autoComplete="off"
              />
              {form.touched.password || form.errors.password ? (
                <div style={error}> {form.errors.password} </div>
              ) : null}
            </div>

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
            <div className="form-check mb-3">
              <input
                type="checkbox"
                defaultValue
                id="accept"
                value={form.values.accept}
                onChange={form.handleChange}
                onFocus={form.handleChange}
                autoComplete="off"
                className="form-check-input"
              />
              <label className="form-check-label text-light" htmlFor="accept">
                I Accept{" "}
                <Link className="text-primary">Terms And Condition</Link>
              </label>
              {form.touched.accept || form.errors.accept ? (
                <div style={error}> {form.errors.accept} </div>
              ) : null}
            </div>
            <button
              className="n_button"
              onClick={form.handleSubmit}
              type="submit"
            >
              Sign Up
            </button>
            <div className="col-12 text-center mt-3">
              <small>
                <small className="text-light me-2">
                  Already have an account ?{" "}
                </small>{" "}
                <Link to="/login" className="text-light fw-medium">
                  Sign in
                </Link>
              </small>
            </div>
            {/*end col*/}
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

export default Signup;
