# Section 1: Organizing File and Folder Structure in React

## Overview

### Definition
File and folder structure in React refers to how developers arrange their code files (like components, styles, and utilities) within the project directory to make it easier to manage and scale the application.

### Purpose
A well-organized structure helps keep the codebase clean, makes it easier to find and update files, and supports team collaboration, especially as the project grows.

### Key Idea
React doesn't enforce a specific structure, but grouping files by features (e.g., all files for "activities" in one folder) is a common and logical approach for better organization.

> **Analogy**: Think of your React project like a kitchen—grouping ingredients by recipe (features) keeps things tidy, unlike dumping everything into one drawer (flat structure).

## Learning Goals
- Understand why organization matters in React projects.
- Learn common approaches like grouping by features vs. by file type.
- Set up basic folders like `app`, `features`, and `lib` for a clean structure.

## Technical Concept

### Grouping by Features
- Create folders inside `src/` for better organization: `app` for shared app-wide items (e.g., layouts), `features` for feature-specific files (e.g., activities), and `lib` for utilities (e.g., types).
- Move existing files: Drag `App.tsx` and `index.css` (renamed to `styles.css`) into `app/layout/`.
- Clean up: Delete unused files like duplicate CSS or unnecessary assets folders; use the `public/` folder for images and static assets.
- Update imports manually if VS Code doesn't auto-fix them (e.g., change paths in `main.tsx`).

### Example Folder Structure
After organization:
```
src/
  app/
    layout/
      App.tsx
      styles.css
  features/
    // Feature folders go here
  lib/
    // Utilities like types
  // Other root files like main.tsx
```

## Key Commands Recap
- No specific CLI commands here, but use VS Code features like drag-and-drop for files and Quick Fix (Ctrl+.) to update imports.

## Tips for Beginners
- Start simple: Don't over-organize small projects, but build the habit early to avoid mess later.
- Always check if changes break the app—refresh the browser and inspect DevTools (F12 in Chrome) for errors.
- Preference matters: Adapt the structure to your or your team's style; there's no "one right way."

# Section 2: Creating a Navbar Component

## Overview

### Definition
A Navbar (navigation bar) is a React component that provides a consistent header with links and actions, like a menu at the top of a web page.

### Purpose
It helps users navigate the app easily and sets the layout foundation; here, it's built using Material-UI for quick styling.

### Key Idea
React components are just JavaScript functions returning JSX; create them manually or with snippets for efficiency.

> **Analogy**: A Navbar is like the dashboard in a car—always visible, with controls (links) to guide your journey through the app.

## Learning Goals
- Create a basic React functional component.
- Use VS Code snippets (e.g., "rfc") to speed up component creation.
- Import and use Material-UI components like AppBar for a professional look.

## Technical Concept

### Creating the Component
- In `app/layout/`, create `Navbar.tsx`.
- Use the "rfc" snippet or type manually:
  ```tsx
  export default function Navbar() {
    return <div>Navbar</div>;
  }
  ```
- Import into `App.tsx` and replace existing content:
  ```tsx
  import Navbar from './layout/Navbar'; // Adjust path as needed
  // Inside return:
  <Navbar />
  ```
- Add Material-UI elements: Replace `<div>` with copied AppBar code from docs, then fix imports via Quick Fix.

### Handling Imports and Icons
- For icons like MenuIcon: Import from `@mui/icons-material/Menu`.
- Remove unused imports to clear ESLint warnings (red underlines).

## Key Commands Recap
- VS Code Snippet: Type "rfc" and press Tab to generate a component.
- Quick Fix: Hover over errors and select "Add all missing imports."

## Tips for Beginners
- Get used to ESLint warnings—they're helpful for catching unused code; clean them up to keep your code tidy.
- If snippets add unnecessary imports (e.g., `import React from 'react'`), toggle extension settings and reload VS Code.
- Test often: Refresh the browser after changes to ensure nothing breaks.

