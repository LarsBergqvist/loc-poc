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
            var errorMessage = GetValidationErrorMessage(location);
            if (errorMessage.Length > 0)
                return BadRequest(errorMessage);

            var createdLoc = _locationsRepository.Add(location);

            return Created("location", createdLoc);
        }

        // PUT: api/Locations/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Location location)
        {
            var errorMessage = GetValidationErrorMessage(location);
            if (errorMessage.Length > 0)
                return BadRequest(errorMessage);

            _locationsRepository.Update(location);

            return NoContent();
        }

        // DELETE: api/Locations/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _locationsRepository.Delete(id);
        }

        private string GetValidationErrorMessage(Location location)
        {
            var errors = new List<string>();

            if (location == null)
            {
                errors.Add("Location can not be null");
                return errors.ToString();
            }

            if (String.IsNullOrWhiteSpace(location.Name))
            {
                errors.Add("Name must be specified");
            }

            if (location.Latitude > 90 || location.Latitude < -90)
            {
                errors.Add("Latitude must be a degree in the range from -90 to 90");
            }

            if (location.Longitude > 180 || location.Longitude < -180)
            {
                errors.Add("Longitude must be a degree in the range from -180 to 180");
            }

            var errorMessage = new System.Text.StringBuilder();
            for (int i=0; i < errors.Count; i++)
            {
                if (i == 0)
                    errorMessage.Append(errors[i]);
                else
                    errorMessage.AppendFormat($", {errors[i]}");
            }

            return errorMessage.ToString();
        }
    }
}
