using AppointmentSchedulingSystem.Context;
using AppointmentSchedulingSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Repository
{
    public class BookingRepository : IBookingRepository
    {

        readonly AppointmentDbContext _appointmentDBContext;


        public BookingRepository(AppointmentDbContext appointmentDBContext)
        {
            _appointmentDBContext = appointmentDBContext;
        }

        public  Bookings GetBookings(DateTime dateTime,int? courseid)
        {
            var booking =  _appointmentDBContext.Booking.Include(u1 => u1.User_1).Include(u2 => u2.User_2)
                .Include(u3 => u3.User_3)
                .Include(u4 => u4.User_4).Include(u5 => u5.User_5).Include(c=>c.Course).Where(u => u.Date == dateTime && u.Courses == courseid).FirstOrDefault();
            if(booking!=null)
            {
                return booking;
            }
            return null;
        }

        public List<Bookings> GetAllBookings()
        {
            return _appointmentDBContext.Booking.Include(u1 => u1.User_1).Include(u2 => u2.User_2)
                .Include(u3 => u3.User_3)
                .Include(u4 => u4.User_4).Include(u5 => u5.User_5).Include(c => c.Course).ToList();
        }

        public async Task<Bookings> AddBooking(Bookings bookings)
        {
            var b = GetBookings(bookings.Date, bookings.Courses);
            if (b != null)
            {
                var book = UpdateBooking(bookings);
                if (book != null)
                {
                    return bookings;
                }
            }
            _appointmentDBContext.Booking.Add(bookings);
            await _appointmentDBContext.SaveChangesAsync();
            return bookings;
        }


        public async Task<Bookings> UpdateBooking(Bookings bookings)
        {
            var b = GetBookings(bookings.Date,bookings.Courses);
            if(b!=null)
            {
                if(b.Slot_1==null)
                {
                    b.Slot_1 = bookings.Slot_1;
                }
                if(b.Slot_2==null)
                {
                    b.Slot_2 = bookings.Slot_2;
                }
                if(b.Slot_3==null)
                {
                    b.Slot_3 = bookings.Slot_3;
                }
                if (b.Slot_4 == null)
                {
                    b.Slot_4 = bookings.Slot_4;
                }
                if(b.Slot_5 == null)
                {
                    b.Slot_5 = bookings.Slot_5;
                }
                await _appointmentDBContext.SaveChangesAsync();
                return b;
            }
            return null;    
        }

        public async Task<Bookings> RescheduleBooking(Bookings bookings,int userId)
        {
            var b = GetBookings(bookings.Date, bookings.Courses);
            if(b != null)
            {
                if(b.Slot_1 != null && bookings.Slot_1==null && b.Slot_1== userId)
                {
                    b.Slot_1 = null;
                }
                else if(b.Slot_1 == null && bookings.Slot_1 != null)
                {
                    b.Slot_1 = bookings.Slot_1;
                }
                if (b.Slot_2 != null && bookings.Slot_2 == null && b.Slot_2 == userId)
                {
                    b.Slot_2 = null;
                }
                else if (b.Slot_2 == null && bookings.Slot_2 != null)
                {
                    b.Slot_2 = bookings.Slot_2;
                }
                if (b.Slot_3 != null && bookings.Slot_3 == null && b.Slot_3 == userId)
                {
                    b.Slot_3 = null;
                }
                else if (b.Slot_3 == null && bookings.Slot_3 != null)
                {
                    b.Slot_3 = bookings.Slot_3;
                }
                if (b.Slot_4 != null && bookings.Slot_4 == null && b.Slot_4 == userId)
                {
                    b.Slot_4 = null;
                }
                else if (b.Slot_4 == null && bookings.Slot_4 != null)
                {
                    b.Slot_4 = bookings.Slot_4;
                }
                if (b.Slot_5 != null && bookings.Slot_5 == null && b.Slot_5 == userId)
                {
                    b.Slot_5 = null;
                }
                else if (b.Slot_5 == null && bookings.Slot_5 != null)
                {
                    b.Slot_5 = bookings.Slot_5;
                }
                await _appointmentDBContext.SaveChangesAsync();
                var updated = GetBookings(bookings.Date, bookings.Courses);
                return updated;
            }
            return null;
        }
        public async Task<Bookings> DeleteBooking(DateTime date,int courseId)
        {
            var booking = GetBookings(date,courseId);
            if (booking != null)
            {
                _appointmentDBContext.Booking.Remove(booking);
                await _appointmentDBContext.SaveChangesAsync();
                return booking;
            }
            return null;
        }
        
        public async Task<Bookings> CancelBooking(DateTime date,int courseId,int userId)
        {
            var book = GetBookings(date, courseId);
            if(book != null)
            {
                if(book.Slot_1 == userId)
                {
                    book.Slot_1 = null;
                }
                if (book.Slot_2 == userId)
                {
                    book.Slot_2 = null;
                }
                if (book.Slot_3 == userId)
                {
                    book.Slot_3 = null;
                }
                if (book.Slot_4 == userId)
                {
                    book.Slot_4 = null;
                }
                if (book.Slot_5 == userId)
                {
                    book.Slot_5 = null;
                }
                await _appointmentDBContext.SaveChangesAsync();
                return book;
            }
            return null;
        }

  
    }

}






    
    

    