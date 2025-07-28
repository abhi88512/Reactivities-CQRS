# Section 1: Clean Architecture

## Overview

### Definition
Clean Architecture is a way to organize software applications so that the most important parts (like business rules) are protected from changes in tools or interfaces. It was created by Robert C. Martin (also known as "Uncle Bob") in 2012. Think of it like an onion with layers: the center holds the core ideas, and outer layers handle details like databases or user interfaces.

### Purpose
This architecture helps build apps that are easy to maintain, test, and change over time. It ensures that the "heart" of your app (business logic) doesn't depend on external things like specific databases or web frameworks, making your code more flexible.

### Key Idea
Dependencies (how parts of the code rely on each other) always point inward toward the center, keeping the core business rules isolated and unaware of outer details.

> **Analogy**: Imagine a castle—the king (business rules) is in the center, protected by walls (layers). Guards (outer layers) handle visitors (databases or UIs), but the king doesn't need to know about them.

## Learning Goals
- Understand the layers of Clean Architecture and how they map to a .NET and React app.
- Learn why separating concerns (like business logic from UI) makes apps more robust.
- Recognize how this setup supports CRUD operations (Create, Read, Update, Delete) in a simple app.

## Layers of Clean Architecture

### Entities (Center Layer)
- This is the "domain" layer in your .NET project.
- Contains basic business objects, like an "Activity" class in the example app.
- Focuses on core data and rules shared across the app (or even an entire company).
- Beginner note: These are like the building blocks of your app's world—simple objects without fancy tech.

### Use Cases (Next Layer Out)
- Maps to the "application" project in .NET.
- Holds all the business logic, like getting a list of activities or editing one.
- Each action (use case) gets its own class and handler.
- Isolated from the UI—doesn't care if it's React, console, or something else.
- In the example: Add classes for create, edit, and delete activities to handle CRUD.

### Interface Adapters
- Acts as a bridge between business logic and tech-specific code.
- In this app: Your API controllers in .NET.
- They fetch data from the application layer and send it back to the client.

### Frameworks and Drivers (Outer Layer)
- Includes the UI (like React) and database.
- The inner layers don't know about these—swap React for Angular without changing core code.
- Beginner note: This layer is like the "skin" of the app; it can change without affecting the "brain" inside.

## Clean Architecture Recommendations

### Independent from Frameworks
- The architecture works with any tech, like .NET, but the principles are universal.

### Testable
- Business logic can be tested alone, without needing a database or UI.

### Independent from UI
- Change from React to a console app without rewriting core logic.

### Independent from Database
- Core doesn't know the database type, but you might still use tools like Entity Framework (ORM) for queries.
- These are guidelines—bend them based on your tools.

## Tips for Beginners
- Start small: Focus on one layer at a time when building your app.
- Avoid mixing layers: Don't put database code in your business logic to keep things clean.
- Practice by sketching the "onion" diagram for your own simple app.

# Section 2: Flow of Control and Mediator Pattern

## Overview

### Definition
Flow of Control describes how data moves through the layers: from the API (outer) to the business logic (inner) and back. The Mediator pattern is a tool that handles this by routing requests to the right handlers.

### Purpose
It ensures smooth communication between layers without tight coupling—your API sends a request, Mediator routes it, and gets a response back.

### Key Idea
API controllers receive requests, use Mediator to process them in the application layer, and return results—keeping everything organized.

> **Analogy**: Mediator is like a receptionist in an office: You (API) ask for something, they forward it to the right person (handler), and bring back the answer.

## Learning Goals
- See how Mediator fits into Clean Architecture for handling use cases.
- Understand the difference between sending queries (get data) and commands (change data).

## How Mediator Works
- API controller gets an HTTP request from the client (e.g., React app).
- Controller uses Mediator's "Send" method to pass a query or command to a handler in the application layer.
- Handler processes the logic (e.g., fetch an activity).
- Returns the result back to the controller, which sends an HTTP response.
- Beginner note: Think of it as a messenger service—no direct talking between layers.

## Tips for Beginners
- Don't overthink: Mediator simplifies code by avoiding direct calls between classes.
- When coding: Look for "Mediator.Send()" in your .NET controllers— that's the key spot.
- Common pitfall: Forgetting to register handlers; always check your setup.

