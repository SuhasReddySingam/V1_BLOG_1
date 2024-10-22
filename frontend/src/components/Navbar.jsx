import { Button, Container, Flex, HStack, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
  } from '@chakra-ui/react'
  import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useRef } from "react";
import { useAuthStore } from "../store/authStore";
const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef();
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>

				 	
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Blogger</Link>
				</Text>

				<HStack spacing={10} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Avatar name={user.name[0]} ref={btnRef} colorScheme='teal' onClick={onOpen} className="hover:cursor-pointer"/>

      				<Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Profile</DrawerHeader>
		  <DrawerBody>
			<p>Name:{user.name}</p>
			<p>Last Login:{formatDate(user.lastLogin)}</p>
			<br/>
			<Link to={"/create"} className='text-blue-400 hover:underline'>
						Create a Blog
					</Link>
					<br/>
		  <Link to={`/view/${user.name}`} className='text-blue-400 hover:underline'>
						View all the blogs you created
					</Link>
					<br/>
					<br/>
					<hr/>
			<Text onClick={handleLogout} className="font-bold text-lg hover:cursor-pointer">Logout</Text>
			

		  </DrawerBody>
        </DrawerContent>
     			</Drawer>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;
