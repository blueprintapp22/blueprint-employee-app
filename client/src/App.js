import './App.css'
import SearchAppBar from './components/Searchbar'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import { CheckSession } from './services/Auth'
import { SearchDropbox, GetPreview } from './services/dropbox'
import { Route, Routes } from 'react-router-dom'
import EmployeePage from './pages/EmployeePage'
import SalesmanPage from './pages/SalesmanPage'
import SearchPage from './pages/SearchPage'
import { Button } from '@mui/material'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [preview, setPreview] = useState()
  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    console.log(user)
    toggleAuthenticated(true)
  }
  useEffect(() => {
    // SearchDropbox()

    const token = localStorage.getItem('token')

    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])
  return (
    <div className="App">
      <SearchAppBar
        toggleAuthenticated={toggleAuthenticated}
        user={user}
        setUser={setUser}
        authenticated={authenticated}
        handleLogOut={handleLogOut}
      />
      <Button onClick={() => GetPreview()}></Button>
      <Routes>
        <Route
          path="/"
          element={<Landing user={user} authenticated={authenticated} />}
        />
        <Route
          path="/employees"
          element={<EmployeePage user={user} authenticated={authenticated} />}
        />
        <Route
          path="/salesman"
          element={<SalesmanPage user={user} authenticated={authenticated} />}
        />
        <Route
          path="/search"
          element={<SearchPage user={user} authenticated={authenticated} />}
        />
      </Routes>
    </div>
  )
}

export default App
