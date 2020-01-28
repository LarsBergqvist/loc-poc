using System;
using System.Collections.Generic;
using LocPoc.Contracts;
using Newtonsoft.Json;

namespace LocPoc.Repository.InMemory
{
    public class LocationsRepository : ILocationsRepository
    {
        List<Location> _locations;

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

        public void Delete(string id)
        {
            _locations.RemoveAll(loc => loc.Id == id);
        }

        public Location Get(string id)
        {
            return _locations.Find(loc => loc.Id == id);
        }

        public IEnumerable<Location> GetAll()
        {
            return _locations;
        }

        public Location Update(Location location)
        {
            var currentIdx = _locations.FindIndex(loc => loc.Id == location.Id);
            if (currentIdx > -1)
            {
                _locations[currentIdx] = location;
            }
            return location;
        }
    }
}
