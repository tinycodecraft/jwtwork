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
using Microsoft.AspNetCore.Authentication;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using JwtWork.Abstraction.Models;

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
        [ProducesResponseType(typeof(RefreshTokenState),StatusCodes.Status200OK)]
        public async Task<IActionResult> Renew([FromBody]TokenState request)
        {
            var savedrefresh = HttpContext.Session.GetString("REFRESHTOKEN");
            var saveduserid = HttpContext.Session.GetString("USERID");

            var user =await _context.UserTB.FirstOrDefaultAsync(e => e.UserId == saveduserid);
            if(user!=null && savedrefresh == request.Token && request.Token != null)
            {
                var newtoken = jwtsvc.CreateToken(user);
                return Ok(new RefreshTokenState { NewToken= newtoken,Status="success" });
            }

            return Ok(new RefreshTokenState { Status = "fail" });
           
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
                    return Ok(AuthUser.CreateFailureFor(request.UserName, registerError, false));

                }
            }
            var loginError =await mgr.Authenticate(request.UserName,request.Password, request.NewPassword);

            var user = await mgr.GetUser(request.UserName);

            if(user==null)
            {
                return Ok(AuthUser.CreateFailureFor(request.UserName, "No user found!", false));
            }

            if (loginError!=null && loginError.Error.HasError())
            {
                return Ok(AuthUser.CreateFailureFor( request.UserName, loginError.Error,loginError.NeedNew)); 
            }
            
            await _hubContext.Clients.All.SendAsync("UserLogin");
            
            var token =  jwtsvc.CreateToken(user);
            
            var refreshtoken = TokenService.GenerateRefreshToken();

            HttpContext.Session.SetString("REFRESHTOKEN", refreshtoken);
            HttpContext.Session.SetString("USERID", user.UserId);

            var authUser = new AuthUser("success", token, refreshtoken, request?.UserName ?? "");

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