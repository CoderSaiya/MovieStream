using Microsoft.AspNetCore.Http;

namespace SharedLibrary.Middlewares;

public class AccessControlMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var path = context.Request.Path.Value.ToLower();
        var isPublic = path.Contains("/public/");
        if (!isPublic)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault();
            if (string.IsNullOrEmpty(token))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized: Token is required for private endpoints");
                return;
            }
        }
        await next(context);
    }
}