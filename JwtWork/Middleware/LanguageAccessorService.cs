using JwtWork.Abstraction;
using Microsoft.AspNetCore.Http;
using System;
using static JwtWork.Abstraction.Interfaces;

namespace JwtWork.Middleware
{

    public class LanguageAccessorService : ILanguageService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public LanguageAccessorService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            var lang = _httpContextAccessor.HttpContext?.Request.Headers["Accept-Language"].ToString();
            LanguageId = string.IsNullOrEmpty(lang) ? "en-US" : lang;
        }
        public string LanguageId { get; }
    }
}
