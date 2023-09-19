using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Reflection.Emit;

namespace JwtWork.UserDB
{
    public class JwtDB: IdentityDbContext<IdentityUser>
    {
        IHostEnvironment _env;
        
        public JwtDB(DbContextOptions<JwtDB> options,IHostEnvironment env) : base(options)
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
                                    .AddJsonFile(@Directory.GetCurrentDirectory() + "/appsettings.json",optional: false,reloadOnChange:true)
                                    .AddJsonFile(@Directory.GetCurrentDirectory() + $"/appsettings.{_env.EnvironmentName}.json",optional:true)
                                    .Build();
            }
            
            var builder = new DbContextOptionsBuilder<JwtDB>();
            var connectionString = configuration.GetConnectionString("jwtDB");
            optionsBuilder.UseNpgsql(connectionString, opt => opt.MigrationsAssembly("JwtWork.UserDB"));


        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            //This is the functional way on NetCore > 2.2
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var tableName = entityType.GetTableName();

                if (tableName.StartsWith("AspNet"))
                {
                    entityType.SetTableName(tableName.Substring(6));
                }
            }
        }

    }

    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<JwtDB>
    {
        IHostEnvironment _env;
        
        public DesignTimeDbContextFactory(IHostEnvironment env) { 
            _env = env;
            
        }
        public JwtDB CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(@Directory.GetCurrentDirectory() + "/../JwtWork/appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<JwtDB>();
            var connectionString = configuration.GetConnectionString("jwtDB");
            builder.UseNpgsql(connectionString, opt => opt.MigrationsAssembly("JwtWork.UserDB"));
            return new JwtDB(builder.Options,_env);
        }
    }
}