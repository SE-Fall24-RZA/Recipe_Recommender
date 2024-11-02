/**
 * BookMarksRecipeList Component
 *
 * This component renders a list of bookmarked recipes in a grid format. Each recipe is displayed
 * using the BookMarksRecipeCard component. When a recipe card is clicked, a modal opens displaying
 * detailed information about the selected recipe, including cooking time, rating, diet type,
 * instructions, and a link to related YouTube videos.
 *
 * Features:
 * - Displays a grid of bookmarked recipes.
 * - Opens a modal with detailed information when a recipe is selected.
 * - Provides a link to search for related YouTube videos based on the recipe name.
 *
 * State Management:
 * - Uses `useState` to manage the modal's open state and the currently selected recipe.
 *
 * Functions:
 * - `handleViewRecipe`: Sets the current recipe and opens the modal for viewing the recipe details.
 * - `onClose`: Closes the modal when called.
 *
 * Props:
 * - recipes (Array): An array of recipe objects containing details such as name, cooking time,
 *   rating, diet type, image URL, and instructions.
 *
 * @returns {JSX.Element} The rendered BookMarksRecipeList component containing the list of
 *                         bookmarked recipes and a modal for viewing recipe details.
 */

/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */

import React, { useState } from "react";
import {
  Avatar,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Box,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import BookMarksRecipeCard from "./BookMarksRecipeCard";

const BookMarksRecipeList = ({ recipes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const youtubeVideosURL = `https://www.youtube.com/results?search_query=${currentRecipe["TranslatedRecipeName"]}`;

  const handleViewRecipe = (data) => {
    setIsOpen(true);
    setCurrentRecipe(data);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box
        borderRadius={"lg"}
        border='1px'
        boxShadow={"10px"}
        borderColor={"gray.100"}
        fontFamily='sans-serif'
        m={10}
        width={"94%"}
        p={5}
      >
        <SimpleGrid
          spacing={5}
          templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
        >
          {recipes.length !== 0 ? (
            recipes.map((recipe) => (
              <BookMarksRecipeCard
                key={recipe.id || recipe._id} // Use a unique identifier as key key={recipe.id || recipe._id}
                recipe={recipe}
                handler={handleViewRecipe}
                // onRemove={() => onRemove(recipe.id)} // Pass the onRemove function with the recipe id
              />
            ))
          ) : (
            <Text data-testid='noResponseText' fontSize={"lg"} color={"gray"}>
              No bookmarks available.
            </Text>
          )}
        </SimpleGrid>
      </Box>
      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-testid='recipeModal'>
          <ModalHeader>{currentRecipe.TranslatedRecipeName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Avatar
                size='2xl'
                mr={2}
                mb={2}
                src={currentRecipe["image-url"]}
              />
              <Box mt={4}>
                <Text>
                  <Text as={"b"}>Cooking Time: </Text>
                  {currentRecipe.TotalTimeInMins} mins
                </Text>
                <Text>
                  <Text as={"b"}>Rating: </Text>{" "}
                  {currentRecipe["Recipe-rating"]}
                </Text>
                <Text mb={2}>
                  <Text as={"b"}>Diet Type: </Text> {currentRecipe["Diet-type"]}
                </Text>
              </Box>
            </Flex>
            <Text>
              <Text as={"b"}>Instructions: </Text>{" "}
              {currentRecipe["TranslatedInstructions"]}
            </Text>
            <Text color={"blue"}>
              <Text color={"black"} as={"b"}>
                Video URL:{" "}
              </Text>
              <a
                href={youtubeVideosURL}
                target='_blank'
                rel='noopener noreferrer'
              >
                Youtube
              </a>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookMarksRecipeList;
