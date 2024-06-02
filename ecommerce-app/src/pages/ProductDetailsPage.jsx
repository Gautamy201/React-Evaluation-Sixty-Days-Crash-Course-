import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Image,
} from "@chakra-ui/react";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const toast = useToast();

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${productId}`
      );
      setProduct(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch product details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmAddToCart = () => {
    setIsAlertOpen(false);
    toast({
      title: "Item added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>{error}</Box>;

  return (
    <Box maxW="container.md" mx="auto" mt={10}>
      <Image style={{ width: "100%" }} src={product.image} alt="s" h={400} />
      <Heading mb={6}>{product.title}</Heading>
      <Text>{product.description}</Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Category : </span>
        {product.category}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>price : </span>
        {product.price}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Brand : </span>
        {product.brand}
      </Text>
      <Button colorScheme="teal" onClick={handleAddToCart} mt={4}>
        Add to Cart
      </Button>

      <AlertDialog isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Add to Cart</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to add this item to the cart?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsAlertOpen(false)}>Cancel</Button>
              <Button
                colorScheme="teal"
                onClick={handleConfirmAddToCart}
                ml={3}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductDetailsPage;
