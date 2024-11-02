/**
 * RecipeCard Component
 *
 * This component renders a recipe card with various details about a recipe,
 * including its image, name, rating, cooking time, and diet type. It also allows
 * users to save the recipe to their profile and displays a success or error toast message
 * based on the outcome.
 *
 * Props:
 * @param {Object} props - The component's props.
 * @param {Object} props.recipe - The recipe object containing all relevant recipe details.
 *                                Fields include:
 *                                - TranslatedRecipeName: {string} - The name of the recipe.
 *                                - "image-url": {string} - URL of the recipe image.
 *                                - TotalTimeInMins: {number} - Total cooking time in minutes.
 *                                - Recipe-rating: {number} - Rating of the recipe.
 *                                - Diet-type: {string} - Dietary type of the recipe (e.g., Vegetarian, Vegan).
 * @param {Function} props.handler - Function to handle clicking the card header, typically to view recipe details.
 *
 * Instance Variables:
 * @const {Function} toast - Function from Chakra UI's `useToast` hook to display toast notifications.
 *
 * Functions:
 * @function handleClick
 * @description Calls `props.handler` with the current recipe, allowing navigation to the recipe details.
 * @returns {void}
 *
 * @function handleSave
 * @description Saves the recipe to the user's profile if logged in. Uses `recipeDB` API to make a POST request
 *              to save the recipe under the current user's profile. Displays a toast on success or failure.
 * @async
 * @returns {Promise<void>} - Shows success or error toast based on the save result.
 *
 * Rendered Output:
 * - Displays a clickable card with recipe details: name, image, rating, cooking time, and diet type.
 * - Includes a `Save Recipe` tag that triggers `handleSave` on click.
 * - The card has hover effects and applies styles based on Chakra UI's styling system.
 *
 * Example Usage:
 * ```
 * <RecipeCard
 *   recipe={{
 *     TranslatedRecipeName: "Pasta",
 *     "image-url": "https://example.com/image.jpg",
 *     TotalTimeInMins: 30,
 *     "Recipe-rating": 4.5,
 *     "Diet-type": "Vegetarian",
 *   }}
 *   handler={(recipe) => console.log("Recipe clicked:", recipe)}
 * />
 * ```
 */

import React from "react";
import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  CardFooter,
  Button,
  Image,
  Tag,
  useToast, // For displaying notifications
} from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";
import Rating from "./Rating";

const RecipeCard = (props) => {
  const toast = useToast();

  const handleClick = () => {
    props.handler(props.recipe);
  };

  const handleSave = async () => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      console.error("No user logged in");
      // Show an error message to the user
      return;
    }

    try {
      console.log("Attempting to save recipe:", props.recipe);
      console.log("User:", userName);

      const response = await recipeDB.post("/recipes/addRecipeToProfile", {
        userName,
        recipe: props.recipe,
      });

      console.log("Save recipe response:", response.data);
      if (response.data.success) {
        // Show success toast
        toast({
          title: "Success",
          description: "Bookmark saved successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(response.data.message || "Failed to save bookmark");
      }
      // Handle successful save
    } catch (error) {
      console.error("Error saving recipe:", error);
      // Show an error message to the user
      toast({
        title: "Error",
        description: error.message || "Failed to save bookmark",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Card
      data-testid='recipeCard'
      borderRadius='md'
      boxShadow='lg'
      _hover={{
        transform: "scale(1.05)",
        bg: "green.100",
        transitionDuration: "0.2s",
        cursor: "pointer",
      }}
      transition='0.2s'
      mb={4}
      p={4}
    >
      <CardHeader onClick={handleClick}>
        <Heading
          data-testid='recipeName'
          size='md'
          textAlign='center'
          color='teal.600'
        >
          {props.recipe.TranslatedRecipeName}
        </Heading>
      </CardHeader>
      <CardBody>
        <Image
          data-testid='recipeImg'
          objectFit='cover'
          src={props.recipe["image-url"]}
          borderRadius='md'
          mb={3}
          fallbackSrc='https://via.placeholder.com/250' // Placeholder for missing images
        />
        <Box display='flex' flexDirection='row' alignItems='center'>
          <Text data-testid='rating'>Rating: </Text>
          <Rating rating={props.recipe["Recipe-rating"]}></Rating>
        </Box>
        <Text data-testid='time' fontWeight='bold' mb={1}>
          Cooking Time: {props.recipe.TotalTimeInMins} mins
        </Text>
        <Text data-testid='rating' fontWeight='bold' mb={1}>
          Rating: {props.recipe["Recipe-rating"]}
        </Text>
        <Text data-testid='diet' fontWeight='bold' mb={2}>
          Diet Type: {props.recipe["Diet-type"]}
        </Text>
        <Tag
          onClick={handleSave}
          colorScheme='teal'
          variant='solid'
          cursor='pointer'
          mt={2}
        >
          Save Recipe
        </Tag>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
