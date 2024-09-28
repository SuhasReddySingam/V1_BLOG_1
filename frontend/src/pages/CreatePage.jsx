import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		title: "",
		authour: "",
		body: "",
	});
	const toast = useToast();

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
        console.log(newProduct);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewProduct({ title: "", authour: "", body: "" });
	};

	return (
		<div>
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
		<Navbar />
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Title'
							name='title'
							value={newProduct.title}
							onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
							/>
						<Input
							placeholder='authour'
							name='authour'
							value={newProduct.authour}
							onChange={(e) => setNewProduct({ ...newProduct, authour: e.target.value })}
							/>
						<Input
							placeholder='Body'
							name='body'
							value={newProduct.body}
							onChange={(e) => setNewProduct({ ...newProduct, body: e.target.value })}
							/>

						<Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
		</Box>
	</div>
	);
};
export default CreatePage;
