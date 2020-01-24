using LocPoc.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace LocPoc.Repositories.Sqlite
{
    public class PlacesRepositorySqlite : IPlacesRepository
    {
        private readonly SqliteContext _context;

        public PlacesRepositorySqlite(SqliteContext context)
        {
            _context = context;
        }

        public Place AddPlace(Place place)
        {
            place.Id = Guid.NewGuid().ToString();
            _context.Places.Add(place);
            _context.SaveChanges();
            return place;
        }

        public IEnumerable<Place> GetAllPlaces()
        {
            return _context.Places;
        }
    }
}
