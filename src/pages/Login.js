import { useState } from "react";
import { Link } from "react-router-dom";
import { login, createSession, loginGoogle } from "../service/auth.service";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router";
import { useFormik } from "formik";

import Logo from '../assets/logo.png'

import Bar from '../components/wordle/Bar/Bar'
import { UserCircleIcon, LockClosedIcon } from '@heroicons/react/outline'
import './Form.css'

const Login = () => {

  const history = useHistory()

  const [status, setStatus] = useState({
    status: null,
    message: "",
    errorType: "",
    error: false,
  });

  const handleSuccess = (data) => {
    const data_c = {
      name: data.profileObj.givenName,
      email: data.profileObj.email
    }
    loginGoogle(data_c).then((res => {
      createSession(res.data);
      history.push("/wordle")
      window.location.reload()
    })).catch(err => console.log(err))

  };

  const handleFailure = (data) => {
    console.log(data);
  };

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values)
        .then((res) => {
          createSession(res.data);
          if (res.data.error) {
            setStatus({
              status: res.data.status,
              error: res.data.error,
              message: res.data.message,
            });
          } else {
            history.push("/wordle");
            window.location.reload();
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



  return (
    <div style={{ background: "#321E43", }}>
      <Bar />
      <div style={{ display: "flex", justifyContent: "center", margin: "10rem " }}>
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
                id="username"
                name="username"
                placeholder="name@example.com"
                value={form.values.username}
                onChange={form.handleChange}
                type="email"
              />
            </div>
            <div className="field">
              <span>
                <LockClosedIcon className="h-6 w-6" color="black" />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={form.values.password}
                onChange={form.handleChange}
              />
            </div>

            <div style={{ padding: "2rem 0 0 0" }} className="d-flex justify-content-between">
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label text-muted"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <small className="forgot-pass text-muted mb-0">
                <Link
                  to="/auth/reset-password"
                  className="text-muted fw-medium"
                >
                  Forgot password ?
                </Link>
              </small>
            </div>

            <button
              className="n_button"
              onClick={form.handleSubmit}
              type="submit"
            >
              Sign in
            </button>


            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                clientId={"461311621504-7qc2ioaio08dvv3f2q2f5l25rm0ct0to.apps.googleusercontent.com"}
                onFailure={handleFailure}
                onSuccess={handleSuccess}
              ></GoogleLogin>
            </div>

            <div className="col-12 text-center mt-3">
              <small>
                <small className="text-muted me-2">
                  Don't have an account ?
                </small>{" "}
                <Link to="/signup" className="text-dark fw-medium">
                  Sign Up
                </Link>
              </small>
            </div>
            {/*end col*/}
            <p className="mb-0 text-muted mt-3 text-center">
              © Renderverse.
            </p>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Login;
