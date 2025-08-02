import { Grid2 } from "@mui/material"
import { ActivityList } from "./ActivityList"
import { ActivityDetail } from "../detail/ActivityDetail"
import { ActivityForm } from "../form/ActivityForm"


type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    selctedActivity: Activity | undefined
    openForm: (id: string) => void
    closeForm: () => void
    editMode: boolean
}
const ActivityDashboard = ({ activities, selectActivity, selctedActivity,
    cancelActivity, openForm,
    closeForm, editMode,
}: Props) => {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList activities={activities} selectActivity={selectActivity} />

            </Grid2>
            <Grid2 size={5}>
                {selctedActivity && (!editMode) &&
                    <ActivityDetail
                        selectedActivity={selctedActivity}
                        cancelActivity={cancelActivity}
                        openForm={openForm}
                    />}
                {editMode && <ActivityForm closeForm={closeForm} activity={selctedActivity} />}
            </Grid2>

        </Grid2>
    )
}

export default ActivityDashboard