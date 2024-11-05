import { Box, Button, Center, Container, Heading, Input, useColorModeValue, useToast, VStack,Text,Textarea} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import {HfInference} from '@huggingface/inference';
const CreatePage = () => {
    const inference=new HfInference("Enter API Key");
    const model="meta-llama/Meta-Llama-3-8B-Instruct";
    const { user }=useAuthStore();
    const [newPrompt,setNewPrompt]=useState("");
	const [userReq,setUserReq]=useState("");
	const [summary,setSummary]=useState("");
	const [output,setOutput]=useState();
	const toast = useToast();
	const textColor = "gray.200";
	const [blog,setBlog]=useState({
		title:"Made with blogger",
		authour:user.name,
		body:""
	})

	const { createProduct } = useProductStore();

	const makeBlog = async () => {
		for await (const output of inference.textGenerationStream({
            model: model,
            inputs: newPrompt+"do not answer if the input is not about making blogs or about generating ideas in cases like this answer in 20 words and do not repeat the input in the generated text",
            parameters: { max_new_tokens: 800 }
          })) 
		  {
			setOutput(output.generated_text);
          }
			console.log(output);
			console.log(user.name);
			console.log(newPrompt);	

	};
	const generateSummary=async()=>{
		const result=await inference.summarization({
			model: 'facebook/bart-large-cnn',
			inputs:
			  [userReq+"answer please enter an input if no string is recived"],
			parameters: {
			  max_length: 100
			}
		  })
		  setSummary(result.summary_text);
		  setUserReq("");
	}
	const saveBlog= async () =>{
		setBlog({...blog,body:output});
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

	}
    

	return (
		<div>
		<Box minH={"100vh"} bg={"gray.900"} minW={"100vh"}>
		<Navbar />
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Blog
				</Heading>

				<Box w={"full"} bg={"gray.800"} p={6} rounded={"lg"} shadow={"md"}>
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
		<Box w={"full"}  p={6} rounded={"lg"} shadow={"md"} >
					<VStack spacing={9}>

						{output !== undefined && (
					<Text fontWeight='semi-bold' fontSize='lg' color={textColor} mb={4} whiteSpace="pre-line">
						{output}

						<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={saveBlog}
						className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'>
							Save the Blog
						</motion.button>

					</Text>
       						 )}
						</VStack>
					{output === undefined && (
            	<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            	</Text>
        					)}

				</Box>
			<VStack spacing={4}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
						Summarize
				</Heading>

				<Box w={"120vh"} bg={"gray.800"} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
					<Textarea
							placeholder='Enter your text'
							name='body'
							bg={"gray.600"}
							variant={"subtle"}
							height={"40vh"}
							fontWeight={"medium"}
							resize={"both"}
							 onChange={(e) => setUserReq(e.target.value)}
							/>
						<Button colorScheme='blue' onClick={generateSummary} w='full' isDisabled={userReq.length===0}>
							Generate Summary
						</Button>
					</VStack>
				</Box>
			</VStack>
			<Box w={"full"}  p={6} rounded={"lg"} shadow={"md"} >
					<VStack spacing={9}>

						{summary !== undefined && (
					<Text fontWeight='semi-bold' fontSize='lg' color={textColor} mb={4} whiteSpace="pre-line">
						{summary}
					</Text>
       						 )}
						</VStack>
					{summary === undefined && (
            	<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            	</Text>
        					)}

				</Box>
		</Box>
	</div>
	);
};
export default CreatePage;
