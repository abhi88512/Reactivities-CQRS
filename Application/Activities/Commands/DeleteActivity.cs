using System;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activitytoDelete = await context.Activities.FindAsync([request.Id], cancellationToken);

            if (activitytoDelete == null) throw new Exception("Actvity not found.");

            context.Remove(activitytoDelete);

            await context.SaveChangesAsync(cancellationToken);

        }
    }

}
