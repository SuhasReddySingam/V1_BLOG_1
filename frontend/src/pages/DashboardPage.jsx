import { Container, SimpleGrid, Text, VStack,Box,useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductStore } from "../store/product";
import { useAuthStore } from "../store/authStore";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const HomePage = () => {
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};
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
		<div className="flex items-center justify-center">

		<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className='w-1/3 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
					font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700
					focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900'
					>
					Logout
				</motion.button>
			</div>
		</Box>
		</div>
	);
};
export default HomePage;
