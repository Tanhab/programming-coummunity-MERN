import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NavbarComponent from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./pages/Home"
import Index from "./pages/Index"
import Login from "./pages/Login"
import PostDetails from "./pages/PostDetails"
import Register from "./pages/Register"
function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/posts/:postId" element={<PrivateRoute />}>
            <Route path="/posts/:postId" element={<PostDetails />} />
          </Route>
          </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
