using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LocPoc.Contracts;

namespace LocPoc.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        ILocationsRepository _locationsRepository;
        public LocationsController(ILocationsRepository locationsRepository)
        {
            _locationsRepository = locationsRepository;
        }

        // GET: api/Locations
        [HttpGet]
        public IEnumerable<Location> Get()
        {
            return _locationsRepository.GetAll();
        }

        // GET: api/Locations/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Locations
        [HttpPost]
        public IActionResult Post([FromBody] Location location)
        {
            if (location == null)
                return BadRequest();

            if (String.IsNullOrWhiteSpace(location.Name))
            {
                ModelState.AddModelError("Name", "Name must be specified");
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdLoc = _locationsRepository.Add(location);

            return Created("location", createdLoc);
        }

        // PUT: api/Locations/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Locations/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
