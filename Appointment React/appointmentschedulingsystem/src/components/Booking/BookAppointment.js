import { useLocation } from 'react-router-dom';
import {Box,Button,TextField,Typography,Grid,Card, CardContent} from '@mui/material';
import {purple,pink,deepPurple,blue,white,grey} from '@mui/material/colors';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Slots from '../Slots';
import Navigation from '../Navigation';
function BookAppointment(){
    const [date,setDate]=useState("")
    const [status,setStatus]=useState({
        code:0
    })
    const location = useLocation();
    const [courseName,setCourseName]=useState()
    const [trainer,setTrainer]=useState()
    const [courseId,setId]=useState()
    const [button,setButton]=useState(false)

    useEffect(()=>{
        setCourseName(location.state.courseName)
        setTrainer(location.state.trainerName)
        setId(location.state.id)
        console.log(location.state.id)
    })
    const [booking,setBooking]=useState({
        date:"",
        id:0,
        courses:0,
        slot_1:null,
        slot_2:null,
        slot_3:null,
        slot_4:null,
        slot_5:null,
        courseName:null,
        trainerName:null,
    })
    
    const disablePastDate=()=>{
        const today = new Date();
        const dd = String(today.getDate()).padStart(2,'0');
        const mm = String(today.getMonth() +1).padStart(2,"0");
        const yyyy = today.getFullYear();
        
        return yyyy+"-"+mm+"-"+dd; 
    };
    
    async function getSlotsByDateCourse(){
        var slot = await axios.get(`http://localhost:39930/api/Booking/GetBookingsByDate?date=${date}&course=${courseId}`
        ,{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}}).catch(function(error){
            if(error.response)
            {
                console.log("Date not Entered")
                alert("Enter a Date")
            }    
        })
        let bookings={
            date:date,
            id:slot.data.id,
            courses:courseId,
            slot_1:slot.data.slot_1,
            slot_2:slot.data.slot_2,
            slot_3:slot.data.slot_3,
            slot_4:slot.data.slot_4,
            slot_5:slot.data.slot_5,
            courseName:courseName,
            trainerName:trainer,
        } 
            console.log(slot.data)
            console.log(slot.status)
            console.log(bookings)
            setStatus(slot.status)
            setBooking(bookings);
            if(slot.status === 204 || slot.status === 200)
    {
        setButton(true)
    }
            
    }
    
   
    


    
    return( 
        <>
        <Navigation/>
        {button === true && <Slots props={booking}/>}
        {button === false && 
         <div >
            
            <Box textAlign='center' sx={{backgroundColor:purple[600],color:'white'}}>
                <Typography variant='h3'>Book Appointment</Typography>
            </Box>
            <Box textAlign='center' sx={{mx:'auto',width:500}}>
            <Card sx={{my:4,backgroundColor:grey[900],color:'white'}}>
                <CardContent >
                    <Typography variant="h5">Select Date</Typography>
                    <input type="text" id="Date"
                    className='form-control form-control-lg'
                    placeholder="Date"
                    onFocus={(e)=>e.currentTarget.type="date"}
                    onBlur={(e)=>e.currentTarget.type="text"}
                    min={disablePastDate()}
                    value={date} onChange={(e)=>setDate(e.target.value)}>
                    </input>
                    
                </CardContent>
                <Button type= "submit" variant='contained' sx={{mb:2}} onClick={()=>getSlotsByDateCourse()}>Select Slot</Button>
            </Card>
            </Box> 
             
            </div>}
            </>
        
    )
}

export default BookAppointment