import logo from '../images/bplogo.png'
import CircularProgress from '@mui/material/CircularProgress'
import Navbar from './Navbar'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
const Landing = () => {
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
    </Box>
  )
}
export default Landing