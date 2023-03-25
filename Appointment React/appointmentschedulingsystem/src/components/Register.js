import axios from "axios";
import {UserContext} from '../App';
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import{Box,Button,Typography,Card, CardContent} from '@mui/material';
import { grey,blue,purple } from '@mui/material/colors';
import { toast, ToastContainer } from "react-toastify";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [dob, setDOB] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhonenumber] = useState("");
    const nav=useNavigate();
    const{ setUser,  setToken} = useContext(UserContext)
    
    
    async function register(){
        let user = {
            username: username,
            password: password,
            name: name,
            email: email,
            phone: phoneNumber,
            dob: dob
        };
        const res=await axios.post('http://localhost:39930/api/User/Register',user).catch(function error(){
            if(error.response)
            {
                toast.error("Unsucessful Registration, Something Went Wrong",
                {
                position:"top-center",
                autoClose:3000,
                closeOnClick:true,
                draggable:true,
                theme:"colored"
              })
            }
        })
        console.log(res.data)
        setUser(username)
        setToken(res.data.token)     
        if(res.status === 200)
        {
            toast.success("Register Successfully",
                {
                position:"top-center",
                autoClose:5000,
                closeOnClick:true,
                draggable:true,
                theme:"colored"
              })
            
            var interval = setInterval(myUrl,5000)
            
            }
        function myUrl(){
            window.location.pathname = "/"
            clearInterval(interval);
        }
    }
    function login(){
      nav("/")
      
    } 
        return(
            <>
            <Box textAlign='center' sx={{backgroundColor:grey[500],color:'white'}}>
            <Typography variant='h2'>Welcome to ASSApplication</Typography>
        </Box>
            <Box textAlign='center' sx={{backgroundColor:purple[600],color:'white'}}>
                <Typography variant='h3'>Register</Typography>
            </Box>
            <Box textAlign='center' sx={{mx:'auto',width:600}}>
             <Card align ='center'sx={{weidth:500,my:4,backgroundColor:grey[900],color:'white'}}>    
                <CardContent >
                    <Typography variant="h4">Register User</Typography>
                    <Box sx={{my:3}}>
                      <input  placeholder="Name"className='form-control form-control-lg' type="text" autoComplete="off"   value={name} variant="outlined"  autoFocus 
                        onChange={(e)=>setName(e.target.value)}/>
                    </Box>
                    <Box sx={{my:3}}>
                        <input  placeholder="UserName"className='form-control form-control-lg' type="text" autoComplete="off"   value={username} variant="outlined"  autoFocus 
                        onChange={(e)=>setUsername(e.target.value)}/>
                    </Box>
                    <Box sx={{my:3}}>
                      <input  placeholder="Password"className='form-control form-control-lg' type="password" autoComplete="off"  value={password} variant="outlined" autoFocus 
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </Box>
                    <Box sx={{my:3}}>
                      <input type="email" className='form-control form-control-lg' autoComplete="off"   value={email} placeholder="Email" variant="outlined"  autoFocus
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </Box>
                    <Box sx={{my:3}}>
                      <input type="text" className='form-control form-control-lg' autoComplete="off"  value={phoneNumber} placeholder="PhoneNumber" variant="outlined" autoFocus
                        onChange={(e)=>setPhonenumber(e.target.value)}/>
                    </Box>
                    <Box sx={{my:3}}>
                      <input type="date" className='form-control form-control-lg' autoComplete="off"  value={dob} placeholder="Date of Birth" variant="outlined" autoFocus
                        onChange={(e)=>setDOB(e.target.value)}/>
                    </Box>          
                <Button variant='contained' sx={{mb:2}} onClick={register}>Register</Button>
                <Typography variant="h6" sx={{color:blue[50]}}>Already Registered????</Typography>
                <Button variant="contained" onClick={()=>login()} sx={{mb:3,my:2}}>Login</Button> 
            </CardContent>             
            </Card>
            </Box>
            <ToastContainer position="top-center" autoClose={5000}
            closeOnClick
            draggable 
            theme="colored"></ToastContainer>
            </>

  )
        
  } 
export default Register;

