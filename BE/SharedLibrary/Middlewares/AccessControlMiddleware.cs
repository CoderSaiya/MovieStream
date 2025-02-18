﻿using Microsoft.AspNetCore.Http;

namespace SharedLibrary.Middlewares;

public class AccessControlMiddleware
{
    private readonly RequestDelegate _next;
    public AccessControlMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value.ToLower();
        var isPrivate = path.Contains("/private/");
        if (isPrivate)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault();
            if (string.IsNullOrEmpty(token))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized: Token is required for private endpoints");
                return;
            }
        }
        await _next(context);
    }
}