using JwtWork.Abstraction;
using JwtWork.Abstraction.Tools;
using JwtWork.Hubs;
using JwtWork.Models;
using JwtWork.SQLDB.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;


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
        [ProducesResponseType(typeof(md.RefreshTokenState),StatusCodes.Status200OK)]
        public async Task<IActionResult> Renew([FromBody]md.TokenState request)
        {
            var savedrefresh = HttpContext.Session.GetString(Session.REFRESHTOKEN);
            var saveduserid = HttpContext.Session.GetString(Session.USERID);

            var user =await _context.UserTB.FirstOrDefaultAsync(e => e.UserId == saveduserid);
            if(user!=null && savedrefresh == request.Token && request.Token != null)
            {
                var newtoken = jwtsvc.CreateToken(user);
                return Ok(new md.RefreshTokenState { NewToken= newtoken,Status= Status.success });
            }

            return Ok(new md.RefreshTokenState { Status = Status.failure });
           
        }

        [HttpPost]
        [ProducesResponseType(typeof(md.RtAuthUser), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody]md.ItCredentials request)
        {
            _logger.LogInformation("Login api is called.");
            var hasuser = await mgr.HasUser();
            if (!hasuser)
            {
                var registerError = await mgr.Register(request.UserName, request.Password);
                if(!string.IsNullOrEmpty(registerError))
                {
                    return Ok(md.RtAuthUser.CreateFailureFor(request.UserName, registerError, false));

                }
            }
            var loginError =await mgr.Authenticate(request.UserName,request.Password, request.NewPassword);

            var user = await mgr.GetUser(request.UserName);

            if(user==null)
            {
                return Ok(md.RtAuthUser.CreateFailureFor(request.UserName, "No user found!", false));
            }

            if (loginError!=null && loginError.Error.HasError())
            {
                
                return Ok(md.RtAuthUser.CreateFailureFor( request.UserName, loginError.Error,loginError.NeedNew)); 
            }
            
            await _hubContext.Clients.All.SendAsync(nameof(IUsersHub.UserLogin));
            
            var token =  jwtsvc.CreateToken(user);
            
            var refreshtoken = TokenService.GenerateRefreshToken();

            HttpContext.Session.SetString(Session.REFRESHTOKEN, refreshtoken);
            HttpContext.Session.SetString(Session.USERID, user.UserId);

            var authUser = new md.RtAuthUser(Status.success, token, refreshtoken, request?.UserName ?? "");

            return Ok(authUser);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Logout()
        {
            _logger.LogInformation("Logout api is called.");
            

            await _hubContext.Clients.All.SendAsync(nameof(IUsersHub.UserLogout));
            return Ok();
        }
    }
}