/**
 * SearchByRecipe Component
 *
 * A search input field that allows users to search for recipes by entering a recipe name.
 * When the user clicks the "Search" button, the search term is passed to the parent component
 * via a callback function.
 *
 * Props:
 * @param {Function} sendRecipeData - Callback function that sends the entered recipe name to the parent component.
 *
 * State:
 * @property {string} recipeName - Stores the current value of the recipe name input field.
 *
 * Functions:
 * handleNameChange - Updates the recipeName state with the input field's current value.
 * handleSearchByRecipeClick - Calls the sendRecipeData callback with the entered recipe name.
 *
 * UI Elements:
 * - An input field for entering a recipe name.
 * - A search button that triggers the search when clicked.
 *
 * Example Usage:
 * <SearchByRecipe sendRecipeData={handleSearch} />
 */

/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */

import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import recipeDB from "../apis/recipeDB";

const SearchByRecipe = (props) => {
  const [recipeName, setRecipeName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const handleNameChange = (e) => {
    e.preventDefault();
    setRecipeName(e.target.value);
  };
  const handleSearchByRecipeClick = (e) => {
    e.preventDefault();
    // console.log(recipeName)
    props.sendRecipeData(recipeName);
  };
  return (
    <>
      <Box mr={10} ml={10}>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            placeholder='Enter Recipe Name'
            onChange={handleNameChange}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleSearchByRecipeClick}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  );
};

export default SearchByRecipe;
