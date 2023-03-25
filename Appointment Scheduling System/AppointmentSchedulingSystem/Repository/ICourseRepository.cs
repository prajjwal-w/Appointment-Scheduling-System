using AppointmentSchedulingSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingSystem.Repository
{
    public interface ICourseRepository
    {
        List<Course> GetAllCourse();
        Task<Course> AddCourse(Course course);

        Task<Course> UpdateCourse(Course course);
        Task<Course> DeleteCourse(int id);
    }
}