# Section 3: Styling the Navbar

## Overview

### Definition
Styling a Navbar involves applying CSS properties (via Material-UI's system) to make it visually appealing, like adding gradients, flex layouts, and links.

### Purpose
Good styling improves user experience; here, it creates a gradient background, spreads links evenly, and adds buttons for actions like "Create Activity."

### Key Idea
Use Material-UI's `sx` prop for inline styles and Flexbox for layout—it's like arranging items in a row with equal spacing.

> **Analogy**: Styling is like decorating a room—Flexbox positions furniture (elements) evenly, and gradients add a colorful wallpaper.

## Learning Goals
- Apply Material-UI themes and Flexbox for layout.
- Customize components with colors, gradients, and spacing.
- Make the app non-responsive for simplicity (focus on desktop).

## Technical Concept

### Adding Gradient and Layout
- In `Navbar.tsx`, wrap content in `<Container maxWidth="xl">`.
- Set AppBar background:
  ```tsx
  <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182A73 0%, #218AE4 69%, #20A78C 89%)' }}>
  ```
- Use Flexbox on Toolbar: `sx={{ display: 'flex', justifyContent: 'space-between' }}`.
- Add logo and links with Typography and MenuItem.
- Create "Create Activity" button: `<Button size="large" variant="contained" color="warning">Create Activity</Button>`.

### Adjusting Page Content
- In `App.tsx`, wrap main content in `<Container maxWidth="xl" sx={{ mt: 3 }}>`.
- Add `<CssBaseline />` above Navbar to reset browser defaults.

## Key Commands Recap
- No CLI, but use browser DevTools to inspect styles (e.g., check padding/margins).

## Tips for Beginners
- Flexbox basics: `display: 'flex'` makes a container; `justifyContent: 'space-between'` spaces items evenly—practice on sites like Flexbox Froggy.
- Avoid responsive design here: Focus on desktop; add media queries later if needed.
- Clean code: Remove unused elements (e.g., default icons) to avoid clutter.

# Section 4: Creating an Activity Dashboard Component

## Overview

### Definition
The Activity Dashboard is a component that displays a list of activities, using a grid layout for structure.

### Purpose
It breaks the app into reusable parts, keeping `App.tsx` clean; props pass data (like activities) from parent to child.

### Key Idea
Use props to share data between components; destructure for cleaner code.

> **Analogy**: Dashboard is like a bulletin board—pins (grids) organize notes (activities); props are like handing notes from one board to another.

## Learning Goals
- Break apps into smaller components for manageability.
- Pass and receive props (e.g., activities array).
- Use Material-UI Grid2 for layout.

## Technical Concept

### Creating the Component
- In `features/activities/`, create `ActivityDashboard.tsx`.
- Use "rfc" snippet.
- Add Grid2:
  ```tsx
  import { Grid2 } from '@mui/material/Unstable_Grid2';
  // Inside return:
  <Grid2 container>
    <Grid2 size={9}>
      {/* Activity list here */}
    </Grid2>
  </Grid2>
  ```
- Pass props from `App.tsx`: `<ActivityDashboard activities={activities} />`.

### Handling Props
- Define props type:
  ```tsx
  type Props = {
    activities: Activity[];
  };
  ```
- Destructure: `export default function ActivityDashboard({ activities }: Props) { ... }`.
- Map over activities: `{activities.map(activity => <ListItem key={activity.id}>{activity.title}</ListItem>)}`.

## Key Commands Recap
- Quick Fix: "Add all missing imports" for Grid2 and List components.

## Tips for Beginners
- Props flow down: Parent (App) sends data to child (Dashboard); use destructuring `{ activities }` for readability.
- Keep logic high: State like `useState` stays in App for now, to share across components (e.g., updating list after create).
- Test incrementally: Refresh browser; clean unused imports to silence warnings.

# Section 1: Refactoring Folders and Creating Activity Cards

## Refactoring Folders

### Definition
Refactoring means reorganizing your code structure without changing how it works, to make it cleaner and easier to manage.

### Purpose
In this course, we're creating a folder called "dashboard" inside the "activities" folder to group all dashboard-related files together, like ActivityDashboard.tsx. This helps keep the project organized as it grows.

### Key Idea
Moving files and updating imports ensures your app still runs smoothly while improving folder structure.

> **Analogy**: Think of refactoring folders like tidying up your desk drawers—putting related items in one spot so you can find them faster later.

## Learning Goals
- Understand how to create subfolders in React projects for better organization.
- Learn to handle file moves in VS Code, including automatic import updates.

## Practical Steps
### Moving Files
- Right-click the file (e.g., ActivityDashboard.tsx) and move it to the new "dashboard" folder.
- VS Code may ask to update imports—say yes to avoid errors.
- Double-check imports in related files like App.tsx to ensure paths are correct (e.g., import from './features/activities/dashboard/ActivityDashboard').

## Tips for Beginners
- If imports break after moving files, manually fix them by updating the path—React won't run if paths are wrong.
- Use VS Code's "Reveal in Finder/Explorer" if pasting folders doesn't work directly.

# Section 2: Building the ActivityCard Component

## ActivityCard Component

### Definition
An ActivityCard is a React functional component that displays details of a single activity (like title, date, description) using Material UI's Card component.

### Purpose
Cards provide a visually contained way to show activity info, making the UI more engaging than plain lists. We'll use them to display multiple activities in a dashboard.

### Key Idea
Each card acts as a "container" for one activity's data, styled with rounded corners to match modern Material Design.

> **Quote**: "Material UI's Card is just a container for information we want to present to the user."

## Learning Goals
- Learn to use Material UI components like Card, CardContent, Typography, Chip, and Button.
- Understand passing props (e.g., an "activity" object) to components.
- Practice destructuring props for cleaner code.

## Technical Concept
### Creating the Component
- Use the RFC snippet in VS Code to generate boilerplate for a React Functional Component (RFC).
- Define props type: `type Props = { activity: Activity; }`
- Destructure: `const { activity } = props;`

### Code Snippet
```tsx
import { Card, CardContent, Typography, Chip, Button } from '@mui/material';

type Props = {
  activity: Activity;
};

const ActivityCard = ({ activity }: Props) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography color="text.secondary" mb={1}>{activity.date}</Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
        <Chip label={activity.category} variant="outlined" />
        <Button size="medium" variant="contained">View</Button>
      </CardActions>
    </Card>
  );
};
```

## Tips for Beginners
- Start with simple styling—focus on functionality first, then improve looks later.
- Remember: Typography variants like "h5" are like headings; "body2" is for smaller text. Experiment in Material UI docs.

# Section 3: Creating the ActivityList Component

## ActivityList Component

### Definition
ActivityList is a component that loops over an array of activities and renders an ActivityCard for each one.

### Purpose
It turns a list of activities into a visual column of cards, using flexbox for layout.

### Key Idea
Use `map()` to render multiple components dynamically, and add a unique `key` prop for React to track them efficiently.

> **Analogy**: Mapping over activities is like a conveyor belt—each item (activity) gets its own box (card) as it passes through.

## Learning Goals
- Master array mapping in React to render lists.
- Use Box from Material UI for flexible layouts.
- Pass props down from parent components.

## Technical Concept
### Props and Mapping
- Props: `type Props = { activities: Activity[]; };`
- Use parentheses in map for implicit return: `activities.map((activity) => (<ActivityCard key={activity.id} activity={activity} />))`

### Code Snippet
```tsx
import { Box } from '@mui/material';

type Props = {
  activities: Activity[];
};

const ActivityList = ({ activities }: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </Box>
  );
};
```

## Key Commands Recap
- In VS Code: Use "rfc" snippet to create a React functional component quickly.

## Tips for Beginners
- Always add a `key` prop when mapping—use something unique like an ID to avoid React warnings.
- If your list doesn't show, check if the array is empty or if props are passed correctly.

# Section 4: Updating the Activity Dashboard

## Integrating Components

### Definition
The ActivityDashboard now uses ActivityList instead of a plain list, and adds basic styling to the app background.

### Purpose
This ties together the list and cards, creating a functional dashboard view.

### Key Idea
Replace old list code with `<ActivityList activities={activities} />` to display cards.

> **Analogy**: The dashboard is like a bulletin board—pinning cards (activities) makes info easy to scan.

## Learning Goals
- Integrate child components into parents.
- Apply global styling using Box in App.tsx.

## Technical Concept
### Styling the App
- In App.tsx: Wrap content in `<Box sx={{ bgcolor: '#eee' }}>...</Box>` for a light gray background.

## Tips for Beginners
- If cards blend into the background, add contrast with colors—test in the browser often.

# Section 5: Creating the ActivityDetails Component

## ActivityDetails View

### Definition
A component showing detailed info for one activity, including an image based on category.

### Purpose
Provides a "zoomed-in" view of a selected activity, initially on the same page as the list.

### Key Idea
Use CardMedia for images, dynamically sourcing them via template strings.

> **Quote**: "This is not going to be the activity details final form. It will change as we introduce routing."

## Learning Goals
- Handle dynamic images in React.
- Use Grid for layout in the dashboard (e.g., sizes 7 and 5 for columns).

## Technical Concept
### Adding Images
- Copy "images" folder to public/.
- Source: `<CardMedia component="img" src={`/images/categoryImages/${activity.category}.jpg`} />`

### Code Snippet
```tsx
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

type Props = {
  activity: Activity;
};

const ActivityDetails = ({ activity }: Props) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia component="img" src={`/images/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">{activity.date}</Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary">Edit</Button>
        <Button color="inherit">Cancel</Button>
      </CardActions>
    </Card>
  );
};
```

## Tips for Beginners
- Use backticks (`) for template strings to insert variables like `${activity.category}`.
- If images don't load, inspect in browser console—check file paths and extensions (e.g., .jpg).

