using System.Collections.Generic;

namespace LocPoc.Contracts
{
    public interface ILocationsRepository
    {
        IEnumerable<Location> GetAll();
        Location Add(Location location);
    }
}
