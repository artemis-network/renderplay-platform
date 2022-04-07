import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { login, createSession, loginGoogle } from "../service/auth.service";
import GoogleLogin from "react-google-login";

import Logo from '../assets/logo.webp'

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
    let uname = data.profileObj.email
    const split = uname.split("@")
    const data_c = {
      name: data.profileObj.givenName,
      email: data.profileObj.email,
      username: split[0]
    }
    loginGoogle(data_c).then((res => {
      createSession(res.data);
      history.push("/rendle")
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
            history.push("/rendle");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err)
          setStatus({
            status: 500,
            error: true,
            message: "",
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
                <UserCircleIcon className="h-6 w-6" color="white" />
              </span>
              <input
                id="username"
                name="username"
                placeholder="Username or email"
                value={form.values.username}
                onChange={form.handleChange}
                type="email"
                autoComplete="off"
              />
            </div>
            <div className="field">
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
                    className="form-check-label text-light"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <small className="forgot-pass text-light mb-0">
                <div className="text-light fw-medium">
                  Forgot password ?
                </div>
              </small>
            </div>

            <button
              className="n_button"
              onClick={form.handleSubmit}
              type="submit"
            >
              Sign in
            </button>


            <div style={{ display: "flex", justifyContent: "center", }}>
              <GoogleLogin
                clientId={"461311621504-7qc2ioaio08dvv3f2q2f5l25rm0ct0to.apps.googleusercontent.com"}
                onFailure={handleFailure}
                onSuccess={handleSuccess}
                color="#FFFFFF"
                theme="dark"
              ></GoogleLogin>
            </div>

            <div className="col-12 text-center mt-3">
              <small>
                <small className="text-light me-2">
                  Don't have an account ?
                </small>{" "}
                <Link to="/signup" className="text-light fw-medium">
                  Sign Up
                </Link>
              </small>
            </div>
            {/*end col*/}
            <p className="mb-0 text-light mt-3 text-center">
              © Renderverse.
            </p>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Login;
