using System;
using System.IO.Compression;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.Localization;
using System.Collections.Generic;
using System.Globalization;
using Mapster;
using GhostUI.Models;
using System.Reflection;

namespace JwtWork.Extensions
{
    public static class ServiceCollectionExtensions


    {

        public static IServiceCollection AddMapster(this IServiceCollection services)
        {
            TypeAdapterConfig typeAdapterConfig = TypeAdapterConfig.GlobalSettings;
            // Scan the Application to find models for mapping based on BaseDto.
            Assembly appAssembly = typeof(BaseDto<,>).Assembly;
            typeAdapterConfig.Scan(appAssembly);

            return services;
        }

        public static IServiceCollection AddCustomLocalization(this IServiceCollection services)
        {
            services.AddLocalization(options => options.ResourcesPath = "Resources");

            //without country code "-xx" suffix => culture invariant
            var supportedCultures = new List<CultureInfo> { new("en"), new("fa") };
            services.Configure<RequestLocalizationOptions>(options =>
            {
                options.DefaultRequestCulture = new RequestCulture(supportedCultures[0]);
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
            });

            return services;
        }

        public static IServiceCollection AddCorsConfig(this IServiceCollection services, string name,md.CorsPolicySetting policy)
        {
            
            
            services.AddCors(c => c.AddPolicy(name,
                options => options.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()));
            if(policy!=null && !string.IsNullOrEmpty(policy.Name))
            {
                services.AddCors(c=> c.AddPolicy(policy.Name,options=> options.WithOrigins(policy.AllowOrigins).WithHeaders(policy.AllowHeaders).WithMethods(policy.AllowMethods)));
            }

            return services;
        }

        public static IServiceCollection AddResponseCompressionConfig(
            this IServiceCollection services,
            IConfiguration config,
            CompressionLevel compressionLvl = CompressionLevel.Fastest)
        {
            
            var enableForHttps = config.GetValue<bool>("Compression:EnableForHttps");
            var gzipMimeTypes = config.GetSection("Compression:MimeTypes").Get<string[]>();

            services.AddResponseCompression(options => {
                options.Providers.Add<BrotliCompressionProvider>();
                options.Providers.Add<GzipCompressionProvider>();
                options.EnableForHttps = enableForHttps;
                options.MimeTypes = gzipMimeTypes ?? Array.Empty<string>();
            });

            services.Configure<BrotliCompressionProviderOptions>(options => options.Level = compressionLvl);
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = compressionLvl);

            return services;
        }
    }
}
