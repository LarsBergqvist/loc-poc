using LocPoc.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace LocPoc.Repository.Sqlite
{
    public class PlacesRepository : IPlacesRepository
    {
        private readonly SqliteContext _context;

        public PlacesRepository(SqliteContext context)
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
