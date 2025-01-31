using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using SharedLibrary.Security;

namespace SharedLibrary.Middlewares;

public class CheckRoleMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var path = context.Request.Path.Value.ToLower();
        if (path.Contains("/public/"))
        {
            await next(context);
            return;
        }
        
        var role = GetUserRole(context.User);
        var method = context.Request.Method.ToUpper();
        if (role == null || !IsAuthorized(role.Value, method, path))
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync("Forbidden: You do not have access to this resource.");
            return;
        }
        
        await next(context);
    }
    
    private Role? GetUserRole(ClaimsPrincipal user)
    {
        if (!user.Identity?.IsAuthenticated ?? true)
            return null;
        
        var roleClaim = user.FindFirst(ClaimTypes.Role)?.Value;
        return Enum.TryParse(roleClaim, out Role role) ? role : null;
    }
    
    private bool IsAuthorized(Role role, string method, string? path)
    {
        if (string.IsNullOrEmpty(path)) return false;

        if (Endpoint.AllowedEndpoints.TryGetValue(role, out var endpoints))
        {
            if (endpoints.TryGetValue("*", out var patterns) && patterns.Any(pattern => IsMatch(pattern, path)))
                return true;

            if (endpoints.TryGetValue(method, out patterns) && patterns.Any(pattern => IsMatch(pattern, path)))
                return true;
        }
        
        return false;
    }
    
    private static bool IsMatch(string pattern, string path)
    {
        var parts = pattern.Split('/');
        var pathParts = path.Split('/');

        if (parts.Length > pathParts.Length) return false;

        for (int i = 0; i < parts.Length; i++)
        {
            if (parts[i] == "**") return true;
            if (!string.Equals(parts[i], pathParts[i], StringComparison.OrdinalIgnoreCase)) return false;
        }

        return parts.Length == pathParts.Length;
    }
}