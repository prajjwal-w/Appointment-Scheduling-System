import React, { useEffect, useState } from'react'
import axios from 'axios'
import { green, orange, purple,grey } from '@mui/material/colors';
import {Button,Box,Typography, CardContent,Card} from '@mui/material'
import { useNavigate} from 'react-router-dom';
import Navigation from '../Navigation'

const Courses=(props)=>
{
    const navigate=useNavigate();
    var [course,setCourse]=useState([]);
    var [courses,setCourses]=useState();
    useEffect(()=>
    {
        async function getAllData()
        {
            try{
               const course=await axios.get("http://localhost:39930/api/Courses/GetAllCourse",{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}});
                console.log(course.data)
                setCourse(course.data)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getAllData()
    },[])
    const getBookings=(edata)=>
    {
        console.log(edata)
        setCourses(edata)
        navigate("/bookAppointment",{state:{id:edata.id,courseName:edata.courseName,trainerName:edata.trainerName}})
        
    };
    return(
     <> 
     <Navigation/> 
       <Box textAlign='center' sx={{backgroundColor:purple[500],color:'white'}}>
            <Typography variant='h2'>Courses</Typography>
        </Box>
            <Box  sx={{display:'flex', flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
             {course.map((product)=>(
                <Box sx={{m:6}}>
                    <Card align='center' sx={{width:300,my:4,backgroundColor:grey[900],color:'white'}}>

                    <CardContent >

                        <Typography variant="h3">{product.courseName}</Typography> 
                        <Typography variant="h5" sx={{my:1}}>Trainer : {product.trainerName}</Typography> 

                    </CardContent>

                    <Button variant='contained' sx={{backgroundColor:green[500],mb:2}} onClick={()=>getBookings(product)}>Book Course</Button>

                    </Card>
                </Box>

             ))}
       
       </Box>
          
         
            
        </>
    )
}




    
export default Courses
