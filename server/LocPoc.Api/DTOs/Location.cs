using System.ComponentModel.DataAnnotations;

namespace LocPoc.Api.DTOs
{
    public class Location
    {
        /// <summary>
        /// Internal Id of location item
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// Name of the location
        /// </summary>
        [Required]
        public string Name { get; set; }
        /// <summary>
        /// An optional description of the location
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// The latitude (vertical) position of the location
        /// </summary>
        [Required]
        [Range(-90, 90)]
        public double Latitude { get; set; }
        /// <summary>
        /// The longitude (horizontal) position of the location
        /// </summary>
        [Required]
        [Range(-180, 180)]
        public double Longitude { get; set; }
    }
}
