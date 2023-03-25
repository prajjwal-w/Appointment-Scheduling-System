using AppointmentSchedulingSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Repository
{
   public  interface IBookingRepository

    {
        List<Bookings> GetAllBookings();
        Bookings GetBookings(DateTime dateTime,int? courseId);
        Task<Bookings> AddBooking(Bookings bookings);
        Task<Bookings> UpdateBooking(Bookings bookings);
        Task<Bookings> DeleteBooking(DateTime date, int courseId);
        Task<Bookings> RescheduleBooking(Bookings bookings, int userId);

        Task<Bookings> CancelBooking(DateTime date, int courseId, int userId);
    }
}


