using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LocPoc.Contracts;
using LocPoc.Api.DTOs;
using System.Linq;

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

        /// <summary>
        /// Get all location items
        /// </summary>
        /// <returns>A collection of location items</returns>
        [HttpGet]
        public IEnumerable<DTOs.Location> Get()
        {
            return _locationsRepository.GetAll().Select(loc => loc.ToLocationDto());
        }

        /// <summary>
        /// Get a location item by id
        /// </summary>
        /// <returns>A location item</returns>
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(string id)
        {
            var existingLoc = _locationsRepository.Get(id);
            if (existingLoc == null)
                return BadRequest($"Location with id '{id}' does not exist.");

            return new OkObjectResult(_locationsRepository.Get(id).ToLocationDto());
        }

        // POST: api/Locations
        [HttpPost]
        public IActionResult Post([FromBody] DTOs.Location locationDto)
        {
            var location = locationDto.ToLocation();
            var errorMessage = GetValidationErrorMessage(location);
            if (errorMessage.Length > 0)
                return BadRequest(errorMessage);

            var createdLoc = _locationsRepository.Add(location);

            return Created("location", createdLoc);
        }

        // PUT: api/Locations/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] DTOs.Location locationDto)
        {
            locationDto.Id = id;
            var location = locationDto.ToLocation();
            var errorMessage = GetValidationErrorMessage(location);
            if (errorMessage.Length > 0)
                return BadRequest(errorMessage);

            var existingLoc = _locationsRepository.Get(location.Id);
            if (existingLoc == null)
                return BadRequest($"Location with id '{location.Id}' does not exist.");

            var updatedLoc =  _locationsRepository.Update(location);

            var updatedDto = updatedLoc.ToLocationDto();

            return new OkObjectResult(locationDto);
        }

        // DELETE: api/Locations/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var existingLoc = _locationsRepository.Get(id);
            if (existingLoc == null)
                return BadRequest($"Location with id '{id}' does not exist.");

            _locationsRepository.Delete(id);

            return NoContent();
        }

        private string GetValidationErrorMessage(Contracts.Location location)
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
