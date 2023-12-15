using JwtWork.Abstraction.Models;

namespace JwtWork.Abstraction
{
    public class Interfaces
    {
        public interface IRtAuthUser
        {
            string Status { get; }
            string Token { get; }
            string RefreshToken { get; }
            string UserName { get; }

            string Error { get; }
        }
        public interface IItCredentials
        {
            string? UserName { get; set; }
            string? Password { get; set; }
            bool RememberMe { get; set; }
        }

        public interface IRtWeatherForecast
        {
            int Id { get; }
            int TemperatureF { get; }
            int TemperatureC { get; set; }
            string? DateFormatted { get; set; }
            string? Summary { get; set; }
        }

        public interface IBelongtoTable
        {
            string tablename { get; set; }
        }
        public interface IFileService
        {
            string GenerateWordWithData(string xmldata, string templatename, string type = null);
            Task<string> DownloadFilesAsync(Stream fileStream, string type, string filename,bool inupload=false);
            Task<FileUploadSummary> UploadFileAsync(Stream fileStream, string contentType, string type);
        }
        public interface ILanguageService
        {
            public string LanguageId { get; }
        }

        public interface ILoginError
        {
            public string Error { get; }
            public bool NeedNew { get; }
        }

        public interface IUser
        {
            public string UserName { get; }
            public string Email { get; }
            public string UserId { get; }

        }

        public interface IJwtManager
        {
            Task<bool> HasUser();
            Task<IUser?> GetUser(string username);
            Task<ILoginError?> Authenticate(string username, string password, string? newpassword = null);
            Task<string> Register(string username, string password);
        }
    }


}