using System.Collections.Generic;
using System.Threading.Tasks;

namespace LocPoc.Contracts
{
    public interface ILocationsRepositoryAsync
    {
        Task<IEnumerable<Location>> GetAllAsync();
        Task<Location> GetAsync(string id);
        Task<Location> CreateAsync(Location location);
        Task<Location> UpdateAsync(Location location);
        Task DeleteAsync(string id);
    }
}
