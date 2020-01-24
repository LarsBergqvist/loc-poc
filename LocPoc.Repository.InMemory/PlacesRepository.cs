using System;
using System.Collections.Generic;
using LocPoc.Contracts;
using Newtonsoft.Json;

namespace LocPoc.Repository.InMemory
{
    public class PlacesRepository : IPlacesRepository
    {
        IList<Place> _places;

        public PlacesRepository()
        {
            _places = new List<Place>();
            var parsedPlaces = JsonConvert.DeserializeObject<Place[]>(Resource1.initial_data);
            foreach (var place in parsedPlaces)
            {
                _places.Add(place);
            }
        }

        public Place AddPlace(Place place)
        {
            place.Id = Guid.NewGuid().ToString();
            _places.Add(place);
            return new Place();
        }

        public IEnumerable<Place> GetAllPlaces()
        {
            return _places;
        }
    }
}
