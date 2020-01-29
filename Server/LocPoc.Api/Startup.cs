using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using LocPoc.Contracts;
using Microsoft.EntityFrameworkCore;

namespace LocPoc.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Sqlite database
            services.AddDbContext<LocPoc.Repository.Sqlite.SqliteContext>(options =>
                options.UseSqlite("Data Source=locpoc.db"));
            services.AddScoped<ILocationsRepository, LocPoc.Repository.Sqlite.LocationsRepository>();

            // Fake in-memory collection
            //              services.AddScoped<ILocationsRepository, LocPoc.Repository.InMemory.LocationsRepository>();

            services.AddCors(options =>
            {
                options.AddPolicy("Open", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            services.AddControllers()
               .AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
//                app.UseExceptionHandler("/api/Locations");
                                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/api/Locations");
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors("Open");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
