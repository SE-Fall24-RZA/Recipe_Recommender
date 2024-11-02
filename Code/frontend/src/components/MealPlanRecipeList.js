/**
 * MealPlanRecipeList Component
 *
 * This component displays a list of recipes organized by days of the week for a meal plan.
 * Each day can either show a recipe or an option to add a recipe to the meal plan.
 * It includes a modal to view detailed information about a selected recipe.
 *
 * Features:
 * - Displays recipes for each day in the meal plan.
 * - Allows users to view detailed information about a recipe, including cooking time, rating,
 *   diet type, instructions, and a link to a related YouTube video.
 * - Displays an option to add a recipe to a day in the meal plan if no recipe is currently assigned.
 *
 * State Management:
 * - This component uses React's `useState` hook to manage the visibility of the recipe modal
 *   and the currently selected recipe for viewing.
 *
 * Functions:
 * - `handleViewRecipe(data)`: Sets the current recipe to be viewed in the modal and opens the modal.
 * - `onClose()`: Closes the recipe modal.
 *
 * Props:
 * - mealPlan (object): An object representing the user's meal plan, with days as keys and recipes
 *   as values. Each recipe contains properties such as TranslatedRecipeName, image-url,
 *   TotalTimeInMins, Recipe-rating, and Diet-type.
 * - bookmarks (array): An array of bookmarked recipes that can be added to the meal plan.
 * - updateMealPlan (function): A callback function to refresh the meal plan state when a recipe
 *   is added or removed.
 *
 * Rendering:
 * - The component renders a `Box` containing a `SimpleGrid` layout of `MealPlanRecipeCard`
 *   components for each day of the week. If a day does not have a recipe, it shows an option to
 *   add a recipe instead.
 * - A modal is displayed when a recipe is selected, providing detailed information about the recipe.
 *
 * @returns {JSX.Element} The rendered MealPlanRecipeList component, which includes a grid of
 *                        meal plan recipes and a modal for viewing recipe details.
 */

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
  Heading,
} from "@chakra-ui/react";
import Rating from "./Rating";
import MealPlanRecipeCard from "./MealPlanRecipeCard";
import AddToPlanModal from "./AddToPlanModal";

const MealPlanRecipeList = (props) => {
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

  const plan = [];
  const today = new Date();
  var weekDay = 0;
  for (const day in props.mealPlan) {
    const color = weekDay === today.getDay() ? "lightgray" : "";
    plan.push(
      <Box bgColor={color} p='10px' maxWidth='100%'>
        <Heading
          data-testid='mealPlanDay'
          size='md'
          textAlign='center'
          mb='15px'
        >
          {day.toUpperCase()}
        </Heading>
        {props.mealPlan[day] ? (
          <MealPlanRecipeCard
            recipe={props.mealPlan[day]}
            handler={handleViewRecipe}
            updateMealPlan={props.updateMealPlan}
            day={day}
          ></MealPlanRecipeCard>
        ) : (
          <Box justifySelf='center' mt={5}>
            <AddToPlanModal
              day={day}
              text={false}
              bookmarks={props.bookmarks}
              updateMealPlan={props.updateMealPlan}
            ></AddToPlanModal>
          </Box>
        )}
      </Box>
    );
    weekDay++;
  }

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
        p={1}
        justifySelf={"center"}
      >
        <SimpleGrid
          spacing={1}
          //templateColumns='repeat(auto-fill, minmax(14%, 1fr))'
          templateColumns={["1fr", "1fr", "1fr", "14% 14% 14% 14% 14% 14% 14%"]}
          justifyContent='center'
        >
          {plan}
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
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                  maxHeight='30px'
                  maxWidth={"30%"}
                >
                  <Text as={"b"}>Rating: </Text>{" "}
                  {/* {currentRecipe["Recipe-rating"]} */}
                  <Rating rating={currentRecipe["Recipe-rating"]}></Rating>
                </Box>
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

export default MealPlanRecipeList;
