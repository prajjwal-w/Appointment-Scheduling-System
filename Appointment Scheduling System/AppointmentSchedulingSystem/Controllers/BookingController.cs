using AppointmentSchedulingSystem.Models;
using AppointmentSchedulingSystem.Repository;
using AppointmentSchedulingSystem.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Cors")]
    public class BookingController : ControllerBase
    {

         private readonly IBookingRepository _bookingRepository;

        //constructor
        public BookingController(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

       
        [Authorize]
        [HttpGet]
        [Route("GetAllBookings")]
        public ActionResult GetAllBookings()
        {
            List<Bookings> bookings = _bookingRepository.GetAllBookings();
            return Ok(bookings);
        }

        [Authorize]
        [HttpGet]
        [Route("GetBookingsByDate")]
        public ActionResult GetAllBookingByDate(DateTime date,int course)
        {
            Bookings booking = _bookingRepository.GetBookings(date,course);
            if(booking!=null)
            {
                return Ok(booking);
            }
            return Ok(null);
            
        }


        [Authorize]
        [HttpPost]
        [Route("AddBooking")]
        public async Task<ActionResult> AddBookingbyDate(Bookings bookings)
        {
            Bookings b = await _bookingRepository.AddBooking(bookings);
            if (b != null)
            {
                return Ok("Booking Added");
            }
            return Ok("Slot not available");
            
        }

        [Authorize]
        [HttpPut]
        [Route("RescheduleBooking")]
        public async Task<ActionResult> RescheduleBooking(Bookings bookings,int userId)
        {
            Bookings b = await _bookingRepository.RescheduleBooking(bookings, userId);
            if(b!=null)
            {
                return Ok(b);
            }
            return Ok("Booking Not Rescheduled In Booking Table");
        }


        [Authorize]
        [HttpPut]
        [Route("UpdateBooking")]
        public  async Task<ActionResult> UpdateBooking(Bookings bookings)
        {
            Bookings b = await _bookingRepository.UpdateBooking(bookings);
            return Ok("Booking Updated");
        }

        [Authorize]
        [HttpDelete]
        [Route("DeleteBooking/{date}")]
        public  async Task<ActionResult> DeleteBooking(DateTime date, int courseId )
        {
           /*Bookings b = */ await _bookingRepository.DeleteBooking(date,courseId);
            return Ok("Booking Deleted");
        }

     
        [HttpPut]
        [Route("CancelBooking")]
        public async Task<ActionResult> CancelBooking(DateTime date,int courseId,int userId)
        {
            Bookings bookings = await _bookingRepository.CancelBooking(date, courseId, userId);
            if (bookings != null)
            {
                return Ok("Booking Canceled");
            }
            return Ok("Someting Wrong Booking Not Canceled");
        }

    }

}












        


        

        

        