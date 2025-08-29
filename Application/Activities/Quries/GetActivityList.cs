using System;
using Application.Activities.DTO;
using Application.Interfaces;
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

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, List<GetActivityDetailsDto>>
    {
        public async Task<List<GetActivityDetailsDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var currentUserId = userAccessor.GetUserId();

            return await context.Activities
            .ProjectTo<GetActivityDetailsDto>(mapper.ConfigurationProvider, new { currentUserId })
            .AsNoTracking().ToListAsync(cancellationToken);
        }
    }

}
