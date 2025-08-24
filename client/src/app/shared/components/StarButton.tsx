import { Star, StarBorder } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

type Props = {
    selected: boolean
};

export default function StarButton({ selected }: Props) {
  return <Box sx={{ position: "relative" }}>
    <Button
        sx={{
            opacity: 0.8,
            position: 'relative',
            transition: 'opacity 0.3s',
            cursor: 'pointer'
        }}
    >
        <StarBorder 
            sx={{
                fontSize: 32,
                color: 'white',
                position: 'absolute',
            }}
        />
        <Star
            sx={{
                fontSize: 32,
                color: selected ? 'yellow' : 'grey',
            }}
        />
    </Button>
  </Box>;
}
