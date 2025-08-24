using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditProfileDto ProfileDto { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            if (user == null) return Result<Unit>.Failure("User Not Found", 404);

            user.DisplayName = request.ProfileDto.DisplayName ?? user.DisplayName;
            user.Bio = request.ProfileDto.Bio ?? user.Bio;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failure to Update Profile", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
