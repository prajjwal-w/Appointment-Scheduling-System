import axios from 'axios';
import {Box,Button,Typography,Card, CardContent} from '@mui/material';
import {amber,green,purple,grey} from '@mui/material/colors';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function Slots(props){
    const nav = useNavigate()
    const bookedColor=amber[800];
    const [disable,setDisable]=useState(false) 
    console.log(localStorage.getItem("userId"))
    const available = green[500];   
    const book = props
    const path = window.location.pathname
    var slot_1=false,
    slot_2=false,
    slot_3=false,
    slot_4=false,
    slot_5=false
    useEffect(()=>{
        console.log(book.props)
    })
    if(book.props.slot_1 != null)
    {
        slot_1=true;
    }
    if(book.props.slot_2 !=null)
    {
        slot_2=true;
    }
    if(book.props.slot_3 !=null)
    {
        slot_3=true;
    }
    if(book.props.slot_4 !=null)
    {
        slot_4=true;
    }
    if(book.props.slot_5 !=null)
    {
        slot_5=true;
    }
       
    const btnId=(e)=>
    {
        setDisable(false);
        bookSlot(e)  
    }
    async function bookSlot(slot)
    {
        if(slot === 1)
        {
           let bookingData={
            date:book.props.date,
            courses:book.props.courses,
            slot_1:localStorage.getItem("userId")
           }
           console.log(bookingData)
           let slot = 1
           let userId = localStorage.getItem("userId")
           addAppointmentEntry(bookingData,slot,userId)
           const postBookings = await axios.post(`http://localhost:39930/api/Booking/AddBooking`,bookingData,{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
           if(postBookings.status === 200)
           {
            notify()
           }
        }
        else if(slot === 2)
        {
           let bookingData={
            date:book.props.date,
            courses:book.props.courses,
            slot_2:localStorage.getItem("userId")
           }
           let slot = 2
           let userId = localStorage.getItem("userId")
           addAppointmentEntry(bookingData,slot,userId)
           const postBookings = await axios.post(`http://localhost:39930/api/Booking/AddBooking`,bookingData,{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
           if(postBookings.status === 200)
           {
            notify()
           }
        }
        else if(slot === 3)
        {
           let bookingData={
            date:book.props.date,
            courses:book.props.courses,
            slot_3:localStorage.getItem("userId")
           }
           let slot = 3
           let userId = localStorage.getItem("userId")
           addAppointmentEntry(bookingData,slot,userId)
           const postBookings = await axios.post(`http://localhost:39930/api/Booking/AddBooking`,bookingData,{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
           if(postBookings.status === 200)
           {
            notify()
           }
        }
        else if(slot === 4)
        {
           let bookingData={
            date:book.props.date,
            courses:book.props.courses,
            slot_4:localStorage.getItem("userId")
           }
           let slot = 4
           let userId = localStorage.getItem("userId")
           addAppointmentEntry(bookingData,slot,userId)
           const postBookings = await axios.post(`http://localhost:39930/api/Booking/AddBooking`,bookingData,{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
           if(postBookings.status === 200)
           {
                notify()
           }
           
        }
        else if(slot === 5)
        {
           let bookingData={
            date:book.props.date,
            courses:book.props.courses,
            slot_5:localStorage.getItem("userId")
           }
           let slot = 5
           let userId = localStorage.getItem("userId")
           addAppointmentEntry(bookingData,slot,userId)
           const postBookings = await axios.post(`http://localhost:39930/api/Booking/AddBooking`,bookingData,{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
           if(postBookings.status === 200)
           {
            notify()
           }
           
        }
       }
       function notify(){
            setDisable(true);
            if(path === '/rescheduleAppointment')
            {      console.log(book.props.id)
                    toast.success("Appointment Reschedule Successfully!!",{
                        position:"top-center",
                        autoClose:5000,
                        closeOnClick:true,
                        draggable:true,
                        theme:"colored",
                    });  
            }
            else{
                toast.success("Appointment Booked Successfully!!",{
                    position:"top-center",
                    autoClose:5000,
                    closeOnClick:true,
                    draggable:true,
                    theme:"colored",
                });

            }
            var interval = setInterval(myUrl,5000)

            function myUrl(){
                window.location.pathname = "/userAppointment"
                clearInterval(interval);
            }
     }   
    
    async function addAppointmentEntry(bookings,slot,userId)
    {
        if(path==='/rescheduleAppointment')
        {
            
            var entry={
                id:book.props.id,
                date:bookings.date,
                slot:slot,
                userId:userId,
                courseId:book.props.courses,
                status:"Rescheduled",
                rescheduled_date:book.props.prevDate,
                rescheduled_slot:book.props.prevSlot
            }
            console.log(entry)
            console.log(bookings)
            let status = await axios.put(`http://localhost:39930/api/Appointment/RescheduleAppointment`,entry,{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
            console.log(status)
            let status1 = await axios.put(`http://localhost:39930/api/Booking/RescheduleBooking`,bookings,{
                params:{
                    userId:userId
                }
            ,headers:{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
            console.log(status1)
            
        }else{
            var entry={
                date:bookings.date,
                slot:slot,
                userId:userId,
                courseId:book.props.courses,
                status:"Booked"
            }
            console.log(entry)
            var d = await axios.post(`http://localhost:39930/api/Appointment/AddAppointment`,entry,{'headers':{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
            console.log(d.status) 

        }
        
    }
       
    return(
        <div>
            
        <div>
             <Box textAlign='center' sx={{backgroundColor:purple[500],color:'white'}}>
                <Typography variant='h3'>Book Slot <Typography variant='h5'>Date:{book.props.date}</Typography></Typography>
            </Box>
            <Box textAlign='center' sx={{mx:'auto',width:500}}>
            <Card sx={{my:4,backgroundColor:grey[700],color:'white'}}>
                <CardContent >
                    <Box sx={{backgroundColor:grey[900],color:'white'}}><Typography variant="h4">Course Details</Typography></Box>
                    <Typography sx={{my:1}} variant="h4">{book.props.courseName}</Typography>
                    <Typography  variant="h5">Trainer:   {book.props.trainerName}</Typography>
                </CardContent>
            </Card>
            </Box>
            </div> 
        <div className='container'>
            <Box textAlign="center" sx={{mt:15,display: 'grid', gridAutoFlow: 'row', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1,}}>
            <Card sx={{width:220,my:4,backgroundColor:grey[900],color:'white'}}>
                <CardContent >
                    <Typography variant="h5">Slot 1</Typography>  
                </CardContent>
                {slot_1 === false ? <Button id='1' disabled={disable} variant='contained' sx={{backgroundColor:available,mb:2}} onClick={()=>btnId(1)}>Book Slot</Button>:
                <Button id='1' variant='contained' sx={{backgroundColor:bookedColor,mb:2}}>Already Booked</Button>}
            </Card>
            <Card sx={{width:220,my:4,backgroundColor:grey[900],color:'white'}}>
                <CardContent >
                    <Typography variant="h5">Slot 2</Typography>  
                </CardContent>
                {slot_2 === false ? <Button id='2' disabled={disable} variant='contained' sx={{backgroundColor:available,mb:2}} onClick={()=>btnId(2)}>Book Slot</Button>:
                <Button id='2' variant='contained' sx={{backgroundColor:bookedColor,mb:2}}>Already Booked</Button>}
            </Card>
            <Card sx={{width:220,my:4,backgroundColor:grey[900],color:'white'}}>
                <CardContent >
                    <Typography variant="h5">Slot 3</Typography>    
                </CardContent>
                {slot_3 === false ? <Button id='3' disabled={disable} variant='contained' sx={{backgroundColor:available,mb:2}} onClick={()=>btnId(3)}>Book Slot</Button>:
                <Button id='3' variant='contained' sx={{backgroundColor:bookedColor,mb:2}}>Already Booked</Button>}
            </Card>
            <Card sx={{width:220,my:4,backgroundColor:grey[900],color:'white'}}>
                <CardContent >
                    <Typography variant="h5">Slot 4</Typography>  
                </CardContent>
                {slot_4 === false ? <Button id='4' disabled={disable} variant='contained' sx={{backgroundColor:available,mb:2}} onClick={()=>btnId(4)}>Book Slot</Button>:
                <Button id='4' variant='contained' sx={{backgroundColor:bookedColor,mb:2}}>Already Booked</Button>}
            </Card>
            <Card sx={{width:220,my:4,backgroundColor:grey[900],color:'white'}}>
                <CardContent >
                    <Typography variant="h5">Slot 5</Typography>  
                </CardContent>
                {slot_5 === false ? <Button id='5' disabled={disable} variant='contained' sx={{backgroundColor:available,mb:2}} onClick={()=>btnId(5)}>Book Slot</Button>:
                <Button id='5' variant='contained' sx={{backgroundColor:bookedColor,mb:2}}>Already Booked</Button>}
            </Card>
            </Box>
        </div>
        <ToastContainer position="top-center" autoClose={5000}
            closeOnClick
            draggable 
            theme="colored"></ToastContainer>
        </div>
        
    )
}
export default Slots