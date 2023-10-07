using JwtWork.Abstraction.Tools;
using JwtWork.Hubs;
using k8s;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;
using System;
using System.IO;
using System.Threading.Tasks;
using static JwtWork.Abstraction.Interfaces;

namespace GhostUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StreamController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IHubContext<UsersHub> _usersHub;
        private readonly IFileService _fileService;
        public StreamController(ILogger<StreamController> logger, IFileService fileservice, IHubContext<UsersHub> usersHub)
        {
            _logger = logger;
            _fileService = fileservice;
            _usersHub = usersHub;
            _logger.LogInformation("Files Controller being invoked.");
        }
        [HttpGet]
        [Route("Download/{type}/{filename}")]
        public async Task Get(string type, string filename)
        {
            var filepath = await _fileService.DownloadFilesAsync(Response.Body, type, filename);

            var provider = new FileExtensionContentTypeProvider();
            var filecontenttype = string.Empty;
            if (provider.TryGetContentType(filepath, out filecontenttype))
            {
                filecontenttype = "application/octet-stream";

            }

            var isinline = SubStringExtensions.CanInline(filename);

            System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
            {
                FileName = filename,
                Inline = isinline  // false = prompt the user for downloading;  true = browser to try to show the file inline
            };
            Response.Headers.Add("Content-Disposition", cd.ToString());
            Response.Headers.Add("X-Content-Type-Options", "nosniff");


            Response.Headers.ContentType = filecontenttype;

            return;


        }
    }
}
