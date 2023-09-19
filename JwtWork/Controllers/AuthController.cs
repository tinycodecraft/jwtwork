using System;
using JwtWork.Hubs;
using JwtWork.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

using System.Linq;
using JwtWork.UserDB;
using static JwtWork.Abstraction.Interfaces;
using JwtWork.Abstraction.Tools;

namespace JwtWork.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly IHubContext<UsersHub> _hubContext;

        private readonly ILogger _logger;
        private readonly JwtDB _context;
        private readonly IJwtManager mgr;

        public AuthController(IHubContext<UsersHub> usersHub,ILogger<AuthController> logger, JwtDB db,IJwtManager itmgr)
        {
            _hubContext = usersHub;
            _logger = logger;
            _context = db;
            mgr = itmgr;
        }

        [HttpPost]
        [ProducesResponseType(typeof(AuthUser), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody]Credentials request)
        {
            _logger.LogInformation("Login api is called.");
            var loginError =await mgr.Authenticate(request.UserName,request.Password, request.NewPassword);
           
            if(loginError!=null && loginError.Error.HasError())
            {
                return Ok(new AuthUser("fail", "", request.UserName, loginError.Error,loginError.NeedNew)); 
            }


            await _hubContext.Clients.All.SendAsync("UserLogin");

            var token = Guid.NewGuid().ToString();
            var authUser = new AuthUser("success", token, request?.UserName ?? "");

            return Ok(authUser);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Logout()
        {
            _logger.LogInformation("Logout api is called.");

            await _hubContext.Clients.All.SendAsync("UserLogout");
            return Ok();
        }
    }
}