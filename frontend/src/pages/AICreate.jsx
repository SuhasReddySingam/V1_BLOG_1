import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";
import {HfInference} from '@huggingface/inference';
const CreatePage = () => {
    const inference=new HfInference("Enter your API key here");
    const model="meta-llama/Meta-Llama-3-8B-Instruct";
    const { user }=useAuthStore();
    const [newPrompt,setNewPrompt]=useState("");
	const toast = useToast();
	const [blog,setBlog]=useState({
		title:"Made with blogger",
		authour:user.name,
		body:""
	})

	const { createProduct } = useProductStore();

	const makeBlog = async () => {
		for await (const output of inference.textGenerationStream({
            model: model,
            inputs: newPrompt,
            parameters: { max_new_tokens: 800 }
          })) {
			setBlog({...blog,body:output.generated_text});
          }
				console.log(blog.body);
				console.log(blog.authour);
				console.log(blog.title);
				const { success, message } = await createProduct(blog)
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
        setNewPrompt("");

	};
    

	return (
		<div>
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
		<Navbar />
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Blog
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
                        <Input
							placeholder='Prompt'
							name='prompt'
							value={newPrompt}
							onChange={(e) => setNewPrompt(e.target.value)}
							/>
						<Button colorScheme='blue' onClick={makeBlog} w='full'>
							Add Blog
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
