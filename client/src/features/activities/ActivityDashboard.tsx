import { Grid2, List, ListItem, ListItemText } from "@mui/material"


type Props = {
    activities: Activity[]
}
const ActivityDashboard = ({ activities }: Props) => {
    return (
        <Grid2 container>
            <Grid2 size={9}>
                <List>
                    {activities.map((act) => (
                        <ListItem key={act.id}>
                            <ListItemText>
                                {act.title}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>

            </Grid2>

        </Grid2>
    )
}

export default ActivityDashboard