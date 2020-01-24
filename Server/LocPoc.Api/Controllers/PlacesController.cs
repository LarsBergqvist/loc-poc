using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LocPoc.Contracts;

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
        public IActionResult Post([FromBody] Place place)
        {
            if (place == null)
                return BadRequest();

            if (String.IsNullOrWhiteSpace(place.Name))
            {
                ModelState.AddModelError("Name", "Name must be specified");
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdPlace = _placesRepository.AddPlace(place);

            return Created("place", createdPlace);
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
