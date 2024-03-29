import { lazy, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { login, createSession, loginGoogle } from "../../service/user.service";
import GoogleLogin from "react-google-login";

import Logo from '../../assets/logo.webp'

const Bar = lazy(() => import("../common/bar/Bar"));

import { UserCircleIcon, LockClosedIcon, EyeIcon } from '@heroicons/react/outline'
import './Form.css'
import { EyeOffIcon } from "@heroicons/react/solid";

const Login = () => {

  const history = useHistory()

  const [status, setStatus] = useState({ message: "", errorType: "", error: false });
  const [showPassword, setShowPassword] = useState(false)

  const handleSuccess = (data) => {
    const tokenData = { token: data.tokenId }
    loginGoogle(tokenData).then((res => {
      console.log(res.data)
      setStatus({ error: res.data.error, message: res.data.message });
      if (!res.data.error) {
        createSession(res.data);
        history.push("/")
      }
    })).catch(err => console.log(err))
    setTimeout(() => {
      setStatus({});
    }, 5000);
  };

  const handleLoginSuccess = (data) => {
    createSession(data);
    if (data.error)
      setStatus({ error: data.error, message: data.message });
    else {
      createSession(data)
      history.push("/");
    }
    setTimeout(() => {
      setStatus({});
    }, 5000);

  }

  const handleLoginFailure = () =>
    setStatus({ error: true, message: "Internal Server Errror" });


  const form = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (values) => {

      login(values)
        .then((res) => handleLoginSuccess(res.data))
        .catch((err) => handleLoginFailure());



    },
  });



  return (
    <div style={{ background: "#321E43", }}>
      <Bar />
      <div style={{ display: "flex", justifyContent: "center", margin: "10rem " }}>
        <div className="content">
          <img src={Logo} alt="logo" />
          <form action="#">
            <div>
              <div>
                {!status.error && status.errorType === "NONE" ? (
                  <div className="alert alert-success">{status.message}</div>
                ) : null}
              </div>
              <div>
                {status.error ? (
                  <div className="alert alert-danger">{status.message}</div>
                ) : null}
              </div>
            </div>

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

            {
              !showPassword ?
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
                  <div style={{ position: "absolute", right: "1%", top: "30%", }}>
                    <EyeIcon onClick={() => setShowPassword(true)} className="h-6 w-6 cursor-pointer" color="white" />
                  </div >
                </div>
                :
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
                  <div style={{ position: "absolute", right: "1%", top: "30%", }}>
                    <EyeOffIcon onClick={() => setShowPassword(false)} className="h-6 w-6 cursor-pointer" color="white" />
                  </div >
                </div>
            }


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
              <Link to="/forgot-password">
                <small className="forgot-pass text-light mb-0">
                  <div className="text-light fw-medium">
                    Forgot password ?
                  </div>
                </small>
              </Link>
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
                onFailure={() => { }}
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
