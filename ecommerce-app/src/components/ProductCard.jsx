import React from "react";
import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
    <Image style={{ width: "100%" }} src={product.image} alt="s" h={200} />
    <Heading size="md" mb={2}>
      {product.title}
    </Heading>
    <Text>
      <span style={{ fontWeight: "bold" }}>Category : </span>
      {product.category}
    </Text>
    <Text>
      <span style={{ fontWeight: "bold" }}>Price : </span>
      {product.price}
    </Text>
    <Text>
      <span style={{ fontWeight: "bold" }}>Brand : </span>
      {product.brand}
    </Text>
    <Link to={`/product/${product.id}`}>
      <Button colorScheme="teal" mt={4}>
        More Details
      </Button>
    </Link>
  </Box>
);

export default ProductCard;
