import { useEffect, useState } from "react"
import { Box, Container, CssBaseline} from "@mui/material";
import axios from "axios";
import { NavBar } from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";



function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selctedActivity, setSelctedActivity] = useState<Activity| undefined>(undefined);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelctedActivity(activities.find(x => x.id === id));
  }

  const handleCancelActivity = () => {
    setSelctedActivity(undefined);
  }

  return (
    <Box bgcolor='#eeeeee'>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl' sx={{mt: 3}}>
      <ActivityDashboard 
      activities={activities} 
      selctedActivity={selctedActivity}
      selectActivity={handleSelectActivity}
      cancelActivity={handleCancelActivity}
      />
      </Container>

    </Box>
  )
}

export default App
