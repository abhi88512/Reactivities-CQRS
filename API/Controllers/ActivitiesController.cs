using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]

    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();
    }

    [HttpGet("{id}")]

    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        var result = await context.Activities.FindAsync(id);

        if (result == null) return NotFound();

        return Ok(result);

    }

}
