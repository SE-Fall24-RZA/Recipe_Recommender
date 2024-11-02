/**
 * Recipe Component
 *
 * This component displays detailed information about an individual recipe,
 * including its ingredients, cooking time, diet type, rating, restaurant options,
 * and instructions. It uses a background image for aesthetic purposes and presents
 * the data in a structured format.
 *
 * Features:
 * - Splits the ingredients into a list format for easier readability.
 * - Displays relevant information about the recipe, such as cooking time,
 *   diet type, and rating.
 * - Shows restaurants associated with the recipe along with their locations.
 * - Provides a link to a YouTube search for videos related to the recipe.
 * - Uses a background image to enhance the visual appeal of the recipe card.
 *
 * Props:
 * - recipe (object): An object containing details about the recipe, which should
 *   include properties like:
 *   - TranslatedRecipeName (string): The name of the recipe.
 *   - Cleaned-Ingredients (string): A comma-separated string of ingredients.
 *   - TranslatedInstructions (string): Instructions for preparing the recipe.
 *   - TotalTimeInMins (number): The total cooking time in minutes.
 *   - Recipe-rating (string): The rating of the recipe.
 *   - Diet-type (string): The dietary classification of the recipe.
 *   - Restaurant (string): A percentage-separated string of restaurant names.
 *   - Restaurant-Location (string): A percentage-separated string of corresponding restaurant locations.
 *   - image-url (string): The URL for an image of the recipe.
 *
 * Rendering:
 * - The component renders a card-style layout containing:
 *   - The recipe name.
 *   - A list of ingredients, cooking time, diet type, recipe rating, and restaurant options.
 *   - The instructions for preparing the dish.
 *   - A link to a YouTube search based on the recipe's name.
 *   - An image representing the recipe.
 *
 * State Management:
 * - This component does not maintain its own state but relies on the props provided
 *   to display recipe details.
 *
 * Example Usage:
 * <Recipe recipe={recipeData} />
 *
 * @returns {JSX.Element} The rendered Recipe component displaying the details of a recipe.
 */

import React from "react";
import "../video.css";
import VideoURL from "./VideoURL";
import background from "./componentImages/bg-card2.jpg";

// Recipe component dealing with individial recipe items
const Recipe = (recipe) => {
  // splitting the ingredients with seperator as a comma
  var ingredients_seperated = recipe.recipe["Cleaned-Ingredients"].split(",");
  var translated_instruction = recipe.recipe["TranslatedInstructions"];
  var cooking_time = recipe.recipe["TotalTimeInMins"];
  var recipe_rating = recipe.recipe["Recipe-rating"];
  var diet_type = recipe.recipe["Diet-type"];
  var restaurant = recipe.recipe["Restaurant"].split("%");
  var location = recipe.recipe["Restaurant-Location"].split("%");
  var restaurant_location = [];
  for (let i = 0; i < restaurant.length; i++) {
    restaurant_location.push(restaurant[i] + ": " + location[i]);
  }
  var youtube_videos =
    "https://www.youtube.com/results?search_query=" +
    recipe.recipe["TranslatedRecipeName"];
  // mapping each ingredient to be displayes as a list item
  ingredients_seperated = ingredients_seperated.map((ingredient) => (
    <li class='recipe_ingredient_item'> {ingredient}</li>
  ));
  restaurant_location = restaurant_location.map((restaurantitem) => (
    <li class='recipe_restaurant_item'> {restaurantitem}</li>
  ));
  <p>{translated_instruction}</p>;

  // returns individual container for each recipe

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className='col-lg-2 pb-1'
      id='resultContainer'
    >
      <div className='card'>
        <div className='card-body'>
          <h2>{recipe.recipe.TranslatedRecipeName}</h2>
          <p className='card.text'>
            <h3>Ingredients: </h3>
            <br />
            <ul class='result_ingredients'> {ingredients_seperated} </ul>
            <h3>Cooking Time (in Mins): </h3>
            <ul class='result_cookingtime'> {cooking_time} </ul>
            <h3>Diet Type: </h3>
            <ul class='result_diettype'> {diet_type} </ul>
            <h3>Recipe Rating: </h3>
            <ul class='result_reciperating'> {recipe_rating} </ul>
            <h3>Restaurants: </h3>
            <br />
            <ul class='result_restaurants'> {restaurant_location} </ul>
            <h3>Instructions: </h3>
            <br />
            <ol class='result_instructions'> {translated_instruction} </ol>
            <h3>Videos: </h3>
            <a href={youtube_videos}> {youtube_videos} </a>
            <br />
            <img
              src={recipe.recipe["image-url"]}
              alt={recipe.recipe.TranslatedRecipeName}
            />
          </p>
          <div className='row'></div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
