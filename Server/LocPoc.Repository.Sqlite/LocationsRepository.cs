using LocPoc.Contracts;
using System;
using System.Collections.Generic;

namespace LocPoc.Repository.Sqlite
{
    public class LocationsRepository : ILocationsRepository
    {
        private readonly SqliteContext _context;

        public LocationsRepository(SqliteContext context)
        {
            _context = context;
        }

        public Location Add(Location location)
        {
            location.Id = Guid.NewGuid().ToString();
            _context.Locations.Add(location);
            _context.SaveChanges();
            return location;
        }

        public IEnumerable<Location> GetAll()
        {
            return _context.Locations;
        }
    }
}
