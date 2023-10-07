using JwtWork.Abstraction.Models;

namespace JwtWork.Abstraction
{
    public class Interfaces
    {
        public interface IFileService
        {
            Task<string> DownloadFilesAsync(Stream fileStream, string type, string filename);
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