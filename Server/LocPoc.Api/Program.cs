using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LocPoc.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false)
                .Build();
            var useFakeData = config["UseFakeData"] == "True";

            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                if (!useFakeData)
                {
                    using var context = scope.ServiceProvider.GetService<LocPoc.Repository.Sqlite.SqliteContext>();
                    context.Database.EnsureCreated();
                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
