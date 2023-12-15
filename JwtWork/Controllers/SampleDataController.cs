using System;
using System.Linq;
using JwtWork.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Collections.Immutable;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using JwtWork.PISDB.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using JwtWork.Abstraction.Models;

namespace JwtWork.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SampleDataController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IFileService _fileService;

        private readonly IOptions<PathSetting> _pathData;

        private readonly JWTPISContext _db;
        public SampleDataController(ILogger<SampleDataController> logger,JWTPISContext db,IFileService fileService,IOptions<PathSetting> pathData) { 
            _logger = logger;
            _db= db;
            _logger.LogInformation("Same Data Controller being invoked.");
            _fileService = fileService;
            _pathData = pathData;
        }

        public static readonly ImmutableArray<string> Summaries = ImmutableArray.Create(new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        });

        [HttpGet,Authorize]
        public IEnumerable<md.RtWeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();

            return Enumerable.Range(1, 5).Select(index => new md.RtWeatherForecast
            {
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)],
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d")
            })
            .ToArray();
        }

        [HttpGet,Authorize]
        [ProducesResponseType(typeof(md.RtLinkResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetWordSample(string type)
        {
            var xmldata =await System.IO.File.ReadAllTextAsync(ut.SubStringExtensions.GetPath(_pathData.Value, PathType.Share, null, "Data.xml"));
            var worddemopath = _fileService.GenerateWordWithData(xmldata, "TemplateDocument.docx", type);
            var status = System.IO.File.Exists(worddemopath) ? "success" : "failure";
            var downloadlink = ut.SubStringExtensions.GetPath(_pathData.Value, PathType.Stream, $"Share.{type}", System.IO.Path.GetFileName(worddemopath));
            return Ok(new md.RtLinkResult
            {
                Status = status,
                DownloadLink = downloadlink,
                Type = type
            });

        }

        

    }
}