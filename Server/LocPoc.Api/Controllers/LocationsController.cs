using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LocPoc.Contracts;
using LocPoc.Api.DTOs;
using System.Linq;
using Microsoft.AspNetCore.Http;

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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(string id)
        {
            var existingLoc = _locationsRepository.Get(id);
            if (existingLoc == null)
                return NotFound();

            return new OkObjectResult(_locationsRepository.Get(id).ToLocationDto());
        }

        /// <summary>
        /// Stores a new location item
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        public IActionResult Post([FromBody] DTOs.Location locationDto)
        {
            var location = locationDto.ToLocation();
            var errorMessage = GetValidationErrorMessage(location);
            if (errorMessage.Length > 0)
                return BadRequest(errorMessage);

            var createdLoc = _locationsRepository.Add(location);

            return Created("location", createdLoc.ToLocationDto());
        }

        /// <summary>
        /// Updates an existing location item
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
                return NotFound();

            var updatedLoc =  _locationsRepository.Update(location);

            return new OkObjectResult(updatedLoc.ToLocationDto());
        }

        /// <summary>
        /// Deletes a location item
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var existingLoc = _locationsRepository.Get(id);
            if (existingLoc == null)
                return NotFound();

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
