import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../features/auth/authSlice"
// import UserIcon from '../assets/png/user.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap"
import { Button } from "bootstrap"

const NavbarComponent = () => {
  const [toggle, setToggle] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useDispatch()
  const onLogoutClick = () => {
    dispatch(logout())
  }
  return (
    <>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
            ></Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 link-secondary">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link px-2 link-dark">
                  <p>Contest</p>
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link px-2 link-dark">
                  Customers
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link px-2 link-dark ">
                  Products
                </Link>
              </li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width="36"
                  height="36"
                  className="rounded-circle"
                />
              </a>
              <ul
                className="dropdown-menu text-small"
                aria-labelledby="dropdownUser1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default NavbarComponent

{
  /* <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">
          <strong style={{ fontSize: "22px" }}>
            SUST<span classNameName="text-warning">PC</span>
          </strong>
        </NavbarBrand>
        <NavbarToggler classNameName="ml-auto" onClick={() => setToggle(!toggle)} />
        <Collapse isOpen={toggle} navbar>
          <Nav classNameName="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/login">
                Components
              </NavLink>
            </NavItem>
            <NavItem>
              <NavbarText tagProptype = {Button} onClick={onLogoutClick}>Logout</NavbarText>
            
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar> */
}
