using System.Collections.Generic;

namespace LocPoc.Contracts
{
    public interface IPlacesRepository
    {
        IEnumerable<Place> GetAllPlaces();
        Place AddPlace(Place place);
    }
}
