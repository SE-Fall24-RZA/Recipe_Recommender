"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useState } from "react"; // Import useState for toggling
import Chatbot from "./chatbot"; // Import Chatbot component

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Nav(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChatbotVisible, setIsChatbotVisible] = useState(false); // State for chatbot visibility
 

  const handleBookMarks = () => {
    props.handleBookMarks();
  };

  const handleMealPlan = () => {
    props.handleMealPlan();
  };

  const handleLogout = () => {
    console.log("logged out");
    props.handleLogout();
  };


  return (
    <Box color={"black"} mb={5} bg={"green.300"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box pl={10}>
          <Image src="./public/images/logo_1by1.png" alt="Saveurs Sélection" />
          <Heading size={"md"}>Saveurs Sélection</Heading>
        </Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {props.user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Text fontWeight="bold" color="black">
                    Welcome, {props.user.userName}
                  </Text>
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <p>{props.user.userName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleBookMarks}>Bookmarks</MenuItem>
                  <MenuItem onClick={handleMealPlan}>Meal Plan</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Text fontWeight="normal" color="black">
                Login to see your favorite recipes!
              </Text>
            )}
       </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
