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
    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;

        public CoursesController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [Authorize]
        [HttpGet]
        [Route("GetAllCourse")]
        public ActionResult GetAllCourse()
        {
            List<Course> courses = _courseRepository.GetAllCourse();
            return Ok(courses);
        }

        [Authorize]
        [HttpPost]
        [Route("AddCourse")]
        public async Task<ActionResult> AddCourse(Course course)
        {
            Course c = await _courseRepository.AddCourse(course);
            return Ok(c);
        }
        [Authorize]
        [HttpPut]
        [Route("UpdateCourse")]
        public async Task<ActionResult> UpdateCourse(Course course)
        {
            Course c = await _courseRepository.UpdateCourse(course);
            return Ok(c);
        }
        [Authorize]
        [HttpDelete]
        [Route("DeleteCourse/{id}")]
        public async Task<ActionResult> DeleteCourse(int id)
        {
            Course c = await _courseRepository.DeleteCourse(id);
            return Ok(c);
        }

    }
}
