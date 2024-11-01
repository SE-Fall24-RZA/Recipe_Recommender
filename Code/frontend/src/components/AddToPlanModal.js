/**
 * MiniRecipeCard Component
 *
 * This component displays a summary card for a recipe, including the recipe name,
 * cooking time, rating, and diet type. It highlights the selected recipe and
 * allows users to click on it to select a recipe for addition to a meal plan.
 *
 * Features:
 * - Displays the recipe name, cooking time, rating, and diet type.
 * - Changes background color when selected.
 * - On click, sets the selected recipe in the parent component.
 *
 * Props:
 * - recipe (Object): The recipe object containing details such as name, cooking time,
 *   rating, and diet type.
 * - selectedRecipe (string): The ID of the currently selected recipe.
 * - setRecipe (function): A function to update the selected recipe in the parent component.
 *
 * @returns {JSX.Element} The rendered MiniRecipeCard component.
 */

/**
 * AddToPlanModal Component
 *
 * This component provides a modal interface for adding a selected recipe from bookmarks
 * to a user's meal plan for a specific day. It displays a list of bookmarked recipes
 * and allows users to choose a day for the meal plan.
 *
 * Features:
 * - Displays a list of bookmarked recipes as MiniRecipeCard components.
 * - Allows the user to select a day of the week for adding the meal.
 * - Submits the selected recipe and day to the meal plan.
 * - Includes buttons for opening the modal and adding to the meal plan.
 *
 * State Management:
 * - `isOpen` (boolean): Manages the visibility of the modal.
 * - `day` (string): Stores the selected day for the meal plan.
 * - `recipeToAdd` (string): Stores the ID of the recipe selected for addition.
 *
 * Functions:
 * - `onClose`: Resets state and closes the modal.
 * - `addToMealPlan`: Sends a request to add the selected recipe to the meal plan.
 * - `TextButton`: Renders a button for opening the modal with text.
 * - `PlusButton`: Renders a button for opening the modal with a plus sign.
 *
 * Props:
 * - bookmarks (Array): An array of bookmarked recipes to display in the modal.
 * - day (string): The initial day selected for adding the meal plan.
 * - updateMealPlan (function): A function to refresh the meal plan after adding a recipe.
 * - text (boolean): A flag to determine which button to render for opening the modal.
 *
 * @returns {JSX.Element} The rendered AddToPlanModal component.
 */

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Heading,
  Box,
  SimpleGrid,
  Text,
  Card,
  CardHeader,
  CardBody,
  Image,
  Select,
  Spacer,
} from "@chakra-ui/react";
import Rating from "./Rating";
import recipeDB from "../apis/recipeDB";

const MiniRecipeCard = (props) => {
  const color =
    props.recipe["_id"] === props.selectedRecipe ? "green.100" : null;
  const handleClick = () => {
    props.setRecipe(props.recipe["_id"]);
    console.log(props.recipe["_id"]);
    console.log(color);
  };
  return (
    <Card
      data-testid='recipeCard'
      borderRadius='md'
      boxShadow='lg'
      bgColor={color || ""}
      _hover={{
        transform: "scale(1.05)",
        bg: color || "lightgray.700",
        transitionDuration: "0.2s",
      }}
      transition='0.2s'
      my={0}
      mb={4}
      px={1}
      onClick={() => handleClick()}
    >
      <CardHeader>
        <Heading
          data-testid='recipeName'
          size='md'
          textAlign='center'
          color='teal.600'
        >
          {props.recipe.TranslatedRecipeName}
        </Heading>
      </CardHeader>
      <CardBody py={1} px={1}>
        <Text data-testid='time' fontWeight='bold' mb={1}>
          Cooking Time: {props.recipe.TotalTimeInMins} mins
        </Text>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          mb={1}
          flexWrap='wrap'
          px={0}
          widht='100%'
        >
          <Box width={["100%, 100%, 100%", "100%", "100%", "auto"]}>
            <Text data-testid='rating' fontWeight='bold'>
              Rating:
              {/* {props.recipe["Recipe-rating"]} */}
            </Text>
          </Box>
          <Rating rating={props.recipe["Recipe-rating"]}></Rating>
        </Box>
        <Text data-testid='diet' fontWeight='bold' mb={2}>
          Diet Type: {props.recipe["Diet-type"]}
        </Text>
      </CardBody>
    </Card>
  );
};

const AddToPlanModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState(props.day);
  const [recipeToAdd, setRecipeToAdd] = useState(null);
  const onClose = () => {
    setRecipeToAdd(null);
    setDay(props.day);
    setIsOpen(false);
  };

  const addToMealPlan = () => {
    const requestBody = {
      userName: localStorage.getItem("userName"),
      recipeID: recipeToAdd,
      weekDay: day,
    };
    recipeDB.put("/recipes/mealPlan", requestBody).then((res) => {
      setIsOpen(false);
      props.updateMealPlan();
    });
  };

  const TextButton = () => {
    return <Button onClick={() => setIsOpen(true)}>Add from Bookmarks</Button>;
  };
  const PlusButton = () => {
    return (
      <Box
        as='button'
        onClick={() => setIsOpen(true)}
        variant='ghost'
        size='lg'
        bgColor='transparent'
      >
        <Heading color='teal.600' _hover={{ color: "black" }}>
          +
        </Heading>
      </Box>
    );
  };

  return (
    <>
      {props.text ? <TextButton /> : <PlusButton />}
      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-testid='addToPlanModal'>
          <ModalHeader>Add to Meal Plan from Bookmarks</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid
              spacing={5}
              templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
            >
              {props.bookmarks && props.bookmarks.length !== 0 ? (
                props.bookmarks.map((recipe) => (
                  <MiniRecipeCard
                    key={recipe.id || recipe.TranslatedRecipeName} // Use a unique identifier as key
                    recipe={recipe}
                    setRecipe={setRecipeToAdd}
                    selectedRecipe={recipeToAdd}
                  />
                ))
              ) : (
                <Text
                  data-testid='noResponseText'
                  fontSize={"lg"}
                  color={"gray"}
                >
                  No bookmarks available.
                </Text>
              )}
            </SimpleGrid>
            <Box display='flex' flexDirection='row' alignItems='center' my={6}>
              <Text>Add this meal to which day?</Text>
              <Select
                variant='filled'
                placeholder='Select a day...'
                value={day}
                onChange={(e) => setDay(e.target.value)}
                maxWidth={["50%", "50%", "25%", "25%", "15%"]}
                mx={6}
              >
                <option value='sunday'>Sunday</option>
                <option value='monday'>Monday</option>
                <option value='tuesday'>Tuesday</option>
                <option value='wednesday'>Wednesday</option>
                <option value='thursday'>Thursday</option>
                <option value='friday'>Friday</option>
                <option value='saturday'>Saturday</option>
              </Select>
              <Spacer />
              <Button colorScheme='teal' onClick={() => addToMealPlan()}>
                Add to Meal Plan
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddToPlanModal;
