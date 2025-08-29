import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Typography } from "@mui/material";
import { ProfileCard } from "./ProfileCard";

type Props = {
  activeTab: number;
};

export const ProfileFollowings = ({ activeTab }: Props) => {
  const { id } = useParams();
  const predicate = activeTab === 3 ? "followers" : "followings";
  const { followings, loadingFollowings } = useProfile(id, predicate);

  if (loadingFollowings)
    return <Typography variant="h6">Loading {predicate}...</Typography>;
  return (
    <Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          {" "}
          {predicate.charAt(0).toUpperCase() + predicate.slice(1)}
        </Typography>
      </Box>
      {followings?.length === 0 ? (
        <Typography variant="h6">No {predicate}</Typography>
      ) : (
        <Box display="flex" marginTop={3} gap={3}>
          {followings?.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </Box>
      )}
    </Box>
  );
};
