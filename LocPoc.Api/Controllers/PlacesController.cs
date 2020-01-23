using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LocPoc.Repositories;
using LocPoc.Models;

namespace LocPoc.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        IPlacesRepository _placesRepository;
        public PlacesController(IPlacesRepository placesRepository)
        {
            _placesRepository = placesRepository;
        }

        // GET: api/Places
        [HttpGet]
        public IEnumerable<Place> Get()
        {
            return _placesRepository.GetAllPlaces();
        }

        // GET: api/Places/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Places
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Places/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
