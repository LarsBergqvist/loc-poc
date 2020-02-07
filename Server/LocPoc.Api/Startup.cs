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

        private IConfiguration Configuration { get; }

        private readonly string CorsPolicy = "appCorsPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // Sqlite database
            services.AddDbContext<LocPoc.Repository.Sqlite.SqliteContext>(options =>
                options.UseSqlite("Data Source=locpoc.db"));
            services.AddScoped<ILocationsRepository, LocPoc.Repository.Sqlite.LocationsRepository>();

            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy,
                builder =>
                {
                    builder.WithOrigins(Configuration["AllowedOrigins"].Split(";")).AllowAnyHeader().AllowAnyMethod();
                });
            });

            services.AddControllers().AddNewtonsoftJson(options =>
                   options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.AddSwaggerGen(setupAction =>
            {
                setupAction.SwaggerDoc("LocPocOpenApiSpecification", new Microsoft.OpenApi.Models.OpenApiInfo()
                {
                    Title = "LocPoc API",
                    Version = "1"
                });
            });
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

            app.UseSwagger();

            app.UseSwaggerUI(setupAction =>
            {
                setupAction.SwaggerEndpoint("/swagger/LocPocOpenApiSpecification/swagger.json", "LocPoc API");
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(CorsPolicy);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
