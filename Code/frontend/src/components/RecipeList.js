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
import RecipeCard from "./RecipeCard";
import Rating from "./Rating";
import RateRecipe from "./RateRecipe";

// Component to handle all the recipes
const RecipeList = ({ recipes, refresh, searchName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [isChange, setIsChange] = useState(false);
  const youtube_videos =
    "https://www.youtube.com/results?search_query=how+to+make+" +
    currentRecipe["TranslatedRecipeName"];

  const handleViewRecipe = (data) => {
    setIsOpen(true);
    setCurrentRecipe(data);
  };

  const onClose = () => {
    setIsOpen(false);
    setCurrentRecipe({});
    if (isChange) {
      refresh(searchName);
    }
  };

  return (
    <>
      <Box
        borderRadius={"lg"}
        border='1px'
        boxShadow='lg'
        borderColor='gray.200'
        fontFamily='sans-serif'
        m={10}
        width={"80%"}
        p={5}
        bg='white'
      >
        <Text fontSize='2xl' fontWeight='bold' mb={5} textAlign='center'>
          Recipe Collection
        </Text>
        <SimpleGrid
          spacing={5}
          templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
        >
          {recipes.length !== 0 ? (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                handler={handleViewRecipe}
                recipe={recipe}
              />
            ))
          ) : (
            <Text data-testid='noResponseText' fontSize={"lg"} color={"gray"}>
              Searching for a recipe?
            </Text>
          )}
        </SimpleGrid>
      </Box>
      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-testid='recipeModal'>
          <ModalHeader fontSize='xl' fontWeight='bold'>
            {currentRecipe.TranslatedRecipeName || "Recipe Details"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align='flex-start' mb={4}>
              <Avatar
                size='2xl'
                mr={4}
                src={currentRecipe["image-url"]}
                borderRadius='md'
              />
              <Box flex='1'>
                <Text fontSize='lg' fontWeight='bold' mb={1}>
                  Cooking Time: {currentRecipe.TotalTimeInMins} mins
                </Text>
                <Flex align='center' mb={2}>
                  <Text fontWeight='bold' mr={2}>
                    Rating:
                  </Text>
                  <Rating rating={currentRecipe["Recipe-rating"]} />
                </Flex>
                <Text mb={2}>
                  <Text as={"b"}>Diet Type:</Text> {currentRecipe["Diet-type"]}
                </Text>
                <Text mb={2}>
                  <Text as={"b"}>Cuisine:</Text> {currentRecipe["Cuisine"]}
                </Text>
                <Text mb={2}>
                  <Text as={"b"}>Ingredients:</Text>{" "}
                  {currentRecipe["Ingredients"]?.join(", ")}
                </Text>
                <Text mb={2}>
                  <Text as={"b"}>Instructions:</Text>{" "}
                  {currentRecipe["TranslatedInstructions"]}
                </Text>
                <Text color='blue.500'>
                  <a
                    href={youtube_videos}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Watch on YouTube for more recipes
                  </a>
                </Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <RateRecipe recipe={currentRecipe} setChange={setIsChange} />
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecipeList;
