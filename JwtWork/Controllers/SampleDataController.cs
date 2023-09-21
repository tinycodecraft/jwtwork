using System;
using System.Linq;
using JwtWork.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Collections.Immutable;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

namespace JwtWork.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SampleDataController : ControllerBase
    {
        private readonly ILogger _logger;
        public SampleDataController(ILogger<SampleDataController> logger) { 
            _logger = logger;
            _logger.LogInformation("Same Data Controller being invoked.");
        }

        public static readonly ImmutableArray<string> Summaries = ImmutableArray.Create(new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        });

        [HttpGet,Authorize]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)],
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d")
            })
            .ToArray();
        }
    }
}