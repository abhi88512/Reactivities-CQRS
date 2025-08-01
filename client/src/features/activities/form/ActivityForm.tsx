import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import type { FormEvent } from "react";

type Props = {
    closeForm: () => void;
    activity?: Activity
    submitForm: (activity : Activity) => void
}

export const ActivityForm = ({closeForm, activity, submitForm}: Props) => {

    const handleSubmit = (event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault(); 
        console.log(event);

        const formdata = new FormData(event.currentTarget);

        const data: { [key: string] : FormDataEntryValue} = {}

        formdata.forEach((value, key) => { 
            data[key] = value
        });

        console.log(data);

        if(activity) data.id = activity.id;

        submitForm(data as unknown as Activity);

    }
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant='h5' color='primary' gutterBottom>
                Create Activity
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField name='title' label='Title' defaultValue={activity?.title}/>
                <TextField name='description' label='Description' multiline rows={3} defaultValue={activity?.description}/>
                <TextField label='Category' name='category' defaultValue={activity?.category} />
                <TextField label='Date' type="date" name='date' defaultValue={activity?.date}/>
                <TextField label='City' name='city' defaultValue={activity?.city} />
                <TextField label='Venue' name='venue' defaultValue={activity?.venue} />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button onClick={closeForm} color='inherit'>Cancel</Button>
                    <Button type='submit' color='success' variant='contained'>Submit</Button>
                </Box>

            </Box>

        </Paper>
    )
}