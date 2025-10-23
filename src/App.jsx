import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Login from "./pages/login";
import Landing from "./pages/landing";









const App = () => {


  return (
    <>
      <Router>


        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/login" element={<Login />}/>
          </Routes>  


      </Router>
      

      {/* <!-- landing page --> */}

     
    </>
  )
}

export default App
