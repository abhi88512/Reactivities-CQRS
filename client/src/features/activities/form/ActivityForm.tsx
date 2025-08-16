import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import useActivities from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm, type FieldValues } from "react-hook-form";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/scheemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./CategoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LoactionInput from "../../../app/shared/components/LoactionInput";

export const ActivityForm = () => {
  const { handleSubmit, reset, control } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  useEffect(() => {
    if (activity)
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
  }, [activity, reset]);

  const onSubmit = async (data: FieldValues) => {
    const { location, ...rest } = data;
    const flattenData = {
      ...rest,
      ...location,
    };

    try{

      if(activity){
        updateActivity.mutate({...activity, ...flattenData},{
          onSuccess: () => {
            navigate(`/activities/${activity.id}`);
          },
        })
      }
      else{
        createActivity.mutate(flattenData, {
          onSuccess: (id) => {
            navigate(`/activities/${id}`);
          },
        });
      }
    }
    catch(error){
      console.log(error)
    }
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
        <TextInput label="Title" control={control} name="title" />
        <TextInput
          label="Description"
          control={control}
          name="description"
          multiline
          rows={4}
        />
        <Box display="flex" gap={3}>
          <SelectInput
            items={categoryOptions}
            label="Category"
            control={control}
            name="category"
          />
          <DateTimeInput label="Date" control={control} name="date" />
        </Box>
        <LoactionInput
          label="Enter the loaction."
          control={control}
          name="location"
        />
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
