using JwtWork.SQLDB.Models;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.SQLDB.Models;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<JWTWORKContext>
{
    IHostEnvironment _env;

    public DesignTimeDbContextFactory()
    {
        
    }

    public DesignTimeDbContextFactory(IHostEnvironment env)
    {
        _env = env;

    }
    public JWTWORKContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile(@Directory.GetCurrentDirectory() + "/../JwtWork/appsettings.json")
            .Build();
        var builder = new DbContextOptionsBuilder<JWTWORKContext>();
        var connectionString = configuration.GetConnectionString("jwtSQLDB");
        builder.UseSqlServer(connectionString, opt => opt.MigrationsAssembly("JwtWork.SQLDB"));
        return new JWTWORKContext(builder.Options,_env);
    }
}