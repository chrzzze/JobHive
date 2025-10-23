import Navbutton from "./navbutton";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">JobHive</div>
        <ul className="nav-links">
          <Navbutton link="#about" text="About" />
          <Navbutton link="#features" text="Features" />
          <Navbutton link="#contact" text="Contact Us" />
          
          <Link to="/login"> <li className="btn btn-signin" >Sign In</li> </Link>
          <li><a href="#create" className="btn btn-signup">Create Account</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;