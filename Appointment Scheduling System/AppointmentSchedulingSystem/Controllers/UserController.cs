using AppointmentSchedulingSystem.Models;
using AppointmentSchedulingSystem.Repository;
using AppointmentSchedulingSystem.Service;
using AppointmentSchedulingSystem.UserCredentials;
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
    public class UserController : ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly IUserRepository _userRepository;
        //constructor
        public UserController(ILoginService loginService, IUserRepository userRepository)
        {
            _loginService = loginService;
            _userRepository = userRepository;
        }
        [HttpPost]
        [Route("Login")]
        public ActionResult Login(UserCreds userCredentials)
        {
            var result = _loginService.Login(userCredentials);
            
            
            return Ok(result);
            
            
           
        }
        [HttpPost]
        [Route("Register")]
        public ActionResult Register(User user)
        {
            
            var result = _loginService.Register(user);
            if (result != null)
            {
                return Ok(result);
            }
            else return BadRequest("User not register");
        }

        [Authorize]
        [HttpGet]
        [Route("GetUserDetails")]
        public ActionResult GetUserDetails(string userName)
        {
            var res = _userRepository.GetUser(userName);
            if(res != null)
            {
                return Ok(res);
            }
            return null;
        }
    }
}
