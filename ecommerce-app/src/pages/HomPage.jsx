import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, SimpleGrid, Select, Heading } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products"
      );
      setProducts(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const catogaryArry = [
    ...new Set(products.map((product) => product.category)),
  ];
  const handleSortChange = (e) => {
    setSearchParams({ sort: e.target.value });
    console.log(searchParams.get("sort"));
  };
  console.log(products);
  const handleFilterChange = (e) => {
    setSearchParams({ filter: e.target.value.toLowerCase() });
  };

  const sortedAndFilteredProducts = () => {
    let sortedProducts = [...products];
    const sort = searchParams.get("sort");
    const filter = searchParams.get("filter");

    if (sort === "ascending") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "descending") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    if (filter) {
      sortedProducts = sortedProducts.filter(
        (product) => product.category === filter
      );
    }

    return sortedProducts;
  };

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>{error}</Box>;

  return (
    <Box maxW="container.lg" mx="auto" mt={10}>
      <Heading mb={6}>Products</Heading>
      <Box mb={6}>
        <Select placeholder="Sort by Price" onChange={handleSortChange}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </Select>
        <Select
          placeholder="Filter by Category"
          onChange={handleFilterChange}
          mt={4}
        >
          {catogaryArry.map((catogry) => (
            <option key={catogry} value={catogry}>
              {catogry.toUpperCase()}
            </option>
          ))}
        </Select>
      </Box>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {sortedAndFilteredProducts().map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
