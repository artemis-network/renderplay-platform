import { useFormik } from "formik";
import { useState } from "react";
import { signUp } from "../service/auth.service";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";

import Bar from "../components/wordle/Bar/Bar";
import Footer from "../components/wordle/Footer/Footer";

const validate = (values) => {
  const errors = {};
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.name) errors.name = "*Required";
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
            console.log(status);
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
      <form
        style={{ minWidth: "20rem", maxWidth: "30rem", margin: "10rem auto" }}
        className="p-5 bg-light rounded shadow-md"
      >
        <Link to="/">
          <img
            src="images/icon-gradient.png"
            className="avatar avatar-md-md mb-4 d-block mx-auto"
            alt=""
          />
        </Link>
        <h5 className="mb-3">Register your account</h5>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={form.values.name}
            onChange={form.handleChange}
            onFocus={form.handleChange}
            id="name"
          />
          <label htmlFor="name">Full Name</label>
          {form.touched.name || form.errors.name ? (
            <div style={error}> {form.errors.name} </div>
          ) : null}
        </div>
        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={form.values.email}
            onChange={form.handleChange}
            onFocus={form.handleChange}
            id="email"
          />
          <label htmlFor="email">Email Address</label>
          {form.touched.email || form.errors.email ? (
            <div style={error}> {form.errors.email} </div>
          ) : null}
        </div>
        <div className="form-floating mb-3">
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={form.values.password}
            onChange={form.handleChange}
            onFocus={form.handleChange}
          />
          <label htmlFor="password">Password</label>
          {form.touched.password || form.errors.password ? (
            <div style={error}> {form.errors.password} </div>
          ) : null}
        </div>
        <PasswordStrengthBar password={form.values.password} />
        <div className="form-floating mb-3">
          <input
            id="confirmPassword"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={form.values.confirmPassword}
            onChange={form.handleChange}
            onFocus={form.handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
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
          onClick={form.handleSubmit}
          className="btn btn-outline-primary w-100"
          type="button"
        >
          Register
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
      <Footer />
    </div>
  );
};

const error = {
  fontSize: ".9rem",
  color: "#FF5403",
  padding: "0 .5rem",
};

export default Signup;
