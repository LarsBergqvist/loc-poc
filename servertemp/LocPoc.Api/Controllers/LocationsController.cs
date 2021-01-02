using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LocPoc.Contracts;
using LocPoc.Api.DTOs;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace LocPoc.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        ILocationsRepositoryAsync _locationsRepository;
        public LocationsController(ILocationsRepositoryAsync locationsRepository)
        {
            _locationsRepository = locationsRepository ?? throw new ArgumentNullException(nameof(locationsRepository));
        }

        /// <summary>
        /// Gets all location items
        /// </summary>
        /// <returns>A collection of location items</returns>
        /// <response code="200">Returns all location items</response>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DTOs.Location>>> Get()
        {
            var locations = await _locationsRepository.GetAllAsync();
            var locationDTOs = locations.Select(loc => loc.ToLocationDto());
            return Ok(locationDTOs);
        }

        /// <summary>
        /// Gets a location item by id
        /// </summary>
        /// <returns>A location item</returns>
        /// <response code="200">Returns the requested location item</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<DTOs.Location>> Get(string id)
        {
            var existingLoc = await _locationsRepository.GetAsync(id);
            if (existingLoc == null)
                return NotFound();

            return existingLoc.ToLocationDto();
        }

        /// <summary>
        /// Creates a new location item
        /// </summary>
        /// <returns>The created location item</returns>
        /// <response code="200">Returns the created location item</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        public async Task<ActionResult<DTOs.Location>> Create([FromBody] DTOs.Location locationDto)
        {
            var location = locationDto.ToLocation();

            var createdLoc = await _locationsRepository.CreateAsync(location);

            return Created("location", createdLoc.ToLocationDto());
        }

        /// <summary>
        /// Updates an existing location item
        /// </summary>
        /// <returns>The updated location item</returns>
        /// <response code="200">Returns the updated location item</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPut("{id}")]
        public async Task<ActionResult<DTOs.Location>> Update(string id, [FromBody] DTOs.Location locationDto)
        {
            locationDto.Id = id;
            var location = locationDto.ToLocation();

            var existingLoc = await _locationsRepository.GetAsync(location.Id);
            if (existingLoc == null)
                return NotFound();

            var updatedLoc =  await _locationsRepository.UpdateAsync(location);

            return Ok(updatedLoc.ToLocationDto());
        }

        /// <summary>
        /// Deletes a location item
        /// </summary>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existingLoc = await _locationsRepository.GetAsync(id);
            if (existingLoc == null)
                return NotFound();

            await _locationsRepository.DeleteAsync(id);

            return NoContent();
        }
    }
}
