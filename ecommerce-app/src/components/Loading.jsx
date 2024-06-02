import React from "react";
import { Spinner, Box } from "@chakra-ui/react";

const Loading = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
    <Spinner size="xl" />
  </Box>
);

export default Loading;
