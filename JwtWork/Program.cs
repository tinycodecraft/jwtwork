using JwtWork.Hubs;
using JwtWork.Extensions;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using System.IO;
using Serilog;
using System;
using JwtWork.Middleware;
using JwtWork.Services;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using JwtWork.Abstraction.Models;
using JwtWork.Abstraction.Tools;
using JwtWork.Abstraction;


using static JwtWork.Abstraction.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebSockets;
using Microsoft.AspNetCore.DataProtection;
using JwtWork.SQLDB.Models;
using JwtWork.SQLDB;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.Tasks;
using Azure.Core;
using JwtWork.PISDB.Models;
using Microsoft.AspNetCore.Http.Features;
//using Serilog.Core;
//using System.Linq;
//using System.Reflection.Metadata;
//using NSwag.Generation.Processors.Security;
//using Microsoft.EntityFrameworkCore.Design;
//using JwtWork.Abstraction;
//using JwtWork.Middleware;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using System;
//using System.Threading.Tasks;


var spaSrcPath = "ClientApp";
var corsPolicyName = "AllowAll";
Log.Logger = new LoggerConfiguration().MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateBootstrapLogger();


var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    ApplicationName = typeof(Program).Assembly.FullName,
    ContentRootPath = Directory.GetCurrentDirectory(),

    //EnvironmentName =  Environments.Development,
    //WebRootPath = "wwwroot"
});

var authsetting = builder.Configuration.GetSection(Constants.Setting.AuthSetting);
var pathsetting = builder.Configuration.GetSection(Constants.Setting.PathSetting);
var encryptionService = new StringEncrypService();
authsetting[nameof(AuthSetting.Secret)] = encryptionService.EncryptString(authsetting[nameof(AuthSetting.SecretKey)] ?? "");
pathsetting[nameof(PathSetting.Base)] = Directory.GetCurrentDirectory();
builder.Services.Configure<AuthSetting>(authsetting);
builder.Services.Configure<PathSetting>(pathsetting);

builder.Services.Configure<FormOptions>(opt =>
{
    //opt.BufferBodyLengthLimit = 512 * 1024 * 1024;

    //it needs
    opt.MultipartBodyLengthLimit = 512 * 1024 * 1024;

});

builder.Services.Configure<IISServerOptions>(opt =>
{
    opt.MaxRequestBodySize = 512 * 1024 * 1024;

});

//Setup IdentityDB Context and UserManager
//If not, only DB Context service to be added

builder.Services.AddDbContext<JWTWORKContext>();
builder.Services.AddDbContext<JWTPISContext>();


//hosting environment variable in iwebhostenvironment
//var isproduction = builder.Environment.IsProduction();

builder.Services.AddTransient<ProblemDetailsFactory, CustomProblemDetailsFactory>();

builder.Host.UseSerilog((ctx, srv, cfg) =>
{

    cfg
    .ReadFrom.Configuration(ctx.Configuration)
    .ReadFrom.Services(srv);


});


builder.Services.AddScoped<IJwtManager, UserManager>();

builder.Services.AddScoped<TokenService, TokenService>();
builder.Services.AddScoped<IFileService, FileService>();

//only execute once
builder.Services.AddHostedService<TracerService>();

// Custom healthcheck example
builder.Services.AddHealthChecks()
    .AddGCInfoCheck("GCInfo");

// Write healthcheck custom results to healthchecks-ui (use InMemory for the DB - AspNetCore.HealthChecks.UI.InMemory.Storage nuget package)
builder.Services.AddHealthChecksUI()
    .AddInMemoryStorage();

builder.Services.AddCorsConfig(corsPolicyName);
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

//builder.Services.AddCustomLocalization();
builder.Services.AddSignalR();



// Add Brotli/Gzip response compression (prod only)
builder.Services.AddResponseCompressionConfig(builder.Configuration);

// Config change in asp.net core 3.0+ - 'Async' suffix in action names get stripped by default - so, to access them by full name with 'Async' part - opt out of this feature.
builder.Services.AddMvc(opt => opt.SuppressAsyncSuffixInActionNames = false);

//Try to add Jwt setup

builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    //.AddAuthentication(option =>
    //{
    //    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    //    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

    //})    
    .AddJwtBearer(options =>
    {

        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ClockSkew = TimeSpan.Zero,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = authsetting[nameof(AuthSetting.Issuer)],
            ValidAudience = authsetting[nameof(AuthSetting.Audience)],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(authsetting[nameof(AuthSetting.Secret)] ?? "")
            ),

        };
        options.Events = new JwtBearerEvents()
        {

            OnAuthenticationFailed = (context) =>
            {
                var requestContent = new StringBuilder();
                requestContent.AppendLine("=== Error happens to Request Info ===");
                requestContent.AppendLine($"method = {context.Request.Method.ToUpper()}");
                requestContent.AppendLine($"path = {context.Request.Path}");

                requestContent.AppendLine("-- headers");
                foreach (var (headerKey, headerValue) in context.Request.Headers)
                {
                    requestContent.AppendLine($"header = {headerKey} value = {headerValue}");
                }
                Log.Logger.Error(context.Exception, $"{requestContent.ToString()} get JWT Auth error at path {context.Request.Path}");

                return Task.CompletedTask;


            },
        };

    });


//Try to add session
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromDays(1);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.Name = ".JwtWork.Session";
});

// In production, the React files will be served from this directory
builder.Services.AddSpaStaticFiles(opt => opt.RootPath = $"{spaSrcPath}/dist");




//*Jwt setup*//
//var jwtissuer = builder.Configuration["JWTAuth:Issuer"];
//var jwtaudience = builder.Configuration["JWTAuth:Audience"];


var app = builder.Build();


// If development, enable Hot Module Replacement
// If production, enable Brotli/Gzip response compression & strict transport security headers
if (app.Environment.IsDevelopment())
{


    app.UseDeveloperExceptionPage();
}
else
{
    app.UseResponseCompression();
    app.UseExceptionHandler("/Error");
    app.UseHsts();
    app.UseStaticFiles();//path to static files i.e. wwwroot if not specified
    app.UseSpaStaticFiles();
}

//* this help Linux deployment *//
//app.UseForwardedHeaders(new ForwardedHeadersOptions
//{
//    ForwardedHeaders = Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.All
//});

app.UseApiExceptionHandling();
app.UseCors(corsPolicyName);



// Show/write HealthReport data from healthchecks (AspNetCore.HealthChecks.UI.Client nuget package)
app.UseHealthChecksUI();
app.UseHealthChecks("/healthchecks-json", new HealthCheckOptions()
{
    Predicate = _ => true,
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});

// Register the Swagger generator and the Swagger UI middlewares


//add enrich parameter for each logging request
app.UseSerilogRequestLogging(option =>
{
    option.EnrichDiagnosticContext = (diagnostic, http) =>
    {
        diagnostic.Set("LocalTime", DateTime.Now.ToString("yyyyMMdd+HHmmss"));

    };
});

app.UseHttpsRedirection();
app.UseRouting();



//*Jwt enabled for auth*//
app.UseAuthentication();
app.UseAuthorization();

app.UseSession();

// Map controllers / SignalR hubs
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<UsersHub>("/hubs/users");
});

// Killing .NET debug session does not kill spawned Node.js process (have to manually kill)
app.UseSpa(spa =>
{
    spa.Options.SourcePath = spaSrcPath;

    if (app.Environment.IsDevelopment())
        spa.UseReactDevelopmentServer(npmScript: "start");
});

app.Run();