# Section 6: Implementing Activity Selection with Prop Drilling

## Prop Drilling and State Management

### Definition
Prop drilling means passing data/functions through multiple component levels. We use React's useState for local state to track the selected activity.

### Purpose
Allows clicking "View" on a card to update the details view, demonstrating basic interactivity before global state tools.

### Key Idea
Store selected activity in state at the top level (App.tsx), then "drill" selection handlers down to buttons.

> **Analogy**: Prop drilling is like passing a note through a chain of friends— it works but gets messy; global state is like shouting to everyone at once.

## Learning Goals
- Use useState for managing selected items.
- Create handler functions for selecting/canceling.
- Understand when to use arrow functions in components.

## Technical Concept
### State and Handlers in App.tsx
- State: `const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);`
- Handlers:
  ```tsx
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  };
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };
  ```
- Pass to dashboard: `<ActivityDashboard ... selectActivity={handleSelectActivity} cancelSelectActivity={handleCancelSelectActivity} selectedActivity={selectedActivity} />`

### In ActivityCard (View Button)
- Add prop: `selectActivity: (id: string) => void;`
- On button: `<Button ... onClick={() => selectActivity(activity.id)}>View</Button>`

### In ActivityDetails (Cancel Button)
- Add prop: `cancelSelectActivity: () => void;`
- On button: `<Button ... onClick={cancelSelectActivity}>Cancel</Button>`

