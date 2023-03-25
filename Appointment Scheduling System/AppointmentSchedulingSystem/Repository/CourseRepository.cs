using AppointmentSchedulingSystem.Context;
using AppointmentSchedulingSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Repository
{
    public class CourseRepository : ICourseRepository
    {
        readonly AppointmentDbContext _appointmentDbContext;
        public CourseRepository(AppointmentDbContext appointmentDbContext)
        {
            _appointmentDbContext = appointmentDbContext;
        }

        public List<Course> GetAllCourse()
        {
            return  _appointmentDbContext.Courses.ToList();
        }

        public async Task<Course> AddCourse(Course course)
        {
            _appointmentDbContext.Courses.Add(course);
            await _appointmentDbContext.SaveChangesAsync();
            return course;
        }
        public async Task<Course> UpdateCourse(Course course)
        {
            var courseDet = _appointmentDbContext.Courses.Where(u => u.Id == course.Id).FirstOrDefault();
            courseDet.CourseName = course.CourseName;
            courseDet.TrainerName = course.TrainerName;
            await _appointmentDbContext.SaveChangesAsync();
            return course;
        }

        public async Task<Course> DeleteCourse(int id)
        {
            var course = _appointmentDbContext.Courses.Where(u => u.Id == id).FirstOrDefault();

            _appointmentDbContext.Courses.Remove(course);
            await _appointmentDbContext.SaveChangesAsync();
            return course;
        }

        //public Course GetCourseById(int id)
        //{
        //    var course = _appointmentDbContext.Courses.Where(u => u.Id == id).FirstOrDefault();
        //    return course;
        //}
    }
}
