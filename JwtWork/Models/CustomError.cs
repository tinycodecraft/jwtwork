using System.Text.Json.Serialization;

namespace JwtWork.Models
{


    public class CustomError {
        /// <summary>
        /// The error code
        /// </summary>
        [JsonPropertyName("code")]
        public string Code { get; set; } = string.Empty;

        /// <summary>
        /// A message from and to the Developer
        /// </summary>
        [JsonPropertyName("message")]
        public string Message { get; set; } = string.Empty;
    }
}
