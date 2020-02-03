using Microsoft.EntityFrameworkCore;
using LocPoc.Contracts;

namespace LocPoc.Repository.Sqlite
{
    public class SqliteContext: DbContext   
    {
        public SqliteContext(DbContextOptions<SqliteContext> options) : base(options)
        {
        }

        public DbSet<Location> Locations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=locpoc.db");
    }
}
