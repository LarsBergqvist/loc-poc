using LocPoc.Contracts;

namespace LocPoc.Api.DTOs
{
    public static class ExtensionMethods
    {
        public static Location ToLocation(this LocationDto dto)
        {
            return new Location()
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
                Longitude = dto.Longitude,
                Latitude = dto.Latitude
            };
        }

        public static LocationDto ToLocationDto(this Location location)
        {
            return new LocationDto()
            {
                Id = location.Id,
                Name = location.Name,
                Description = location.Description,
                Longitude = location.Longitude,
                Latitude = location.Latitude
            };
        }
    }
}
