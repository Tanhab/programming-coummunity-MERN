import React, { useState,useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container } from "reactstrap"
import DeveloperIcon from "../assets/svg/developer1.svg"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import Spinner from '../components/Spinner'



const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { email, password } = formData

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/")
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    if (isLoading) {
      return <Spinner />
    }
    dispatch(login(userData))
  }
  if(isLoading){
    return <Spinner />
  }

  return (
    <div className="container my-5">
      <div className="registration-form bg-white shadow">
        <div className="row no-gutter">
          <div className="col-md-5 d-none d-md-flex">
            <img src={DeveloperIcon} alt="" className="img-fluid" />
            {/* <div className="top-left">
              <h4 className="text-warning ">
                <strong>LOGIN</strong>
              </h4>
            </div> */}
          </div>

          <div className="col-md-7">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-5">Welcome Back!</h3>
                    <p className="text-warning mb-4">
                      <strong>
                        Please login with your email and password to keep
                        connected with the community.
                      </strong>
                    </p>
                    <form method="post" onSubmit={onSubmit}>
                      <div className="form-group mb-3">
                        <input
                          id="email"
                          type="email"
                          placeholder="Email address"
                          required
                          autoFocus
                          name="email"
                          value={email}
                          onChange={onChange}
                          className="form-control rounded-pill border-1 shadow-sm px-4"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          id="password"
                          type="password"
                          placeholder="Password"
                          required
                          name="password"
                          value={password}
                          onChange={onChange}
                          className="form-control rounded-pill border-1 shadow-sm px-4 text-primary"
                        />
                      </div>

                      <input
                        value="Login"
                        type="submit"
                        className="btn btn-warning btn-block font-weight-bold text-uppercase mb-2 rounded-pill shadow-sm"
                      />
                      <div className="text-center d-flex justify-content-between mt-4">
                        <p>
                          Do you have any account?{" "}
                          <Link
                            to="/register"
                            className="font-weight-bold text-dark"
                          >
                            Register Now
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
