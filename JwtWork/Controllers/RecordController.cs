using JwtWork.Abstraction;
using JwtWork.Abstraction.Models;
using JwtWork.PISDB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections;
using System.Threading.Tasks;

namespace GhostUI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RecordController : Controller
    {
        private readonly ILogger _logger;
        private readonly JWTPISContext _db;

        public RecordController(ILogger<RecordController> logger, JWTPISContext db)
        {
            _logger = logger;
            _db = db;
            _logger.LogInformation("Record Controller being invoked! (for getting jwtpis records)");
        }
        public IActionResult Index()
        {
            return View();
        }


        [HttpPost,Authorize]
        public async Task<IActionResult> GetData([FromBody]ItMantineQuery query)
        {
            //dynamic data;
            var datam = await _db.PSJob.FirstOrDefaultAsync();

            switch(query.Type)
            {
                case Record.Job:
                    
                    break;


            }


            return Ok(new
            {
                status = Constants.Status.success,
                type = query.Type,
                data = string.Empty,
                start = query.Start,
                total_count = 0
            });


        }


    }
}
