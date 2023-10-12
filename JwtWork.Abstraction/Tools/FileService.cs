using JwtWork.Abstraction.Models;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using static JwtWork.Abstraction.Interfaces;

namespace JwtWork.Abstraction.Tools
{
    public class FileService : IFileService
    {
        //private const string UploadsSubDirectory = "FilesUploaded";

        private readonly IEnumerable<string> allowedExtensions = new List<string> { ".zip", ".bin", ".png", ".jpg", ".mp4" };

        private readonly ILogger _logger;
        private readonly IOptions<PathSetting> _pathsetting;

        public FileService(IOptions<PathSetting> pathsetting, ILogger<FileService> logger)
        {
            _pathsetting = pathsetting;
            _logger = logger;
        }
        public async Task<string> DownloadFilesAsync(Stream fileStream, string type, string filename,bool inupload=false)
        {
            var file = string.Empty;
            try
            {
                file = SubStringExtensions.GetPath(_pathsetting.Value, inupload ? PathType.Upload: PathType.Share, type, filename);
                if (File.Exists(file))
                {
                    var bytes = await File.ReadAllBytesAsync(file);
                    await new MemoryStream(bytes).CopyToAsync(fileStream);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return "";
            }

            return file;

        }


        public async Task<FileUploadSummary> UploadFileAsync(Stream fileStream, string contentType, string type)
        {
            var fileCount = 0;
            long totalSizeInBytes = 0;

            var boundary = GetBoundary(MediaTypeHeaderValue.Parse(contentType));
            var multipartReader = new MultipartReader(boundary, fileStream);
            var section = await multipartReader.ReadNextSectionAsync();

            var filePaths = new List<string>();
            var fileDescs = new List<string>();
            while (section != null)
            {
                var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out ContentDispositionHeaderValue contentDisposition);

                var fileSection = section.AsFileSection();
                if (fileSection != null && hasContentDispositionHeader && HasFileContentDisposition(contentDisposition) && fileSection != null)
                {
                    totalSizeInBytes += await SaveFileAsync(fileSection, filePaths, fileDescs, type);
                    fileCount++;
                }

                section = await multipartReader.ReadNextSectionAsync();
            }

            return new FileUploadSummary
            {
                TotalFilesUploaded = fileCount,
                TotalSizeUploaded = ConvertSizeToString(totalSizeInBytes),
                FilePaths = filePaths.ToArray(),
                FileDescs = fileDescs.ToArray(),

            };
        }

        private async Task<long> SaveFileAsync(FileMultipartSection fileSection, IList<string> filePaths, IList<string> fileDescs, string type)
        {



            var uploadpath = SubStringExtensions.GetPath(_pathsetting.Value, PathType.Upload, type);
            Directory.CreateDirectory(uploadpath);


            var filePath = Path.Combine(uploadpath, fileSection.FileName);

            fileDescs.Add(fileSection.FileName);

            await using var stream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None, 1024);

            await fileSection.FileStream.CopyToAsync(stream);

            var streampath = SubStringExtensions.GetPath(_pathsetting.Value, PathType.Stream, type, fileSection.FileName);

            filePaths.Add(streampath);

            return fileSection.FileStream.Length;
        }

        private bool HasFileContentDisposition(ContentDispositionHeaderValue contentDisposition)
        {
            // Content-Disposition: form-data; name="myfile1"; filename="Misc 002.jpg"
            return contentDisposition != null
                && contentDisposition.DispositionType.Equals("form-data")
                && (!string.IsNullOrEmpty(contentDisposition.FileName.Value)
                    || !string.IsNullOrEmpty(contentDisposition.FileNameStar.Value));
        }



        private string ConvertSizeToString(long bytes)
        {
            var fileSize = new decimal(bytes);
            var kilobyte = new decimal(1024);
            var megabyte = new decimal(1024 * 1024);
            var gigabyte = new decimal(1024 * 1024 * 1024);

            return fileSize switch
            {
                _ when fileSize < kilobyte => "Less then 1KB",
                _ when fileSize < megabyte =>
                    $"{Math.Round(fileSize / kilobyte, fileSize < 10 * kilobyte ? 2 : 1, MidpointRounding.AwayFromZero):##,###.##}KB",
                _ when fileSize < gigabyte =>
                    $"{Math.Round(fileSize / megabyte, fileSize < 10 * megabyte ? 2 : 1, MidpointRounding.AwayFromZero):##,###.##}MB",
                _ when fileSize >= gigabyte =>
                    $"{Math.Round(fileSize / gigabyte, fileSize < 10 * gigabyte ? 2 : 1, MidpointRounding.AwayFromZero):##,###.##}GB",
                _ => "n/a"
            };
        }

        private string GetBoundary(MediaTypeHeaderValue contentType)
        {
            var boundary = HeaderUtilities.RemoveQuotes(contentType.Boundary).Value;

            if (string.IsNullOrWhiteSpace(boundary))
            {
                throw new InvalidDataException("Missing content-type boundary.");
            }

            return boundary;
        }
    }
}
