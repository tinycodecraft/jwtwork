﻿using JwtWork.PISDB.Models;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.PISDB.Models
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<JWTPISContext>
    {
        IHostEnvironment _env;

        public DesignTimeDbContextFactory()
        {

        }

        public DesignTimeDbContextFactory(IHostEnvironment env)
        {
            _env = env;

        }
        public JWTPISContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(@Directory.GetCurrentDirectory() + "/../JwtWork/appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<JWTPISContext>();
            var connectionString = configuration.GetConnectionString("jwtPISDB");
            builder.UseSqlServer(connectionString, opt => opt.MigrationsAssembly("JwtWork.PISDB"));
            return new JWTPISContext(builder.Options, _env);

        }
    }
}
