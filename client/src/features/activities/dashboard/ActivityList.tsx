import { Box, Typography } from "@mui/material";
import { ActivityCard } from "./ActivityCard";
import useActivities from "../../../lib/hooks/useActivities";
import { observer } from "mobx-react-lite";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export const ActivityList = observer(() => {
  const { activities, isLoading, hasNextPage, fetchNextPage } = useActivities();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!activities) return <Typography>No activities found</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities.pages.map((page, index) => (
        <Box
          key={index}
          ref={index === activities.pages.length - 1 ? ref : null}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          {page.items.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </Box>
      ))}
    </Box>
  );
});
