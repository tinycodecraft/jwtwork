using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtWork.PISDB.Models;

public partial class PSItem
{

}

public partial class FileCategory
{

}

public partial class FileSubCategory
{

}

public partial class PSJob
{

}

public partial class PSItemLink
{

}

public partial class JWTPISContext
{

    IHostEnvironment _env;
    public JWTPISContext(DbContextOptions<JWTPISContext> options, IHostEnvironment env)
        : base(options)
    {
        _env = env;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {


        base.OnConfiguring(optionsBuilder);
        IConfigurationRoot configuration = null;

        if (!_env.IsProduction())
        {
            configuration = new ConfigurationBuilder()
                                .SetBasePath(Directory.GetCurrentDirectory())
                                .AddJsonFile(@Directory.GetCurrentDirectory() + "/../JwtWork/appsettings.json")
                                .Build();
        }
        else
        {
            configuration = new ConfigurationBuilder()
                                .SetBasePath(Directory.GetCurrentDirectory())
                                .AddJsonFile(@Directory.GetCurrentDirectory() + "/appsettings.json", optional: false, reloadOnChange: true)
                                .AddJsonFile(@Directory.GetCurrentDirectory() + $"/appsettings.{_env.EnvironmentName}.json", optional: true)
                                .Build();
        }

        var builder = new DbContextOptionsBuilder<JWTPISContext>();
        var connectionString = configuration.GetConnectionString("jwtPISDB");
        optionsBuilder.UseSqlServer(connectionString);

    }
}