using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler (AppDbContext context, IUserAccessor userAccessor, IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();

            var photo = user.Photos.FirstOrDefault(p => p.Id == request.PhotoId);

            if (photo == null) return Result<Unit>.Failure("Can not find the photo with id", 400);

            if (photo.Url == user.ImageUrl) return Result<Unit>.Failure("Can not delete the main photo", 400);

            var deleteResult = await photoService.DeletePhoto(photo.PublicId);

            if (deleteResult.Error != null) return Result<Unit>.Failure(deleteResult.Error.Message, 500);

            user.Photos.Remove(photo);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Can not delete the photo", 500);
        }
    }
}
