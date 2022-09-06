import logo from '../images/bplogo.png'
import Navbar from './Navbar'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AccessDeniedModal from './AccessDeniedModal'
const Landing = ({user, authenticated}) => {
  const [accessDeniedModal, setAccessDeniedModal] = useState(false)
  let navigate = useNavigate()
  const checkAccess = (id) => {
    if (id){
      navigate('/search')
    } else
    setAccessDeniedModal(true)
  }
  if(user && authenticated){
    return (
      <Box sx={{
        display:"flex",
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "column"
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          }}>
          
          <img id="logo" src={logo}/>
          <Typography variant="h4" sx={{color:"white", fontWeight: "bold"}}>Welcome to Blueprint Sales Companion!</Typography>

          <ContactPhoneIcon onClick={()=>checkAccess(user.access)}sx={{ fontSize: '100px', color: 'white', marginTop: "20px",cursor:"pointer",'&:hover': {color: "#3f51b5",opacity: [0.9, 0.8, 0.7],} }} />
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
            Invoice Finder
          </Typography>
        </Box>
        <Navbar/>
        <AccessDeniedModal accessDeniedModal={accessDeniedModal} setAccessDeniedModal={setAccessDeniedModal} />
      </Box>
    )
  }
  return (
    <Box sx={{
      display:"flex",
      alignItems: "center",
      justifyContent:"center",
      flexDirection: "column"
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        }}>
        
        <img id="logo" src={logo}/>
        <Typography variant="h4" sx={{color:"white", fontWeight: "bold"}}>Welcome to Blueprint Sales Companion!</Typography>
        <Typography variant="h6" sx={{color:"lightgray", fontWeight: "bold"}}><em>Please sign in or sign up to continue...</em></Typography>

      </Box>
      <Navbar/>
      <AccessDeniedModal accessDeniedModal={accessDeniedModal} setAccessDeniedModal={setAccessDeniedModal} />
    </Box>
  )
}
export default Landing