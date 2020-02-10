using LocPoc.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LocPoc.Repository.Sqlite
{
    public class LocationsRepositoryAsync : ILocationsRepositoryAsync
    {
        private readonly SqliteContext _context;

        public LocationsRepositoryAsync(SqliteContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Location>> GetAllAsync()
        {
            return await _context.Locations.ToListAsync();
        }

        public async Task<Location> GetAsync(string id)
        {
            var location = await _context.Locations.FindAsync(id);
            return location;
        }


        public async Task<Location> CreateAsync(Location location)
        {
            location.Id = Guid.NewGuid().ToString();
            await _context.Locations.AddAsync(location);
            await _context.SaveChangesAsync();
            return location;
        }

        public async Task<Location> UpdateAsync(Location location)
        {
            var loc = await _context.Locations.FindAsync(location.Id);
            if (loc != null)
            {
                loc.Name = location.Name;
                loc.Description = location.Description;
                loc.Latitude = location.Latitude;
                loc.Longitude = location.Longitude;
            }
            await _context.SaveChangesAsync();
            return loc;
        }

        public async Task DeleteAsync(string id)
        {
            var loc = await _context.Locations.FindAsync(id);
            if (loc != null)
            {
                _context.Locations.Remove(loc);
            }
            await _context.SaveChangesAsync();
        }

    }
}
