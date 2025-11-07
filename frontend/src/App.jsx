import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Login from "./pages/login";
import Landing from "./pages/landing";
import Tempsuccess from './pages/tempsuccess';








const App = () => {


  return (
    <>
      <Router>


        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/success" element={<Tempsuccess />}  />
          </Routes>  


      </Router>
      

      {/* <!-- landing page --> */}

     
    </>
  )
}

export default App
