import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import useActivities from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export const ActivityForm = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);

    const formdata = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formdata.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data);

    if (activity) {
      data.id = activity.id;
      updateActivity.mutateAsync(data as unknown as Activity);
      navigate(`/activities/${activity.id}`)
    } else {
      createActivity.mutate(data as unknown as Activity,{
        onSuccess: (id) => {
          navigate(`/activities/${id}`)
        }
      });
    }
  };

  if(isLoadingActivity) return <Typography>Loading Activity...</Typography>

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom>
       { activity ? 'Edit Activity' : 'Create Activity'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          defaultValue={activity?.description}
        />
        <TextField
          label="Category"
          name="category"
          defaultValue={activity?.category}
        />
        <TextField
          label="Date"
          type="date"
          name="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
        />
        <TextField label="City" name="city" defaultValue={activity?.city} />
        <TextField label="Venue" name="venue" defaultValue={activity?.venue} />
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
