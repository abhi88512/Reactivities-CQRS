using System;
using Application.Activities.DTO;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activityforupdate = await context.Activities.FindAsync([request.ActivityDto.Id], cancellationToken);

            if (activityforupdate == null) return Result<Unit>.Failure("Activity Not Found", 404);

            mapper.Map(request.ActivityDto, activityforupdate);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failure to Update Activity", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
