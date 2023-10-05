using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace JwtWork.Middleware
{
    public class TracerService : BackgroundService
    {
        private readonly ILogger _logger;
        private readonly IHostEnvironment _env;
        public TracerService(ILogger<TracerService> logger,IHostEnvironment env) { 
            _logger = logger;
            _env = env;
            
        }
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            this._logger.LogInformation(new EventId(2000, "Trace"), "Start {ClassName}.{MethodName}... on Environment {ASPNETCORE}",
                      nameof(TracerService), nameof(this.ExecuteAsync), _env.IsProduction() ? "Production": "Non-Production");

            var sensorInput = new { Latitude = 25, Longitude = 134 };
            this._logger.LogInformation("Processing {@SensorInput}", sensorInput);

            return Task.CompletedTask;
        }
    }
}
