import { zodResolver } from "@hookform/resolvers/zod";
import {
  editProfileSchema,
  type EditProfileSchema,
} from "../../lib/scheemas/editProfileScheema";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { useEffect } from "react";

type Props = {
  setEditMode: (editMode: boolean) => void;
};

export const EditProfileForm = ({ setEditMode }: Props) => {
  const { id } = useParams();
  const { profile, updateProfile } = useProfile(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: EditProfileSchema) => {
    await updateProfile.mutateAsync(data, {
      onSuccess: () => setEditMode(false),
    });
  };

  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile.displayName,
        bio: profile.bio || "",
      });
    }
  }, [reset, profile]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      alignContent="center"
      gap={3}
      mt={3}
    >
      <TextInput label="Display Name" name="displayName" control={control} />
      <TextInput label="Bio" name="bio" control={control} multiline rows={4} />
      <Button type="submit" variant="contained" color="primary" fullWidth
      disabled={!isDirty || !isValid || updateProfile.isPending}
      >
        Update profile
      </Button>
    </Box>
  );
};
