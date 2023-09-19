using JwtWork.Resources;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JwtWork.Models
{
    public class WeatherForecast : IWeatherForecast //, IValidatableObject
    {
        public int     TemperatureC  { get; set; }
        public string? DateFormatted { get; set; }
        //[Display(ResourceType = typeof(DisplayNameResource), Name = "SummaryOfWeather")]
        //[Required(ErrorMessageResourceType = typeof(ErrorMessageResource), ErrorMessageResourceName = "RequiredError")]
        //[StringLength(250, MinimumLength = 3, ErrorMessageResourceType = typeof(ErrorMessageResource), ErrorMessageResourceName = "StringLengthError")]
        public string? Summary       { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public int Id => Convert.ToInt32(DateFormatted?.Replace("/", ""));

        //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        //{
        //    if(TemperatureC< -273)
        //        yield return new ValidationResult(string.Format(
        //            ErrorMessageResource.PhysicsViolationError, DisplayNameResource.Email));

        //}
    }
}
