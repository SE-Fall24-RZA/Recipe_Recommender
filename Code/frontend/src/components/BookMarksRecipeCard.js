/**
 * BookMarksRecipeCard Component
 *
 * This component displays a card for a bookmarked recipe, including the recipe name,
 * cooking time, rating, diet type, and an image. It allows users to click on the recipe
 * name to view more details and provides a button to remove the bookmark.
 *
 * Features:
 * - Displays the recipe name as a clickable heading.
 * - Shows the cooking time, rating, diet type, and an image of the recipe.
 * - Provides an option to remove the bookmark, with success/error feedback through toasts.
 *
 * State Management:
 * - Uses Chakra UI's `useToast` for displaying feedback messages to the user.
 *
 * Functions:
 * - `handleClick`: Calls the handler function passed via props to perform an action
 *   when the recipe name is clicked.
 * - `handleRemove`: Sends a request to the backend to remove the recipe bookmark
 *   for the user, showing a toast notification upon success or failure.
 *
 * Props:
 * - recipe (Object): The recipe object containing details such as name, cooking time,
 *   rating, diet type, and image URL.
 * - handler (function): A function to handle the action performed when the recipe name
 *   is clicked, typically for displaying recipe details.
 *
 * @returns {JSX.Element} The rendered BookMarksRecipeCard component.
 */

import React from "react";
import {
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  Image,
  Tag,
  useToast,
} from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";

const BookMarksRecipeCard = (props) => {
  const toast = useToast();

  const handleClick = () => {
    // This will be called only when the name is clicked
    props.handler(props.recipe);
  };

  const handleRemove = async () => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      console.error("Username not found in localStorage");
      // Show error toast
      return;
    }

    const recipeId = props.recipe._id || props.recipe.id;

    console.log("Attempting to remove bookmark:", { userName, recipeId });

    try {
      const response = await recipeDB.post("/recipes/removeBookmark", {
        userName,
        recipeId,
      });

      console.log("Remove bookmark response:", response.data);

      if (response.data.success) {
        // Show success toast
        toast({
          title: "Success",
          description: "Bookmark removed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(response.data.message || "Failed to remove bookmark");
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove bookmark",
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
      }}
      transition='0.2s'
      mb={4}
      p={4}
    >
      <CardHeader>
        <Heading
          data-testid='recipeName'
          size='md'
          textAlign='center'
          color='teal.600'
          onClick={handleClick} // Move the click handler to the Heading
          cursor='pointer' // Add pointer cursor to indicate it's clickable
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
          as='a'
          onClick={handleRemove}
          colorScheme='red'
          variant='solid'
          cursor='pointer'
          mt={2}
        >
          Remove Bookmark
        </Tag>
      </CardBody>
    </Card>
  );
};

export default BookMarksRecipeCard;