### Conditional Render in Dashboard
- `<Grid item xs={5}>{selectedActivity && <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} />}</Grid>`

## Tips for Beginners
- Avoid prop drilling for large apps—it's temporary here; we'll use better tools like Redux soon.
- Use `===` for strict equality in JS (checks value and type).
- Test clicks in the browser: If nothing happens, check if handlers are passed all the way down.

# Section: Adding an Activity Form in React

## Overview

### Definition
An activity form is a React component that allows users to input details (like title, description, date, etc.) to create or edit an "activity" item in the app. It's built using Material-UI components for a clean, user-friendly interface.

### Purpose
This form enables CRUD (Create, Read, Update, Delete) operations in the app. It appears on the right side of the screen when creating or editing an activity, making it easy to add or modify items without leaving the main list view.

### Key Idea
The form is conditionally displayed based on app state (e.g., "edit mode"), and it uses prop drilling to communicate open/close actions across components.

> **Analogy**: Think of the form like a pop-up notebook that only appears when you want to jot down a new idea (create) or revise an old one (edit). It stays hidden otherwise to keep your desk (the app screen) clutter-free.

## Learning Goals
- Understand how to create a basic form component in React using Material-UI.
- Learn to manage form visibility with React state and prop drilling.
- Integrate the form into the app's dashboard for create/edit functionality.
- Handle basic user interactions like opening, closing, and submitting the form.

