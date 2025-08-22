using System;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfilePhotos
{
    public class Query : IRequest<Result<List<Photo>>>
    {
        public required string UserId { get; set; }

    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Photo>>>
    {
        public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var photos = await context.Users
            .Where(X => X.Id == request.UserId)
            .SelectMany(X => X.Photos)
            .ToListAsync();

            return Result<List<Photo>>.Success(photos);

        }
    }



}
