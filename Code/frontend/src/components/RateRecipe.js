/**
 * RateRecipe Component
 *
 * This component allows users to rate a recipe using a 5-star rating system.
 * Users can click on the stars to set a rating, which is submitted by clicking the "Rate this Recipe" button.
 * Once submitted, the rating is saved, and a thank-you message replaces the rating interface.
 *
 * Props:
 * @param {Object} recipe - The recipe object containing details of the recipe to be rated, including its unique "_id".
 * @param {Function} setChange - A callback function used to notify the parent component when the recipe rating is updated.
 *
 * State:
 * @property {number} rating - Holds the current rating value selected by the user.
 * @property {boolean} show - Determines whether the rating interface or a thank-you message is displayed.
 *
 * Functions:
 * rateRecipe - Sends the selected rating to the server, hides the rating interface, and triggers the setChange callback.
 *
 * UI Elements:
 * - A 5-star rating system represented by the `Star` subcomponent, where each star can be filled or empty based on the rating.
 * - A button labeled "Rate this Recipe" that submits the selected rating.
 * - A thank-you message displayed after the rating is submitted.
 *
 * Example Usage:
 * <RateRecipe recipe={recipe} setChange={handleRatingChange} />
 *
 * Subcomponent:
 * Star Component:
 * - Represents an individual star in the 5-star rating system.
 * - Props:
 *   @param {number} rating - The current rating value set by the user.
 *   @param {number} index - The position of the star in the rating scale (1-5).
 *   @param {Function} set - A function to update the `rating` state with the selected star value.
 */

import React, { useState } from "react";
import { Image, Box, Button, Text } from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";

const RateRecipe = (props) => {
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(true);

  const rateRecipe = (r) => {
    const body = {
      recipeID: props.recipe["_id"],
      rating: r,
    };
    recipeDB.patch("/recipes/rateRecipe", body).then(() => {
      setShow(false);
      props.setChange(true);
    });
  };

  var stars = [];
  for (var i = 1; i < 6; i++) {
    stars.push(<Star rating={rating} index={i} key={i} set={setRating}></Star>);
  }
  if (show) {
    return (
      <Box display='flex' flexDirection='row' alignItems='center'>
        {stars}
        <Button ml='10px' onClick={() => rateRecipe(rating)}>
          Rate this Recipe
        </Button>
      </Box>
    );
  } else {
    return (
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent={"start"}
        width={"100%"}
      >
        <Text>Thank you for rating!</Text>
      </Box>
    );
  }
};

const Star = (props) => {
  if (props.index <= props.rating) {
    return (
      <Image
        data-testid='recipeRate'
        objectFit='cover'
        width={"3%"}
        height={"3%"}
        src={require("./componentImages/Filled_star_to_rate.png")}
        mx='2px'
        onClick={() => {
          props.set(props.index);
        }}
      ></Image>
    );
  } else {
    return (
      <Image
        data-testid='recipeRate'
        objectFit='cover'
        width={"3%"}
        height={"3%"}
        src={require("./componentImages/Empty_star.png")}
        mx='2px'
        onClick={() => {
          props.set(props.index);
        }}
      ></Image>
    );
  }
};

export default RateRecipe;
