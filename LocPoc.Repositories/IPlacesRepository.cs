using System;
using System.Collections.Generic;
using LocPoc.Models;

namespace LocPoc.Repositories
{
    public interface IPlacesRepository
    {
        IEnumerable<Place> GetAllPlaces();
    }
}
