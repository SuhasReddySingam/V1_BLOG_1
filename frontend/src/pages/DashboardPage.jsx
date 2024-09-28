import { Container, SimpleGrid, Text, VStack,Box,useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products", products);

	return (
		<div>
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>

		<Navbar />
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
					>
					Current Blogs 🚀
				</Text>
				{/* 
				<SimpleGrid minChildWidth='130px'
				columns={{
					base: 1,
					md: 1,
					lg: 1,
				}}
				spacing={10}
				w={"full"}
			> */}
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
						))}
				{/* </SimpleGrid> */}

				{products.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No Blogs found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Blog
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
		</Box>
		</div>
	);
};
export default HomePage;
