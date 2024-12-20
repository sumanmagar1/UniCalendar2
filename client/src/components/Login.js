import React, { useState, props } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // console.log(body);

      const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token); // Save token
      props.setAuth(true); // Update authentication state
    } else {
      console.error("Login failed:", data);
    }
  } catch (error) {
    console.error("Login error:", error.message);
  }
  };

  return (
    <>
      <section className="" style={{ marginTop: 70 }}>
        <div className="container-fluid">
          <div className="row">
            <div className="text-black">
              <div className="px-0 ms-xl-4">
                <span className="h1 fw-bold mb-0"></span>
              </div>
              <div className="d-flex h-custom-2 px-5 ms-xl-4 mt-0 pt-5 pt-xl-0 mt-xl-n5">
                <form
                  style={{
                    width: "30rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onSubmit={onSubmitForm}
                >
                  <h3 className="fw-normal mb-3 pb-3">Log in</h3>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example18">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>


                  <button className="btn btn-success ">Login</button>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </p>
                  <p>
                    Don't have an account?
                    <Link to="/register" className="link-info">
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
