using System.Collections.Generic;
using LocPoc.Models;
using Newtonsoft.Json;

namespace LocPoc.Repositories
{
    public class PlacesRepositoryFake : IPlacesRepository
    {
        IList<Place> _places;

        public PlacesRepositoryFake()
        {
            _places = new List<Place>();
            var parsedPlaces = JsonConvert.DeserializeObject<Place[]>(Fake.Resource1.initial_data);
            foreach(var place in parsedPlaces)
            {
               _places.Add(place);
            }
        }

        public IEnumerable<Place> GetAllPlaces()
        {
            return _places;
        }
    }
}
