import logo from '../images/bplogo.png'
import CircularProgress from '@mui/material/CircularProgress'
import Navbar from './Navbar'
import { Box } from '@mui/system'
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
        <h1><em>Now Loading BP Sales Companion</em></h1>
        <CircularProgress 
          size={60}
          sx={{
            justifySelf:"center",
          
          }}/>
      </Box>
      <Navbar/>
    </Box>
  )
}
export default Landing