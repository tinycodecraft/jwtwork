﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace GhostUI.Services
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
    public class MultipartFormDataAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var request = context.HttpContext.Request;

            if (request.HasFormContentType
                && request.ContentType.StartsWith("multipart/form-data", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            context.Result = new StatusCodeResult(StatusCodes.Status415UnsupportedMediaType);
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class DisableFormValueModelBindingAttribute : Attribute, IResourceFilter
    {
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            var factories = context.ValueProviderFactories;
            factories.RemoveType<FormValueProviderFactory>();
            factories.RemoveType<FormFileValueProviderFactory>();
            factories.RemoveType<JQueryFormValueProviderFactory>();
        }

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
        }
    }
}
