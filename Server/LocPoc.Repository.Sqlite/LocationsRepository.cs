using LocPoc.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace LocPoc.Repository.Sqlite
{
    public class LocationsRepository : ILocationsRepository
    {
        private readonly SqliteContext _context;

        public LocationsRepository(SqliteContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _context.Database.Migrate();
        }

        public Location Add(Location location)
        {
            location.Id = Guid.NewGuid().ToString();
            _context.Locations.Add(location);
            _context.SaveChanges();
            return location;
        }

        public void Delete(string id)
        {
            var loc = _context.Locations.Find(id);
            if (loc != null)
            {
                _context.Locations.Remove(loc);
            }
            _context.SaveChanges();
        }

        public Location Get(string id)
        {
            var loc = _context.Locations.Find(id);
            return loc;
        }

        public IEnumerable<Location> GetAll()
        {
            return _context.Locations;
        }

        public Location Update(Location location)
        {
            var loc = _context.Locations.Find(location.Id);
            if (loc != null)
            {
                loc.Name = location.Name;
                loc.Description = location.Description;
                loc.Latitude = location.Latitude;
                loc.Longitude = location.Longitude;
            }
            _context.SaveChanges();
            return loc;
        }
    }
}
