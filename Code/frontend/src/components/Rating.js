/**
 * Rating Component
 *
 * This component displays a visual representation of a recipe's rating using a star-based system.
 * It supports displaying filled, half-filled, and empty stars based on the provided rating value.
 *
 * Props:
 * @param {number} rating - A numerical value (0-5) representing the rating, which can include decimal values for half-stars.
 *
 * Computed Values:
 * - `rate`: The integer part of the rating, representing the number of filled stars.
 * - `partial`: The decimal part of the rating, used to determine if a half-filled star should be displayed.
 * - `stars`: An array of star images to render, populated based on the rating value.
 *
 * Star Types:
 * - Filled star: Shown for each full point in the rating.
 * - Half star: Shown if the rating's decimal is between 0.25 and 0.75.
 * - Empty star: Fills in up to 5 stars if the rating is less than 5.
 *
 * Example Usage:
 * <Rating rating={3.5} />
 *
 * UI Elements:
 * - Displays a total of 5 stars, where filled, half, and empty stars visually represent the rating.
 */

import React from "react";
import { Image, Box } from "@chakra-ui/react";

const Rating = (props) => {
  var rate = Math.floor(Number(props.rating));
  var partial = Number(props.rating) - rate;
  var stars = [];
  for (var i = 0; i < rate; i++) {
    stars.push(
      <Image
        data-testid='recipeRate'
        objectFit='cover'
        width={"10%"}
        height={"10%"}
        src={require("./componentImages/Filled_star.png")}
        key={i}
        mr='2px'
      ></Image>
    );
  }
  if (partial > 0.25 && partial < 0.75) {
    stars.push(
      <Image
        data-testid='recipeRate'
        objectFit='cover'
        width={"10%"}
        height={"10%"}
        src={require("./componentImages/Half_star.png")}
        key={stars.length}
        mr='2px'
      ></Image>
    );
  }
  while (stars.length < 5) {
    stars.push(
      <Image
        data-testid='recipeRate'
        objectFit='cover'
        width={"10%"}
        height={"10%"}
        src={require("./componentImages/Empty_star.png")}
        key={stars.length}
        mr='2px'
      ></Image>
    );
  }
  return stars;
};

export default Rating;
