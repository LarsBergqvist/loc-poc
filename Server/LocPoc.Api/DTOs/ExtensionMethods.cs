namespace LocPoc.Api.DTOs
{
    public static class ExtensionMethods
    {
        public static LocPoc.Contracts.Location ToLocation(this DTOs.Location  dto)
        {
            return new LocPoc.Contracts.Location()
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
                Longitude = dto.Longitude,
                Latitude = dto.Latitude
            };
        }

        public static DTOs.Location ToLocationDto(this LocPoc.Contracts.Location location)
        {
            return new DTOs.Location()
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
