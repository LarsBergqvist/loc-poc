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
        /// Name
        /// </summary>
        public string Name { get; set; }
        public string Description { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
    }
}