# Section 3: CQRS (Command Query Responsibility Segregation)

## Overview

### Definition
CQRS is a pattern that separates "commands" (actions that change things) from "queries" (requests for information). It's about splitting how you handle updates versus reads.

### Purpose
It makes apps more scalable and organized, especially for larger systems. Even in simple apps, it clarifies code by treating changes and reads differently.

### Key Idea
Commands change state but don't return data; queries return data but don't change anything—splitting one flow into two.

> **Analogy**: Commands are like writing a letter (you send it and change something, no reply needed). Queries are like asking a question (you get an answer, but nothing changes).

## Learning Goals
- Differentiate commands and queries in CRUD operations.
- Appreciate scalability benefits, even if not using them fully in a basic app.

## Commands vs. Queries

### Commands
- Do something: Modify the app's state (e.g., create, edit, or delete an activity).
- No return value—just confirm it happened.
- In the app: Use for updating the database.

### Queries
- Answer a question: Get data without changes (e.g., list activities or get details of one).
- Always return a value.
- In the app: Use for reading from the database.

## Scalability Scenarios

### Single Database (Like This App)
- Both commands and queries use the same database (via Entity Framework).
- Performance is standard—no big gains, but follows good principles.

### Separate Databases (Advanced)
- Write database: Normalized (structured tables) for commands.
- Read database: Denormalized (flatter data) or NoSQL (like MongoDB) for fast queries.
- Use "eventual consistency" to sync data between them.
- Benefit: Faster reads, easier scaling for big apps.

## Key Commands Recap
- No specific CLI commands here, but in .NET: Use Mediator.Send() for commands like "CreateActivity".

## Tips for Beginners
- Start simple: In your code, name classes clearly—like "CreateActivityCommand" vs. "GetActivitiesQuery".
- Avoid mixing: Never let a query change data—that breaks the pattern.
- Think future-proof: Even with one DB now, this setup makes it easy to split later for growth.

# Section 1: Introducing the Mediator Pattern in the Application Layer

## Overview

### Definition
The Mediator pattern is a design tool that acts as a "middleman" between different parts of your app, allowing them to communicate without directly depending on each other. In this .NET app, it helps the API layer send requests to the application layer (where business logic lives) and get responses back, even though the application layer doesn't directly reference the API.

### Purpose
Mediator keeps your code organized and decoupled—meaning changes in one layer (like the API) won't break the other. It's key for following Clean Architecture by handling use cases (like fetching data) in a structured way.

### Key Idea
The API sends a request via Mediator, which routes it to a handler in the application layer; the handler processes the logic and returns the result.

> **Analogy**: Think of Mediator as a translator at a meeting—Person A (API) speaks to the translator, who passes the message to Person B (application layer) and brings back the reply. No direct talking needed!

## Learning Goals
- Understand how Mediator solves one-way dependency issues between layers.
- Learn to install and configure the MediatR package in a .NET project.
- See why thin controllers (with minimal logic) make apps easier to maintain.

## Installing MediatR

- Open your terminal in Visual Studio (or use NuGet Package Manager Console).
- Search for and install the "MediatR" package (version 12.4.1 in the transcript) into the **application** project.
  - Command: `dotnet add package MediatR`
- This package handles requests and responses; your API project can access it because it depends on the application project.

## Configuring MediatR in Program.cs

- In your `Program.cs` file, add MediatR as a service:
  ```csharp
  builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());
  ```
- This tells MediatR where to find your handlers (classes that process requests). Use one handler's type to register all in the assembly.

## Tips for Beginners
- If your API restarts often: Hot reload in .NET isn't perfect—always check the terminal and restart manually if things don't work.
- Ignore annoying files: Add SQLite temp files to `.gitignore` to avoid clutter in commits.
- Common pitfall: Forgetting to restart the API after changes—test in Postman to confirm.

# Section 2: Creating Query Handlers for Reading Data

## Overview

### Definition
Query handlers are classes in the application layer that process "read" requests (queries) using MediatR. They fetch data from the database without changing it, following CQRS principles.

### Purpose
Handlers encapsulate business logic for use cases like listing activities or getting details, keeping it separate from the API.

### Key Idea
Each handler has a `Query` class (for input parameters) and a `Handler` class (for processing and returning data).

> **Analogy**: A handler is like a librarian—you ask (query) for a book by title (parameters), and they fetch it without altering the library.

