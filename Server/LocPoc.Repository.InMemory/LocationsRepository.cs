using System;
using System.Collections.Generic;
using LocPoc.Contracts;
using Newtonsoft.Json;

namespace LocPoc.Repository.InMemory
{
    public class LocationsRepository : ILocationsRepository
    {
        IList<Location> _locations;

        public LocationsRepository()
        {
            _locations = new List<Location>();
            var parsedLocations = JsonConvert.DeserializeObject<Location[]>(Resource1.initial_data);
            foreach (var location in parsedLocations)
            {
                _locations.Add(location);
            }
        }

        public Location Add(Location location)
        {
            location.Id = Guid.NewGuid().ToString();
            _locations.Add(location);
            return new Location();
        }

        public IEnumerable<Location> GetAll()
        {
            return _locations;
        }
    }
}
