using AppointmentSchedulingSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Context
{
    public class AppointmentDbContext:DbContext
    {
        //constructor
        public AppointmentDbContext(DbContextOptions options):base(options)
        {

        }
        //table creation
        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Bookings> Booking { get; set; }
        public DbSet<Appointments> Appointment { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Bookings>().HasIndex(p => new { p.Courses, p.Date }).IsUnique(true);
            modelBuilder.Entity<User>().HasIndex(p => new { p.Username, p.Email }).IsUnique(true);
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Name = "Admin",
                    Username = "admin",
                    Password = "Admin@pass",
                    Email = "admin@gmail.com",
                    DOB = Convert.ToDateTime("2000-09-14"),
                    Phone = "8665698589"




                });
        }
    }
}
