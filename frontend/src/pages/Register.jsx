import React, { useState,useEffect } from "react"
import { Link , useNavigate} from "react-router-dom"
import { Container, Spinner } from "reactstrap"
import DeveloperIcon from "../assets/svg/developer1.svg"

import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../features/auth/authSlice"



const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    role: "Student",
    firstName : "",
    lastName : "",
    email: "",
    password: "",
  })
  const { role ,email,firstName,lastName, password } = formData

  const { isLoading, isSuccess, isError, user, message } = useSelector(
    (state) => state.auth
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/home")
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])
  const onSubmit = async (e) => {
    e.preventDefault()
    
    dispatch(register(formData))


  }
  if(isLoading){
    return <Spinner />
  }

  const onChange = (e) => {
    //console.log(e.target)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      //[e.event.name ] : e.target.value,
    }))
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
                    <h3 className="display-5">Hello there!</h3>
                    <p className="text-warning mb-4">
                      <strong>
                        Create your account and join our community.
                      </strong>
                    </p>
                    <form
                      method="post"
                      className="create-form form-signin"
                      encType="multipart/form-data"
                      onSubmit={onSubmit}
                    >
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          id="role"
                          value="Student"
                          checked = {role === 'Student'}
                          onChange={onChange}
                        />
                        <label className="form-check-label" htmlFor="Student">
                          Student
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          id="role"
                          value="Teacher"
                          checked ={role === 'Teacher'}
                          onChange={onChange}
                        />
                        <label className="form-check-label" htmlFor="Teacher">
                          Teacher
                        </label>
                      </div>
                      <div className="form-group mb-3 mt-2">
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
                      <div className="form-row row mb-3 mt-2">
                        <div className="col">
                          <input
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            name="first_name"
                            value={firstName}
                            onChange={onChange}
                            required
                            className="form-control rounded-pill border-1 shadow-sm px-4"
                          />
                        </div>
                        <div className="col">
                          <input
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            value={lastName}
                            onChange={onChange}
                            className="form-control rounded-pill border-1 shadow-sm px-4"
                          />
                        </div>
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
                         minLength = "6"
                          className="form-control rounded-pill border-1 shadow-sm px-4 text-primary"
                        />
                      </div>

                      <input
                        value="Register"
                        type="submit"
                        className="btn btn-warning btn-block font-weight-bold text-uppercase mb-2 rounded-pill shadow-sm"
                      />
                      <div className="text-center d-flex justify-content-between mt-4">
                        <p>
                          Do you have any account?{" "}
                          <Link
                            to="/login"
                            className="font-weight-bold text-dark"
                          >
                            LogIn Now
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

export default Register
