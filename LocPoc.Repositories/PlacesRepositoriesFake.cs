using System;
using System.Collections.Generic;
using LocPoc.Models;

namespace LocPoc.Repositories
{
    public class PlacesRepositoryFake : IPlacesRepository
    {
        IList<Place> _places;

        public PlacesRepositoryFake()
        {
            _places = new List<Place>();
            _places.Add(new Place { Name = "apa", Description = "test", Latitude = 10.1, Longitude = 10.2 });
        }

        public IEnumerable<Place> GetAllPlaces()
        {
            return _places;
        }
    }
}
