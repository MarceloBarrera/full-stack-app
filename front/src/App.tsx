import { Box, Container, Flex } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { Link as ComponentLink } from "@chakra-ui/react";

function App() {
  return (
    <Container>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <nav>
          <Box m={4}>
            <ComponentLink asChild>
              <Link to="/people">People </Link>
            </ComponentLink>
            {" | "}
            <ComponentLink asChild>
              <Link to="/analytics">Analytics </Link>
            </ComponentLink>
            {" | "}
            <ComponentLink asChild>
              <Link to="/geo">Geospatial Viewer</Link>
            </ComponentLink>
          </Box>
        </nav>
      </Flex>

      <Outlet />
    </Container>
  );
}

export default App;
