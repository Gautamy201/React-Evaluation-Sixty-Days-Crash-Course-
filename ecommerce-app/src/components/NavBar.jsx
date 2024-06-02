import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Box, Flex, Button } from "@chakra-ui/react";
const NavBar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between" align="center">
        {auth.isAuthenticated ? (
          <>
            <Box color="white">{auth.email}</Box>
            <Flex>
              <Link to="/home">
                <Button colorScheme="teal" variant="outline" mr={4}>
                  Home
                </Button>
              </Link>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </Flex>
          </>
        ) : (
          <Link to="/login">
            <Button colorScheme="teal" variant="outline">
              Login
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;
