using System;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public required string UserId { get; set; }
        public string? Filter { get; set; }
    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.ActivityAttendees
                .Where(aa => aa.UserId == request.UserId)
                .OrderBy(aa => aa.Activity.Date)
                .Select(aa => aa.Activity)
                .AsQueryable();

            var today = DateTime.UtcNow;

            if (request.Filter != null)
            {
                query = request.Filter.ToLower() switch
                {
                    "past" => query.Where(a => a.Date <= today
                                        && a.Attendees.Any(x => x.UserId == request.UserId)),
                    "hosting" => query.Where(a => a.Attendees.Any(x => x.IsHost && x.UserId == request.UserId)),
                    _ => query.Where(a => a.Date >= today
                        && a.Attendees.Any(x => x.UserId == request.UserId))
                };
            }

            var projectedActivities = query.ProjectTo<UserActivityDto>(mapper.ConfigurationProvider);

            var activities = await projectedActivities.ToListAsync(cancellationToken: cancellationToken);

            return Result<List<UserActivityDto>>.Success(activities);
        }
    }
}