## Creating the ActivityForm Component

### Steps to Build the Form
- In VS Code, navigate to the `features/activities` folder.
- Create a new folder and file: `Form/ActivityForm.tsx`.
- Use the RFC (React Functional Component) snippet to generate the boilerplate.
- Wrap the form in a `Paper` component for a white background with rounded corners and padding.
- Add a `Typography` header for the title "Create Activity".
- Use a `Box` as the form container, styled as a flex column with gaps.
- Add `TextField` inputs for fields like title, description (as multiline), category, date (with type="date" for picker), city, and venue.
- Include a `Box` for buttons (Cancel and Submit) aligned to the right.

### Code Snippet (ActivityForm.tsx)
```tsx
import React from 'react';
import { Paper, Typography, Box, TextField, Button } from '@mui/material';

export default function ActivityForm() {
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Activity
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Title" />
        <TextField label="Description" multiline rows={3} />
        <TextField label="Category" />
        <TextField label="Date" type="date" />
        <TextField label="City" />
        <TextField label="Venue" />
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
          <Button color="inherit">Cancel</Button>
          <Button color="success" variant="contained">Submit</Button>
        </Box>
      </Box>
    </Paper>
  );
}
```

### Notes on Material-UI Components
- `Paper`: Provides a card-like container with elevation.
- `TextField`: A versatile input field; use `multiline` for text areas and `type="date"` for basic date pickers (browser-dependent; Chrome supports it well).
- Buttons: `color="inherit"` for neutral (Cancel), `color="success"` and `variant="contained"` for prominent (Submit).

## Managing Form State in App.tsx

### Definition
State management here uses React's `useState` hook to track "edit mode" (a boolean for form visibility) at the app level, since the Create button is in the navbar.

### Steps
- In `App.tsx`, add state: `const [editMode, setEditMode] = useState(false);`.
- Create handlers:
  - `handleOpenForm(id?: string)`: Selects activity if ID provided, opens form by setting `editMode` to true.
  - `handleFormClose()`: Sets `editMode` to false.
- Pass these as props to `NavBar` and `ActivityDashboard`.

### Code Snippet (App.tsx Excerpt)
```tsx
const [editMode, setEditMode] = useState(false);

const handleOpenForm = (id?: string) => {
  if (id) {
    handleSelectActivity(id);
  } else {
    handleCancelSelectActivity();
  }
  setEditMode(true);
};

const handleFormClose = () => {
  setEditMode(false);
};
```

## Prop Drilling for Form Control

### Definition
Prop drilling means passing state and functions down through component hierarchy (e.g., from App to NavBar, Dashboard, Details, Form).

### Steps in Components
- **NavBar.tsx**: Receive `openForm` prop (no params). Attach to Create button: `<Button onClick={openForm}>Create Activity</Button>`.
- **ActivityDashboard.tsx**: Receive `editMode`, `openForm`, `closeForm`. Conditionally render:
  - Activity details if selected and not in edit mode.
  - Form if in edit mode.
