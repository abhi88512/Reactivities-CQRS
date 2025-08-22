using System;
using System.Security.Claims;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        var user = await dbContext.Users.FindAsync(GetUserId()) ?? throw new UnauthorizedAccessException("No user is logged in");

        return user;
    }

    public string GetUserId()
    {
        var userID = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("No user found");

        return userID;
    }

    public async Task<User> GetUserWithPhotosAsync()
    {
        var userId = GetUserId();

        return await dbContext.Users
            .Include(x => x.Photos)
            .FirstOrDefaultAsync(x => x.Id == userId)
                ?? throw new UnauthorizedAccessException("No user is logged in");
    }
}

