/**
 * Form Component
 *
 * This component allows users to input their preferences for recipe search.
 * Users can add ingredients, select a cuisine type, and provide their email
 * address to receive alerts. The component also features a TypeAhead dropdown
 * for ingredient selection and dynamically displays added ingredients as badges.
 *
 * Features:
 * - Input field for entering ingredients with an option to add them to a list.
 * - Dropdown menu to select a cuisine type from a predefined list.
 * - Email input field for users to receive alerts about recipe suggestions.
 * - A switch to enable or disable email alerts.
 *
 * State Management:
 * - Uses `state` to manage ingredients (stored in a Set to ensure uniqueness),
 *   selected cuisine, and lists of available ingredients and cuisines.
 *
 * Lifecycle Methods:
 * - `componentDidMount`: Fetches a list of available ingredients from an API
 *   and initializes a predefined list of cuisines.
 *
 * Functions:
 * - `printHander`: Renders a list of badges for added ingredients, allowing
 *   users to click on a badge to remove it.
 * - `addHandler`: Adds an ingredient to the state and clears the input field.
 * - `removeHandler`: Removes an ingredient from the state when a badge is clicked.
 * - `handleSubmit`: Constructs an object with user inputs and triggers a callback
 *   to send this data to a parent component.
 * - `handleCuisineChange`: Updates the selected cuisine in the state based on user
 *   selection from the dropdown.
 *
 * Props:
 * - sendFormData (function): A callback function passed from the parent component
 *   to handle the submission of form data.
 *
 * @returns {JSX.Element} The rendered Form component, which includes input fields
 *                         for ingredients, cuisine selection, email input,
 *                         and a button to submit the form.
 */

import React, { Component } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Switch,
  VStack,
  HStack,
  Text,
  FormLabel,
  Badge,
  Select,
} from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";
import TypeAheadDropDown from "./TypeAheadDropDown";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: new Set(),
      cuisine: "",
      recipeName: "",
      ingredient_list: [],
      cuisine_list: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await recipeDB.get("/recipes/callIngredients/");
      this.setState({
        ingredient_list: response.data,
        cuisine_list: [
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
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }

  printHander = () => {
    const items = [...this.state.ingredients];
    const list_items = items.map((item) => (
      <Badge
        id={item}
        m={1}
        _hover={{ cursor: "pointer" }}
        onClick={this.removeHandler}
        colorScheme='green'
      >
        {item}
      </Badge>
    ));
    return <ul className='addedIngredientList'>{list_items}</ul>;
  };

  addHandler = (event) => {
    const ingredient = document.getElementById("ingredient").value;
    this.setState(
      {
        ingredients: new Set(this.state.ingredients).add(ingredient),
      },
      () => console.log(this.state)
    );
    document.getElementById("ingredient").value = "";
  };

  removeHandler = (event) => {
    console.log("clicked tag");
    const discardIngredient = event.target.id;
    const ingredientList = this.state.ingredients;
    ingredientList.delete(discardIngredient);
    this.setState(
      {
        ingredients: ingredientList,
      },
      () => console.log(this.state)
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const dict = {
      ingredient: this.state.ingredients,
      cuisine: this.state.cuisine,
      email_id: document.getElementById("email_id").value,
      flag: document.getElementById("Send_email").checked,
    };
    this.props.sendFormData(dict);
    console.log(dict);
    document.getElementById("email_id").value = "";
  };

  handleCuisineChange = (event) => {
    this.setState({ cuisine: event.target.value });
  };

  render() {
    return (
      <>
        <Box
          borderRadius={"lg"}
          border='2px'
          boxShadow={"lg"}
          borderColor={"gray.100"}
          fontFamily='sans-serif'
          m={10}
          width={"23%"}
          height='fit-content'
          p={5}
        >
          <VStack spacing={"5"} alignItems={"flex-start"}>
            <Text fontSize={"larger"} fontWeight={"semibold"}>
              Get A Recipe
            </Text>
            <InputGroup variant={"filled"} zIndex={+2}>
              <TypeAheadDropDown
                iteams={this.state.ingredient_list}
                placeholder_inp={"Ingredients"}
                id_inp={"ingredient"}
              />
              <InputRightElement>
                <Button mt={2} mr={2} onClick={this.addHandler}>
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
            <HStack direction='row'>{this.printHander()}</HStack>

            <InputGroup variant={"filled"} zIndex={+1}>
              <Select
                id='cuisine'
                placeholder='Select Cuisine'
                onChange={this.handleCuisineChange}
              >
                {this.state.cuisine_list.length > 0 ? (
                  this.state.cuisine_list.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))
                ) : (
                  <option disabled>No cuisines available</option>
                )}
              </Select>
            </InputGroup>

            <InputGroup variant={"filled"}>
              <Input
                data-testid='email_id'
                type='text'
                id='email_id'
                color={"gray.500"}
                size={"lg"}
                placeholder='Email'
              />
            </InputGroup>
            <InputGroup variant={"filled"}>
              <FormLabel htmlFor='email-alerts' mb='0'>
                Enable email alert?
                <Switch ml={2} id='Send_email' name='email' size='md' />
              </FormLabel>
            </InputGroup>

            <Button
              data-testid='submit'
              id='submit'
              onClick={this.handleSubmit}
              width={"100%"}
              _hover={{ bg: "black", color: "gray.100" }}
              color={"gray.600"}
              bg={"green.300"}
            >
              Search Recipes
            </Button>
          </VStack>
        </Box>
      </>
    );
  }
}

export default Form;
