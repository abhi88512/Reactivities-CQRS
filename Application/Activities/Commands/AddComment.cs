using System;
using Application.Activities.DTO;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class AddComment
{
    public class Command : IRequest<Result<CommentDto>>
    {
        public required string ActivityId { get; set; }
        public required string Body { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Command, Result<CommentDto>>
    {
        public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .Include(a => a.Comments)
                .ThenInclude(c => c.User)
                .FirstOrDefaultAsync(a => a.Id == request.ActivityId, cancellationToken);

            if (activity == null) return Result<CommentDto>.Failure("Could not find activity", 404);

            var user = await userAccessor.GetUserAsync();

            if (user == null) return Result<CommentDto>.Failure("Could not find user", 404);

            var comment = new Domain.Comment
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                Body = request.Body,
            };

            activity.Comments.Add(comment);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;


        return result
                ? Result<CommentDto>.Success(mapper.Map<CommentDto>(comment))
                : Result<CommentDto>.Failure("Failed to add comment", 400);


        }
    }

}
