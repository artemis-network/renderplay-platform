import { useFormik } from "formik";
import { useState } from "react";
import { signUp } from "../service/auth.service";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";

import Bar from "../components/wordle/Bar/Bar";
import Logo from "../assets/logo.webp";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/outline";

const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,10}$/;
  return usernameRegex.test(username);
};

const validate = (values) => {
  const errors = {};
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.name) errors.name = "*Required";

  if (!values.username) errors.username = "*Required";
  else if (isValidUsername(values.username))
    errors.username = "Invalid username";

  if (!values.email) errors.email = "*Requried";
  else if (!emailRegex.test(String(values.email).toLowerCase()))
    errors.email = "Invalid email";

  if (!values.password) errors.password = "*Requried";

  if (!values.confirmPassword) errors.confirmPassword = "*Requried";
  else if (values.confirmPassword !== values.password)
    errors.confirmPassword = "*Password and confirm password are not same";

  if (!values.accept) errors.accept = "*Please accepts terms and conditions";
  return errors;
};

const Signup = () => {
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
          console.log(res.data);
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
          }
        })
        .catch((err) => {
          setStatus({
            status: 500,
            error: true,
            message: "Internal Server Errror",
          });
        });

      setTimeout(() => {
        setStatus({});
      }, 5000);
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
                <UserCircleIcon className="h-6 w-6" color="black" />
              </span>
              <input
                type="text"
                className="form-control"
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
                <UserCircleIcon className="h-6 w-6" color="black" />
              </span>
              <input
                type="text"
                className="form-control"
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
                <UserCircleIcon className="h-6 w-6" color="black" />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={form.values.email}
                onChange={form.handleChange}
                onFocus={form.handleChange}
                id="email"
              />
              {form.touched.email || form.errors.email ? (
                <div style={error}> {form.errors.email} </div>
              ) : (
                <div> </div>
              )}
            </div>
            <div className="field">
              <span>
                <LockClosedIcon className="h-6 w-6" color="black" />
              </span>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                value={form.values.password}
                onChange={form.handleChange}
                onFocus={form.handleChange}
              />
              {form.touched.password || form.errors.password ? (
                <div style={error}> {form.errors.password} </div>
              ) : null}
            </div>

            <PasswordStrengthBar password={form.values.password} />
            <div className="field">
              <span>
                <LockClosedIcon className="h-6 w-6" color="black" />
              </span>
              <input
                id="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={form.values.confirmPassword}
                onChange={form.handleChange}
                onFocus={form.handleChange}
              />
              {form.touched.confirmPassword || form.errors.confirmPassword ? (
                <div style={error}> {form.errors.confirmPassword} </div>
              ) : null}
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="accept"
                value={form.values.accept}
                onChange={form.handleChange}
                onFocus={form.handleChange}
              />
              <label className="form-check-label text-muted" htmlFor="accept">
                I Accept{" "}
                <Link to="/" className="text-primary">
                  Terms And Condition
                </Link>
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
                <small className="text-muted me-2">
                  Already have an account ?{" "}
                </small>{" "}
                <Link to="/login" className="text-dark fw-medium">
                  Sign in
                </Link>
              </small>
            </div>
            {/*end col*/}
            <p className="mb-0 text-muted mt-3 text-center">© Renderverse.</p>
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
