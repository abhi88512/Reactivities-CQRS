import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import useActivities from "../../../lib/hooks/useActivities";

type Props ={
    selectedActivity: Activity
    cancelActivity: () => void;
    openForm: (id: string) => void;
}

export const ActivityDetail = ({selectedActivity, cancelActivity, openForm }: Props) => {
  const {activities} = useActivities();
  const activity = activities?.find(x => x.id === selectedActivity.id);
  if(!activity){
    return <Typography>Loading...</Typography>
  }
  return (
    <Card sx={{borderRadius: 3}}>
        <CardMedia
        component='img'
        src={`/images/categoryImages/${activity.category}.jpg`}
        />
        <CardContent>
            <Typography variant='h5'>{activity.title}</Typography>
            <Typography variant='subtitle1' fontWeight='light'>{activity.date}</Typography>
            <Typography variant='body1'>{activity.description}</Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => openForm(activity.id)} color='primary'>Edit</Button>
            <Button onClick={cancelActivity} color='warning'>Cancel</Button>
        </CardActions>

    </Card>
  )
}