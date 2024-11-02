/**
 * Nav Component
 *
 * This component renders a navigation bar for the application, including a logo,
 * a welcome message for the user, and options to access bookmarks, meal plans, or log out.
 * It is designed to adjust its appearance based on the user's color mode preference.
 *
 * Features:
 * - Displays a logo and application title ("Saveurs Sélection").
 * - Shows a welcome message to the logged-in user with options to navigate to
 *   bookmarks and meal plans, or to log out.
 * - If no user is logged in, prompts the user to log in to access their favorite recipes.
 * - Uses Chakra UI components for consistent styling and responsiveness.
 *
 * State Management:
 * - This component does not maintain its own state but receives props to manage user interactions
 *   and display information.
 *
 * Functions:
 * - `handleBookMarks()`: Calls the `handleBookMarks` prop function to navigate to the user's bookmarks.
 * - `handleMealPlan()`: Calls the `handleMealPlan` prop function to navigate to the user's meal plan.
 * - `handleLogout()`: Logs the user out by calling the `handleLogout` prop function and logs a message to the console.
 *
 * Props:
 * - user (object): An object representing the logged-in user, including properties such as `userName`.
 * - handleBookMarks (function): A callback function to handle navigating to the bookmarks section.
 * - handleMealPlan (function): A callback function to handle navigating to the meal plan section.
 * - handleLogout (function): A callback function to handle user logout.
 *
 * Rendering:
 * - The component renders a navigation bar with a logo, a heading, and a menu for user options.
 *   The menu displays when a user is logged in, showing the user's name and options for bookmarks, meal plans, and logout.
 * - If the user is not logged in, a prompt to log in is displayed.
 *
 * @returns {JSX.Element} The rendered Nav component, providing a navigation interface
 *                        for the application.
 */

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
