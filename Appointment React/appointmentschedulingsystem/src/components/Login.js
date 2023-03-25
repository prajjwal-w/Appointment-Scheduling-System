import axios from "axios";
import {useContext, useState} from 'react';
import {UserContext} from '../App'
import { useNavigate } from "react-router-dom";
import{Box,Button,Typography,Card, CardContent} from '@mui/material';
import { grey,purple,blue } from '@mui/material/colors';
import { toast, ToastContainer } from "react-toastify";


 function Login(){
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [id,setId]=useState();
    const nav=useNavigate();
    const{setUser,setToken}=useContext(UserContext)
    const user={
      userName:userName,
      password:password
    }

    async function validateLogin(){
        var res = await axios.post(`http://localhost:39930/api/User/Login`,user)
            if(res.status === 204)
            {
              toast.error("Invalid Credentials",
                {
                position:"top-center",
                autoClose:3000,
                closeOnClick:true,
                draggable:true,
                theme:"colored"
              })
            }
            setPassword("");
            setUsername("");
            
              
        if(res.status===200)
        {
            console.log(res.data)
            setUser(userName)
            localStorage.setItem("user",userName)
            setToken(res.data.token)
            localStorage.setItem("token",res.data.token)
            console.log(localStorage.getItem("token"))
            const userData = await axios.get(`http://localhost:39930/api/User/GetUserDetails?userName=${userName}`,{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
            setId(userData.data.id)
            localStorage.setItem("userId",userData.data.id)
            console.log(userData.data.id)
            console.log(userData)
            localStorage.setItem("UserName",userData.data.name)
            localStorage.setItem("DOB",userData.data.dob)
            localStorage.setItem("phone",userData.data.phone)
            localStorage.setItem("email",userData.data.email)
            nav("/courses")
        }
        
        
    }
    function register(){
      nav("/register")
  }

  return(
    <>
    <Box textAlign='center' sx={{backgroundColor:grey[500],color:'white'}}>
            <Typography variant='h2'>Welcome to ASSApplication</Typography>
        </Box>
            <Box textAlign='center' sx={{backgroundColor:purple[600],color:'white'}}>
                <Typography variant='h3'>Login</Typography>
            </Box>
            <Box textAlign='center' sx={{mx:'auto',width:600}}>
             <Card align ='center'sx={{my:4,backgroundColor:grey[900],color:'white'}}>    
                <CardContent >
                    <Typography variant="h4">Sign in</Typography>
                    <Box sx={{my:3}}>
                      <input  placeholder="UserName"className='form-control form-control-lg' type="text" autoComplete="off" name="Username"  value={userName} variant="outlined" label="Username" autoFocus 
                        onChange={(e)=>setUsername(e.target.value)}/>
                    </Box>
                    <Box>
                      <input type="password" className='form-control form-control-lg' autoComplete="off" name="Password"  value={password} placeholder="Password" variant="outlined" label="Password" autoFocus
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </Box>      
                </CardContent>
                <Button variant='contained' sx={{mb:2}} onClick={validateLogin}>Login</Button>
                <Typography variant="h6" sx={{color:blue[50]}}>Dont Have an Account???</Typography>
                <Button variant="contained" onClick={()=>register()} sx={{mb:3,my:2}}>Register</Button> 
            </Card>
            </Box>
            <ToastContainer position="top-center" autoClose={5000}
            closeOnClick
            draggable 
            theme="colored"></ToastContainer>
        
         </>
  )
        
  } 
            
       
    export default Login;    
    