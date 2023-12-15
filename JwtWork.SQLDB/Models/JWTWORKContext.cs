using System;
using System.Collections.Generic;
//using JwtWork.SQLDB.Models.POCO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace JwtWork.SQLDB.Models;

public partial class JWTWORKContext : DbContext
{
    IHostEnvironment _env;

    public JWTWORKContext(DbContextOptions<JWTWORKContext> options,IHostEnvironment env)
        : base(options)
    {
        _env = env;
    }

    public virtual DbSet<UserTB> UserTB { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        /*
=> optionsBuilder.UseSqlServer("Data Source=10.23.80.21;Initial Catalog=JWTWORK;Persist Security Info=True;User ID=stds;Password=P@ssw0rd;Trust Server Certificate=True;Command Timeout=300");         
         */

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

        var builder = new DbContextOptionsBuilder<JWTWORKContext>();
        var connectionString = configuration.GetConnectionString("jwtSQLDB");
        optionsBuilder.UseSqlServer(connectionString);

    }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserTB>(entity =>
        {
            entity.Property(e => e.LoginAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(getdate())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<JWTWORKContext>
{
    IHostEnvironment _env;

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
        return new JWTWORKContext(builder.Options, _env);
    }
}