import ConstructionIcon from '@mui/icons-material/Construction'
import { Box, Typography } from '@mui/material'
const SalesmanPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ConstructionIcon sx={{ fontSize: '200px', color: 'white' }} />
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
          Salesman page is under developement!
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'lightgray', fontWeight: 'bold', textAlign: 'center' }}
        >
          <em>
            This page will give admin's access to an individual's sales history,
            as well as searches they've made throughout the app
          </em>
        </Typography>
      </Box>
    </Box>
  )
}
export default SalesmanPage
