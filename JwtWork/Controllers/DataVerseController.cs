using JwtWork.Abstraction.Models;
using JwtWork.Abstraction.Tools;
using JwtWork.Controllers;
using JwtWork.Extensions;
using JwtWork.PISDB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace GhostUI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DataVerseController : Controller
    {

        private readonly ILogger _logger;

        private readonly JWTPISContext _db;

        public DataVerseController(ILogger<SampleDataController> logger, JWTPISContext db)
        {
            _logger = logger;
            _db = db;
            _logger.LogInformation("Data Verse Controller being invoked (for querying mantine table clients).");
        }


        [HttpPost]
        [ProducesResponseType(typeof(md.RtDTOVerseData),StatusCodes.Status200OK)]
        public async Task<IActionResult> Search([FromBody] ItMantineQuery query)
        {
            var result = new RtDTOVerseData() { start=0, status="failure", total_count=0};
            var url = new Uri("https://demo.dataverse.org/api/search");
            using (var cl =new HttpClient())
            {
                var newstart = query.Start < 0 ? 0 : query.Start;
                url= url.AddQuery("q", query.GlobalFilter ?? "*");
                url= url.AddQuery("start", $"{newstart}");
                url= url.AddQuery("per_page", $"{query.Size}");
                
                using(var response = await cl.GetAsync(url))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    if(apiResponse!=null)
                    {
                        var rtResult =  apiResponse.DeserializeAnonymousType<md.RtVerseData>();

                        if (rtResult != null)
                        {
                            result = new RtDTOVerseData
                            {
                                status = rtResult.status == "OK" ? "success": "failure",
                                total_count = rtResult.data.total_count,
                                data = rtResult.data.items,
                                start = newstart + query.Size,
                            };
                        }
                            


                    }
                }

            }
            return Ok(result);
        }

    }
}
