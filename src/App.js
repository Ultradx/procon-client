import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'
import NewPair from './components/new_pair/NewPair'
import UpdatePair from './components/update_pair/UpdatePair'
import DeletePair from './components/delete_pair/DeletePair'
import RequireAuth from './components/require/RequireAuth'
import PersistLogin from './components/login/PersistLogin'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route exact path="/new" element={<NewPair />} />
              <Route exact path="/update" element={<UpdatePair />} />
              <Route exact path="/delete" element={<DeletePair />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
