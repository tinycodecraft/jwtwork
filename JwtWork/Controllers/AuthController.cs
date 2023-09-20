using System;
using JwtWork.Hubs;
using JwtWork.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

using System.Linq;

using static JwtWork.Abstraction.Interfaces;
using JwtWork.Abstraction.Tools;
using JwtWork.SQLDB.Models;

namespace JwtWork.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly IHubContext<UsersHub> _hubContext;

        private readonly ILogger _logger;
        private readonly JWTWORKContext _context;
        private readonly IJwtManager mgr;
        private readonly TokenService jwtsvc;

        public AuthController(IHubContext<UsersHub> usersHub,ILogger<AuthController> logger, JWTWORKContext db,IJwtManager itmgr,TokenService jwtmgr)
        {
            _hubContext = usersHub;
            _logger = logger;
            _context = db;
            mgr = itmgr;
            jwtsvc = jwtmgr;
        }

        [HttpPost]
        [ProducesResponseType(typeof(AuthUser), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody]Credentials request)
        {
            _logger.LogInformation("Login api is called.");
            var hasuser = await mgr.HasUser();
            if (!hasuser)
            {
                var registerError = await mgr.Register(request.UserName, request.Password);
                if(!string.IsNullOrEmpty(registerError))
                {
                    return Ok(new AuthUser("fail", "", request.UserName, registerError, false));

                }
            }
            var loginError =await mgr.Authenticate(request.UserName,request.Password, request.NewPassword);

            var user = await mgr.GetUser(request.UserName);

            if(user==null)
            {
                return Ok(new AuthUser("fail", "", request.UserName, "No user found!", false));
            }

            if (loginError!=null && loginError.Error.HasError())
            {
                return Ok(new AuthUser("fail", "", request.UserName, loginError.Error,loginError.NeedNew)); 
            }

            await _hubContext.Clients.All.SendAsync("UserLogin");

            var token =  jwtsvc.CreateToken(user);

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