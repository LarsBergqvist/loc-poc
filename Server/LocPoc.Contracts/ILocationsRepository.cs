using System.Collections.Generic;
using System.Threading.Tasks;

namespace LocPoc.Contracts
{
    public interface ILocationsRepository
    {
        IEnumerable<Location> GetAll();
        Location Get(string id);
        Location Create(Location location);
        Location Update(Location location);
        void Delete(string id);
    }
}
