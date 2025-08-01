using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activityforupdate = await context.Activities.FindAsync([request.Activity.Id], cancellationToken);

            if (activityforupdate == null) throw new Exception("Actvity not found.");

            mapper.Map(request.Activity, activityforupdate);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