- Pass `openForm` to `ActivityDetails` for Edit button.
- Pass `closeForm` and `activity` to `ActivityForm`.
- **ActivityDetails.tsx**: Receive `openForm`. Attach to Edit button: `<Button onClick={() => openForm(activity.id)}>Edit</Button>`.
- **ActivityForm.tsx**: Receive `closeForm` and optional `activity`. Attach to Cancel: `<Button onClick={closeForm}>Cancel</Button>`. Use activity data (e.g., `<TextField value={activity?.title} />`).

> **Analogy**: Prop drilling is like passing a message down a chain of friends—each passes it along until it reaches the right person. It's simple but can get tedious in deep hierarchies (later, tools like Context API can help).

## Integrating and Testing the Form

### Integration in ActivityDashboard.tsx
- Render form below details: `{editMode && <ActivityForm activity={selectedActivity} closeForm={closeForm} />}`.
- Render details: `{selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} openForm={openForm} />}`.

### Testing Functionality
- Refresh browser: No form visible initially.
- Click "Create Activity": Form appears on right.
- Select an activity: Details show; form hidden.
- Click Edit in details: Form opens with activity data (e.g., title pre-filled).
- Cancel form: Returns to details view if editing, or hides if creating.

## Key Commands Recap
- Create file in VS Code: Right-click > New File > `Form/ActivityForm.tsx`.
- Run app: Assume `npm start` (from previous setup).
- Refresh browser: Ctrl+R (Windows) or Cmd+R (Mac) to see changes.

## Tips for Beginners
- Start small: Build the form without state first, then add visibility logic to avoid overwhelm.
- Debug browser issues: Date pickers vary by browser—test in Chrome for reliability; consider libraries like `@mui/x-date-pickers` for better control later.
- Avoid common pitfalls: Always destructure props correctly to prevent undefined errors. Use optional chaining (e.g., `activity?.title`) for safe access.
- Practice: Experiment by adding more fields or styling—Material-UI docs are great for quick lookups.
# Section 5: Form Basics and CRUD Operations in React

## Introduction to Forms in React

### Definition
Forms in React are UI elements that allow users to input and submit data, which React can track using controlled or uncontrolled inputs.

### Purpose
Forms are essential for capturing user input, such as creating or editing activities, and React provides mechanisms to manage form data efficiently.

### Key Idea
React tracks form inputs either by controlling their state (controlled inputs) or accessing the DOM directly on submission (uncontrolled inputs).

> **Analogy**: Think of controlled inputs like a puppet with strings—React pulls every string to control the input’s value. Uncontrolled inputs are like a free puppet; React only checks what it’s holding when you ask.

## Learning Goals
- Understand the difference between controlled and uncontrolled inputs in React.
- Implement a basic form to create and edit activities using uncontrolled inputs.
- Capture form data on submission and update the local activity list.
- Add delete functionality to complete CRUD operations locally in React.

## Controlled vs. Uncontrolled Inputs

### Controlled Inputs
- **Definition**: Inputs where React manages the value via component state (using `useState`).
- **How It Works**: The input’s `value` is bound to a state variable, and an `onChange` handler updates the state as the user types.
- **Example Issue**: In the transcript, setting `value={activity.title}` without tracking state caused the input to become read-only, as React wasn’t updating the value.
  
```jsx
// Example of a controlled input
const [title, setTitle] = useState('');
<input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
```

### Uncontrolled Inputs
- **Definition**: Inputs where React doesn’t track the value; the DOM holds the input’s state.
- **How It Works**: Use `defaultValue` to set an initial value, and access the DOM (via `FormData`) on form submission to get the input values.
- **Example Fix**: The transcript switches to `defaultValue={activity.title}` to allow editing without state tracking.

```jsx
<input
  defaultValue={activity.title}
  name="title"
/>
```

### Key Idea
Uncontrolled inputs are simpler for basic forms but less flexible, while controlled inputs offer full control at the cost of more code.

