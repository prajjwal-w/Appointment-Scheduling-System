//using AppointmentSchedulingSystem.Models;
//using AppointmentSchedulingSystem.Repository;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Internal;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace AppointmentSchedulingSystem.Service
//{
//    public class BookingService : IBookingService
//    {
//        readonly IBookingRepository _bookingRepository;

//        public BookingService(IBookingRepository bookingRepository)
//        {
//            _bookingRepository = bookingRepository;

//        }



//        public async Task<List<Bookings>>  GetAllBookings()
//        {
//            try
//            {
//                var list = await _bookingRepository.GetAllBookings.ToListAsync();
//                return list;
//            }
//            catch (Exception ex)
//            {
//                throw;
//            }
//        }
//        public async Task<Bookings> AddBooking(Bookings bookings)
//        {

//            try
//            {
//                _bookingRepository.Bookings.Add(bookings);
//                _bookingRepository.SaveChangesAsync();
//                return bookings;
//            }
//            catch (Exception)
//            {

//                throw;
//            }

//        }

//        public async Task<DateTime> DeleteBooking(DateTime date)
//        {
//            Bookings b = await _bookingRepository.DeleteBooking(date);
//            if (b != null)
//            {
//                try
//                {
//                    _bookingRepository.Bookings.Remove(date);
//                    _bookingRepository.SaveChangesAsync();
//                    return b;
//                }
//                catch (Exception)
//                {

//                    throw;
//                }
//            }
//            return date;
//        }

//        public async Task<Bookings> UpdateBooking(Bookings bookings)
//        {
//            Bookings b = await _bookingRepository.UpdateBooking(date);
//            if (b != null)
//            {
//                try
//                {
//                    b.Slot_1 = bookings.Slot_1;
//                    b.Slot_2 = bookings.Slot_2;
//                    b.Slot_3 = bookings.Slot_3;
//                    b.Slot_4 = bookings.Slot_4;
//                    b.Slot_5 = bookings.Slot_5;
//                    _bookingRepository.SaveChangesAsync();
//                    return b;
//                }
//                catch (Exception)
//                {

//                    throw;
//                }
//            }
//            return null;
//        }

        
//    }
        
    
//}


