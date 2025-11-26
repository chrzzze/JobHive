import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import './App.css'
import Login from "./pages/login";
import Landing from "./pages/landing";
import Tempsuccess from './pages/tempsuccess';
import StudentHome from './pages/students/StudentHome';
import SignUp from './pages/sign-up';







const App = () => {


  return (
    <>
      <Router>


        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}  />
          <Route path="/success" element={<Tempsuccess />}  />
          <Route path="/students/home" element={<StudentHome />}  />
          </Routes>  


      </Router>
      

      {/* <!-- landing page --> */}

     
    </>
  )
}

export default App
