import React from "react";
import {
  Box,
  HStack,
  Text,
  Input,
  InputGroup,
  Button,
  VStack,
  Textarea,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Select,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";

const AddRecipe = () => {
  const [recipe, setRecipe] = React.useState({
    recipeName: "",
    cookingTime: 0,
    dietType: "",
    recipeRating: 0,
    cuisine: "",
    recipeURL: "",
    imageURL: "",
    instructions: "",
    ingredients: [],
    restaurants: [],
    locations: [],
  });

  const [alert, setAlert] = React.useState({
    isOpen: false,
    message: "",
    status: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [ingredientInput, setIngredientInput] = React.useState(""); // State for ingredient input
  const [restaurantInput, setRestaurantInput] = React.useState(""); // State for restaurant input
  const [locationInput, setLocationInput] = React.useState(""); // State for location input

  const handleChange = (event) => {
    const { id, value } = event.target;
    setRecipe((prevValue) => ({ ...prevValue, [id]: value }));
  };

  const handleRatingChange = (value) => {
    setRecipe((prevValue) => ({ ...prevValue, recipeRating: value }));
  };

  const addIngredient = () => {
    if (ingredientInput) {
      setRecipe((prevValue) => ({
        ...prevValue,
        ingredients: [...prevValue.ingredients, ingredientInput],
      }));
      setIngredientInput(""); // Clear the input after adding
    }
  };

  const addRestaurant = () => {
    if (restaurantInput) {
      setRecipe((prevValue) => ({
        ...prevValue,
        restaurants: [...prevValue.restaurants, restaurantInput],
      }));
      setRestaurantInput(""); // Clear the input after adding
    }
  };

  const addLocation = () => {
    if (locationInput) {
      setRecipe((prevValue) => ({
        ...prevValue,
        locations: [...prevValue.locations, locationInput],
      }));
      setLocationInput(""); // Clear the input after adding
    }
  };

  const addRecipe = () => {
    // Validate that the recipe name is not empty
    if (!recipe.recipeName) {
      onOpen(); // Open the alert dialog if the recipe name is empty
      return;
    }

    recipeDB
      .post("/recipes/addRecipe", recipe)
      .then((res) => {
        setAlert({ isOpen: true, message: "Recipe Added!", status: "success" });
        // Clear all fields
        setRecipe({
          recipeName: "",
          cookingTime: 0,
          dietType: "",
          recipeRating: 0,
          cuisine: "",
          recipeURL: "",
          imageURL: "",
          instructions: "",
          ingredients: [],
          restaurants: [],
          locations: [],
        });
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          isOpen: true,
          message: "Failed to add recipe. Please try again.",
          status: "error",
        });
      });
  };

  const removeIngredient = (ingredient) => {
    setRecipe((prevValue) => ({
      ...prevValue,
      ingredients: prevValue.ingredients.filter((item) => item !== ingredient),
    }));
  };

  const removeRestaurant = (restaurant) => {
    setRecipe((prevValue) => ({
      ...prevValue,
      restaurants: prevValue.restaurants.filter((item) => item !== restaurant),
    }));
  };

  const removeLocation = (location) => {
    setRecipe((prevValue) => ({
      ...prevValue,
      locations: prevValue.locations.filter((item) => item !== location),
    }));
  };

  const cuisineOptions = [
    "Mexican",
    "South Indian",
    "Chinese",
    "Thai",
    "Japanese",
    "Gujarati",
    "North Indian",
    "Lebanese",
    "Mediterranean",
    "Middle East",
    "Italian",
    "Korean",
    "Continental",
    "Greek",
    "Latin",
    "American",
    "Other",
    "Swedish",
    "Latvian",
    "Spanish",
    "Scottish",
    "British",
    "Canadian",
    "Russian",
    "Jewish",
    "Polish",
    "German",
    "French",
    "Hawaiian",
    "Brazilian",
    "Peruvian",
    "Cuban",
    "Tibetan",
    "Salvadorian",
    "Egyptian",
    "Belgian",
    "Irish",
    "Welsh",
    "Mormon",
    "Cajun",
    "Portuguese",
    "Turkish",
    "Haitian",
    "Tahitian",
    "Kenyan",
    "Algerian",
    "Nigerian",
    "Libyan",
  ];

  const dietOptions = ["No Restrictions", "Vegetarian", "Vegan", "Pescatarian"];

  return (
    <Box
      borderRadius={"lg"}
      border='2px'
      boxShadow={"lg"}
      borderColor={"gray.100"}
      fontFamily='Arial, sans-serif'
      m={"auto"}
      marginTop={10}
      width={"50%"}
      p={5}
    >
      <Text fontSize={"3xl"} textAlign={"center"} fontWeight={"bold"}>
        Add New Recipe
      </Text>

      {alert.isOpen && (
        <Alert status={alert.status} mb={4}>
          <AlertIcon />
          <AlertTitle>{alert.message}</AlertTitle>
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            onClick={() => setAlert({ ...alert, isOpen: false })}
          />
        </Alert>
      )}

      <VStack spacing={"5"} alignItems={"flex-start"}>
        <HStack spacing={"5"}>
          <Box width={"100%"}>
            <FormLabel htmlFor='recipeName'>Recipe Name</FormLabel>
            <Input
              type={"text"}
              id='recipeName'
              onChange={handleChange}
              value={recipe.recipeName}
            />
          </Box>
          <Box width={"100%"}>
            <FormLabel htmlFor='cookingTime'>Cooking Time (mins)</FormLabel>
            <Input
              type={"number"}
              id='cookingTime'
              onChange={handleChange}
              value={recipe.cookingTime}
            />
          </Box>
        </HStack>
        <HStack spacing={"5"}>
          <Box width={"100%"}>
            <FormLabel htmlFor='dietType'>Diet Type</FormLabel>
            <Select
              id='dietType'
              onChange={handleChange}
              value={recipe.dietType}
            >
              <option value=''>Select Diet Type</option>
              {dietOptions.map((dietType, index) => (
                <option key={index} value={dietType}>
                  {dietType}
                </option>
              ))}
            </Select>
          </Box>
          <Box width={"100%"}>
            <FormLabel htmlFor='recipeRating'>Recipe Rating</FormLabel>
            <Slider
              id='recipeRating'
              value={recipe.recipeRating}
              min={0}
              max={5}
              step={0.5}
              onChange={handleRatingChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
            <Text>Rating: {recipe.recipeRating} / 5</Text>
          </Box>
          <Box width={"100%"}>
            <FormLabel htmlFor='cuisine'>Cuisine</FormLabel>
            <Select id='cuisine' onChange={handleChange} value={recipe.cuisine}>
              <option value=''>Select Cuisine</option>
              {cuisineOptions.map((cuisine, index) => (
                <option key={index} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </Select>
          </Box>
        </HStack>
        <HStack spacing={"5"}>
          <Box width={"100%"}>
            <FormLabel htmlFor='recipeURL'>Recipe URL</FormLabel>
            <Input
              type={"URL"}
              id='recipeURL'
              onChange={handleChange}
              value={recipe.recipeURL}
            />
          </Box>
          <Box width={"100%"}>
            <FormLabel htmlFor='imageURL'>Image URL</FormLabel>
            <Input
              type={"URL"}
              id='imageURL'
              onChange={handleChange}
              value={recipe.imageURL}
            />
          </Box>
        </HStack>

        {/* Ingredients Input Handler */}
        <HStack spacing={2} width={"100%"}>
          <InputGroup variant={"filled"} width={"100%"}>
            <FormLabel htmlFor='ingredientInput' mb={0}>
              Ingredients
            </FormLabel>
            <Input
              type={"text"}
              id='ingredientInput'
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              placeholder='Enter an ingredient'
            />
            <Button onClick={addIngredient} colorScheme='green'>
              Add Ingredient
            </Button>
          </InputGroup>
          <HStack spacing={2}>
            {recipe.ingredients.map((ingredient) => (
              <Badge
                key={ingredient}
                m={1}
                _hover={{ cursor: "pointer" }}
                onClick={() => removeIngredient(ingredient)}
                colorScheme='green'
              >
                {ingredient}
              </Badge>
            ))}
          </HStack>
        </HStack>

        {/* Restaurants Input Handler */}
        <HStack spacing={2} width={"100%"}>
          <InputGroup variant={"filled"} width={"100%"}>
            <FormLabel htmlFor='restaurantInput' mb={0}>
              Restaurants
            </FormLabel>
            <Input
              type={"text"}
              id='restaurantInput'
              value={restaurantInput}
              onChange={(e) => setRestaurantInput(e.target.value)}
              placeholder='Enter a restaurant'
            />
            <Button onClick={addRestaurant} colorScheme='green'>
              Add Restaurant
            </Button>
          </InputGroup>
          <HStack spacing={2}>
            {recipe.restaurants.map((restaurant) => (
              <Badge
                key={restaurant}
                m={1}
                _hover={{ cursor: "pointer" }}
                onClick={() => removeRestaurant(restaurant)}
                colorScheme='green'
              >
                {restaurant}
              </Badge>
            ))}
          </HStack>
        </HStack>

        {/* Locations Input Handler */}
        <HStack spacing={2} width={"100%"}>
          <InputGroup variant={"filled"} width={"100%"}>
            <FormLabel htmlFor='locationInput' mb={0}>
              Locations
            </FormLabel>
            <Input
              type={"text"}
              id='locationInput'
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder='Enter a location'
            />
            <Button onClick={addLocation} colorScheme='green'>
              Add Location
            </Button>
          </InputGroup>
          <HStack spacing={2}>
            {recipe.locations.map((location) => (
              <Badge
                key={location}
                m={1}
                _hover={{ cursor: "pointer" }}
                onClick={() => removeLocation(location)}
                colorScheme='green'
              >
                {location}
              </Badge>
            ))}
          </HStack>
        </HStack>

        <Box width={"100%"}>
          <FormLabel htmlFor='instructions'>Instructions</FormLabel>
          <Textarea
            id='instructions'
            onChange={handleChange}
            value={recipe.instructions}
          />
        </Box>
        <Button onClick={addRecipe} colorScheme='blue'>
          Add Recipe
        </Button>
      </VStack>

      {/* Alert Dialog for Empty Recipe Name */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Empty Recipe Name
            </AlertDialogHeader>

            <AlertDialogBody>
              Please enter a recipe name before adding the recipe.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AddRecipe;
