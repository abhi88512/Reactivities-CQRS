import { Box, Container, CssBaseline } from "@mui/material";
import { NavBar } from "./NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { Homepage } from "../../features/home/Homepage";

function App() {
  const location = useLocation();
  return (
    <Box bgcolor="#eeeeee">
      <ScrollRestoration/>
      <CssBaseline />
      {location.pathname === "/" ? (
        <Homepage />
      ) : (
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
}

export default App;
