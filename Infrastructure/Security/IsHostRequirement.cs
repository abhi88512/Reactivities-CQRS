using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsHostRequirement : IAuthorizationRequirement
{

}

public class IsHostRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<IsHostRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
        var userID = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userID == null) return;

        var httpContext = httpContextAccessor.HttpContext;

        if (httpContext?.GetRouteValue("id") is not string activityId) return;

        var attendee = await dbContext.ActivityAttendees
        .AsNoTracking()
        .SingleOrDefaultAsync(x => x.UserId == userID && x.ActivityId == activityId);

        if (attendee == null) return;

        if (attendee.IsHost) context.Succeed(requirement);

    }
}

