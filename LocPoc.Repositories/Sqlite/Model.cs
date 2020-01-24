using Microsoft.EntityFrameworkCore;
using LocPoc.Contracts;

namespace LocPoc.Repositories.Sqlite
{
    public class SqliteContext: DbContext   
    {
        public SqliteContext(DbContextOptions<SqliteContext> options) : base(options)
        {

        }
        public DbSet<Place> Places { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=locpoc.db");
    }
}
