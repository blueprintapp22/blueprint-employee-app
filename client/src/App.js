import './App.css'
import SearchAppBar from './components/Searchbar'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import { CheckSession } from './services/Auth'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
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
      <Landing />
      <Navbar />
    </div>
  )
}

export default App