## Implementing a Basic Form

### Form Setup
- Create a form with inputs for activity properties (title, description, category, date, city, venue).
- Use `defaultValue` for uncontrolled inputs to pre-populate fields when editing.
- Add a `name` attribute to each input to identify it in `FormData`.

```jsx
<form onSubmit={handleSubmit}>
  <input defaultValue={activity.title} name="title" />
  <input defaultValue={activity.description} name="description" />
  <input defaultValue={activity.category} name="category" />
  <input defaultValue={activity.date} name="date" />
  <input defaultValue={activity.city} name="city" />
  <input defaultValue={activity.venue} name="venue" />
  <button type="submit">Submit</button>
</form>
```

### Handling Form Submission
- Define a `handleSubmit` function to capture form data.
- Use `FormData` to collect input values based on their `name` attributes.
- Prevent default form submission to avoid page reloads.

```tsx
import { FormEvent } from 'react';

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data: { [key: string]: FormDataEntryValue } = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  console.log(data); // Outputs: { title: "Test", description: "Test", ... }
};
```

### Submitting to Update Activities
- Pass a `submitForm` function from the `App` component to the form via props.
- Update the activity list locally based on whether it’s a create or edit operation.
- Use `map` to update an existing activity or spread operator to add a new one with a temporary ID.

```tsx
const handleSubmitForm = (activity: Activity) => {
  if (activity.id) {
    // Update existing activity
    setActivities(activities.map(x => x.id === activity.id ? activity : x));
  } else {
    // Create new activity
    const newActivity = { ...activity, id: activities.length.toString() };
    setActivities([...activities, newActivity]);
    setSelectedActivity(newActivity); // Display new activity
  }
  setEditMode(false); // Close form
};
```

## Implementing Delete Functionality

### Delete Handler
- Add a `handleDelete` function in the `App` component to remove an activity by ID.
- Use `filter` to create a new array excluding the activity with the matching ID.

```tsx
const handleDelete = (id: string) => {
  setActivities(activities.filter(x => x.id !== id));
};
```

### Passing Delete Function
- Pass `handleDelete` through components (`App` → `ActivityDashboard` → `ActivityList` → `ActivityCard`) via props (prop drilling).
- Add a delete button in the `ActivityCard` component.

```jsx
import { Box, Button } from '@mui/material';

<Box display="flex" gap={3}>
  <Button variant="contained" onClick={() => viewActivity(activity.id)}>
    View
  </Button>
  <Button
    variant="contained"
    color="error"
    onClick={() => deleteActivity(activity.id)}
  >
    Delete
  </Button>
</Box>
```

## Key Commands Recap
- `event.preventDefault()`: Prevents the default form submission behavior (page reload).
- `new FormData(event.currentTarget)`: Collects form input values by their `name` attributes.
- `activities.map(x => x.id === activity.id ? activity : x)`: Updates an activity in the list.
- `activities.filter(x => x.id !== id)`: Removes an activity from the list.

## Tips for Beginners
- **Controlled vs. Uncontrolled**: Start with uncontrolled inputs for simple forms to avoid boilerplate code, but switch to controlled inputs for dynamic forms (e.g., real-time validation).
- **Prop Drilling**: Passing props through multiple components (like `deleteActivity`) can get messy. Consider state management (e.g., Redux, Context API) for complex apps.
- **TypeScript Challenges**: Form data typing can be tricky. Use `{ [key: string]: FormDataEntryValue }` for dynamic keys and cast to your data type carefully.
- **Testing Forms**: Use Chrome DevTools to log form data (`console.log`) and verify input values before updating state.

## Next Steps
- Explore form helper libraries (e.g., Formik, React Hook Form) to simplify form handling.
- Implement server-side synchronization using Axios or a better tool (introduced in the next section).
- Introduce state management to reduce prop drilling and manage activities globally.
- Synchronize changes with source control (e.g., Git commit: `end of section five`).