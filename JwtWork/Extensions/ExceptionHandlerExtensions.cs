using System.Net;
using JwtWork.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using JwtWork.Middleware;

namespace JwtWork.Extensions
{
    public static class ExceptionHandlerExtensions
    {
        //Simple handler
        public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    var error = context.Features.Get<IExceptionHandlerFeature>();
                    var exDetails = new ExceptionDetails((int)HttpStatusCode.InternalServerError, error?.Error.Message ?? "");

                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = exDetails.StatusCode;
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    context.Response.Headers.Add("Application-Error", exDetails.Message);
                    context.Response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");

                    await context.Response.WriteAsync(exDetails.ToString());
                });
            });

            return app;
        }

        //custom handler with logging
        public static IApplicationBuilder UseApiExceptionHandling(this IApplicationBuilder app)
            => app.UseMiddleware<ApiExceptionHandlingMiddleware>();
    }
}