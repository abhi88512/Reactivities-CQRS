
using Application.Activities.DTO;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Quries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<GetActivityDetailsDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<GetActivityDetailsDto>>
    {
        public async Task<Result<GetActivityDetailsDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
            .ProjectTo<GetActivityDetailsDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (activity == null) return Result<GetActivityDetailsDto>.Failure("Activity Not Found", 404);

            return Result<GetActivityDetailsDto>.Success(activity);
        }
    }

}