## Learning Goals
- Build handlers for listing and detailing activities.
- Use Entity Framework to query the database asynchronously.
- Handle parameters like IDs in queries.

## Folder Structure for Features
- In the **application** project:
  - Create a folder for each feature (e.g., `Activities`).
  - Inside, add subfolders like `Queries` for read operations.
- Example: Delete unused files like `Class1.cs` to keep it clean.

## Handler for Listing Activities (GetActivityList.cs)

- Create a new class file in `Activities/Queries`.
```csharp
using MediatR;
using Domain; // For Activity class
using Persistence; // For AppDbContext

namespace Application.Activities.Queries
{
    public class GetActivityList
    {
        public class Query : IRequest<List<Activity>> { } // No parameters needed

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}
```
- `Query`: Defines what the request returns (list of activities).
- `Handler`: Injects the database context, fetches data asynchronously, and passes the cancellation token (for handling request cancellations).

## Handler for Activity Details (GetActivityDetails.cs)

- Similar structure, but with an ID parameter.
```csharp
using MediatR;
using Domain;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        public class Query : IRequest<Activity>
        {
            public required string Id { get; set; } // Required ID parameter
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync([request.Id], cancellationToken);
                if (activity == null)
                {
                    throw new Exception("Activity not found"); // Temporary; improve later
                }
                return activity;
            }
        }
    }
}
```
- Note: Use `FindAsync` with array for keys; check for null and throw an exception (can't return HTTP responses here).

## Key Commands Recap
- Install package: `dotnet add package MediatR`
- Restart API: In terminal, confirm and restart if hot reload fails.

## Tips for Beginners
- Cancellation tokens: They allow graceful stops (e.g., if a user cancels a request)—pass them to async methods but don't worry deeply yet.
- Null handling: In handlers, throw exceptions for now; later sections cover better error strategies since handlers aren't API-aware.
- Test early: Use Postman to verify—send GET requests and update IDs to match real data.

# Section 3: Using Mediator in API Controllers

## Overview

### Definition
API controllers receive HTTP requests and use Mediator to delegate logic to handlers, keeping controllers "thin" (minimal code).

### Purpose
This shifts logic to the application layer, making controllers simple routers for requests and responses.

### Key Idea
Controllers send queries via `Mediator.Send(new Query())` and return the result directly.

> **Analogy**: Controllers are like waiters—they take your order (request), pass it to the kitchen (Mediator/handler), and bring back the food (response).

## Learning Goals
- Replace direct database queries in controllers with Mediator calls.
- Clean up controllers by removing unnecessary injections.

## Updating ActivitiesController.cs

- Inject Mediator (temporarily) and replace old code:
```csharp
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Activities.Queries;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(string id)
        {
            return await Mediator.Send(new GetActivityDetails.Query { Id = id });
        }
    }
}
```
- Remove `AppDbContext` injection once handlers are in place—controllers no longer query the DB directly.

## Tips for Beginners
- Thin controllers: Aim for no business logic here—just forwarding requests.
- Troubleshooting: If Postman returns errors, check IDs and restart the API.

# Section 4: Thinning Controllers with BaseApiController

## Overview

### Definition
Use a base controller to centralize shared services like Mediator, avoiding repeated injections in child controllers.

### Purpose
Makes code DRY (Don't Repeat Yourself) and ensures essential services are always available.

### Key Idea
Protect a Mediator property in the base class, lazy-load it from HTTP context, and throw if unavailable.

> **Analogy**: Base controller is like a family toolbox—kids (child controllers) inherit access without buying their own tools.

## Learning Goals
- Create protected properties for shared services.
- Handle null checks to prevent runtime errors.

## Updating BaseApiController.cs

```csharp
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new InvalidOperationException("IMediator service is unavailable");
    }
}
```
- Private backing field (`_mediator`) with null-coalescing assignment.
- Protected property for access in derived classes.

## Using in ActivitiesController

- Remove Mediator injection; use `Mediator` from base.
- Test in Postman to confirm functionality.

## Tips for Beginners
- Protected vs. private: Protected allows child classes to use it; private hides it.
- Common pitfall: Trust but verify—hot reload often fails, so restart and test.
- Next: This sets up for CRUD operations like creating activities using commands.

