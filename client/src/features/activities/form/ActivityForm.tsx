import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import useActivities from "../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { useForm, type FieldValues } from "react-hook-form";
import {
  activityScheema,
  type ActivityScheema,
} from "../../../lib/scheemas/activityScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";

export const ActivityForm = () => {
  const {  handleSubmit, reset, control } = useForm<ActivityScheema>({
    mode: "onTouched",
    resolver: zodResolver(activityScheema),
  });
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  useEffect(() => {
    if (activity) reset(activity);
  }, [activity, reset]);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  if (isLoadingActivity) return <Typography>Loading Activity...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        {activity ? "Edit Activity" : "Create Activity"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextInput label="Title" control={control} name ="title" />
        <TextInput label="Description" control={control} name ="description" multiline rows={4} />
        <TextInput label="Category" control={control} name ="category" />
        <TextInput label="City" control={control} name="city" />
        <TextInput label="Venue" control={control} name ="venue" />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={() => {}} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
