import Navbutton from "./navbutton";
import { Link } from "react-router-dom";
import "./navbar.css"
import logo from "../assets/jobhive logo.png"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <img src={logo} alt="JobHive Logo" />
        </div>

        <ul className="nav-links">
          <Navbutton link="#about" text="About"/>
          <Navbutton link="#features" text="Features"/>
          <Navbutton link="#contact" text="Contact"/>
          <Link to="/login"><Navbutton text="Sign In" styleName="btn btn-signin"/></Link>
          <Navbutton text="Create Account" styleName="btn btn-signup"/>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;