import { useState } from "react"
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { NavBar } from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import useActivities from "../../lib/hooks/useActivities";



function App() {
  const [selctedActivity, setSelctedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  const { activities, isPending } = useActivities();


  const handleSelectActivity = (id: string) => {
    setSelctedActivity(activities!.find(x => x.id === id));
  }

  const handleCancelActivity = () => {
    setSelctedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelActivity();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  return (
    <Box bgcolor='#eeeeee'>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ? (<Typography>Loading....</Typography>) :
          (<ActivityDashboard
            activities={activities}
            selctedActivity={selctedActivity}
            selectActivity={handleSelectActivity}
            cancelActivity={handleCancelActivity}
            openForm={handleOpenForm}
            closeForm={handleCloseForm}
            editMode={editMode}
          />)}
      </Container>

    </Box>
  )
}

export default App
