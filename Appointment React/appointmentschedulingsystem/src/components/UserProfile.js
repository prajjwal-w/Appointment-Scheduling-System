import React, { useState, useEffect } from 'react'
import {Box,Typography, CardContent,Card} from '@mui/material'
import {purple,grey } from '@mui/material/colors';
import card1 from './Logo/image.png'
import Navigation from './Navigation';




const UserProfile = () => { 

  return (
    <div>
      <Navigation/>
      <Box textAlign='center' sx={{backgroundColor:purple[500],color:'white'}}>
        <Typography variant='h2'>User Profile</Typography>
      </Box>
      <Box sx={{color:'white'}}>
      <Box  sx={{ display:'flex', flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
      <Card align='center' sx={{width:800,my:4,backgroundColor:grey[900],boxShadow:3,height:250}}>
        <CardContent>
          <Box align="center">
            <img src={card1} sizes="40px"  align='right' sx={{marginTop:4,}}></img>
          </Box>
       
        <Typography variant="h4" sx={{textAlign:'left',fontFamily:'serif',color:'white'}}>{localStorage.getItem("UserName")}</Typography>
        <Typography variant="h4" sx={{textAlign:'left',fontFamily:'serif',color:'white'}}>{localStorage.getItem("email")}</Typography>
        <Typography variant="h4"sx={{textAlign:'left',fontFamily:'serif',color:'white'}}>{localStorage.getItem("phone")}</Typography>
        <Typography variant="h4"sx={{textAlign:'left',fontFamily:'serif',color:'white'}}>{(localStorage.getItem("DOB"))}</Typography>
        <Typography variant="h4"sx={{textAlign:'left',fontFamily:'serif',color:'white'}}></Typography>      
        </CardContent>
      </Card>
      </Box>
      </Box>

    </div>
  )
}

export default UserProfile
