import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Error = ({ message }) => (
  <Box color="red.500">
    <Text>{message}</Text>
  </Box>
);

export default Error;
