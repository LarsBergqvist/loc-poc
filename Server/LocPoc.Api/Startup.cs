using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using LocPoc.Contracts;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;

namespace LocPoc.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string AllowedOrigins = "_allowedOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // Sqlite database
            services.AddDbContext<LocPoc.Repository.Sqlite.SqliteContext>(options =>
                options.UseSqlite("Data Source=locpoc.db"));
            services.AddScoped<ILocationsRepository, LocPoc.Repository.Sqlite.LocationsRepository>();

            services.AddCors(options =>
            {
                options.AddPolicy(AllowedOrigins,
                builder =>
                {
                    builder.WithOrigins("https://localhost:4300").AllowAnyHeader().AllowAnyMethod();
                });
            });

            services.AddControllers().AddNewtonsoftJson(options =>
                   options.SerializerSettings.ContractResolver = new DefaultContractResolver());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/api/Locations");
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(AllowedOrigins);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
