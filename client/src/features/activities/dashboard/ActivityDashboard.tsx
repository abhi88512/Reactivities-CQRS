import { Grid2 } from "@mui/material"
import { ActivityList } from "./ActivityList"
import { ActivityDetail } from "../detail/ActivityDetail"


type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    selctedActivity: Activity | undefined
}
const ActivityDashboard = ({ activities, selectActivity, selctedActivity, cancelActivity }: Props) => {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList activities={activities} selectActivity={selectActivity} />

            </Grid2>
            <Grid2 size={5}>
                {selctedActivity && <ActivityDetail activity={selctedActivity} cancelActivity={cancelActivity} />}
            </Grid2>

        </Grid2>
    )
}

export default ActivityDashboard