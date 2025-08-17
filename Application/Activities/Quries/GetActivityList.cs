using System;
using Application.Activities.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Quries;

public class GetActivityList
{
    public class Query : IRequest<List<GetActivityDetailsDto>> { }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<GetActivityDetailsDto>>
    {
        public async Task<List<GetActivityDetailsDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities
            .ProjectTo<GetActivityDetailsDto>(mapper.ConfigurationProvider)
            .AsNoTracking().ToListAsync(cancellationToken);
        }
    }

}
