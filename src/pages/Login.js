import { useState } from "react";
import { Link } from "react-router-dom";
import { login, createSession, loginGoogle } from "../service/auth.service";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router";
import { useFormik } from "formik";

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
          console.log(res);
          createSession(res.data);
          if (res.data.error) {
            setStatus({
              status: 500,
              error: true,
              message: res.data.message,
            });
          } else {
            history.push("/wordle");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
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
    <section
      className="bg-home d-flex align-items-center position-relative"
      style={{ background: 'url("images/bg/user.jpg") center' }}
    >
      <div className="bg-overlay bg-gradient-primary opacity-8" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="form-signin p-4 bg-light rounded shadow-md">
              <form>
                {status.status ? (
                  <div>
                    <div>
                      {!status.error ? (
                        <div class="alert alert-success">{status.message}</div>
                      ) : null}
                    </div>
                    <div>
                      {status.error ? (
                        <div class="alert alert-danger">{status.message}</div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
                <Link to="/">
                  <img
                    src="images/icon-gradient.png"
                    className="avatar avatar-md-md mb-4 d-block mx-auto"
                    alt=""
                  />
                </Link>
                <h5 className="mb-3">Please sign in</h5>
                <div className="form-floating mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="name@example.com"
                    value={form.values.username}
                    onChange={form.handleChange}
                  />
                  <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={form.values.password}
                    onChange={form.handleChange}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="d-flex justify-content-between">
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
                  onClick={form.handleSubmit}
                  className="btn btn-outline-primary w-100"
                  type="submit"
                >
                  Sign in
                </button>
                <div
                  style={{
                    margin: "1rem 0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <GoogleLogin
                    style={{ width: "100%" }}
                    clientId={"461311621504-7qc2ioaio08dvv3f2q2f5l25rm0ct0to.apps.googleusercontent.com"}
                    buttonText="Signin with Google"
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
        </div>
      </div>
    </section>
  );
};

export default Login;
