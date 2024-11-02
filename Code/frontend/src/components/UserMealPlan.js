/**
 * UserMealPlan Component
 *
 * This component displays the user's meal plan and bookmarks. It retrieves
 * the meal plan and bookmarked recipes from the backend using the user's
 * username stored in local storage. It allows the user to view their meal
 * plan, add recipes to the plan through a modal, and navigate back to the
 * home page.
 *
 * Props:
 * - user: An object containing user information, including userName.
 * - handleProfileView: A function to navigate back to the home page.
 *
 * State:
 * - mealPlan: An object representing the user's meal plan fetched from the API.
 * - bookmarks: An array of bookmarked recipes fetched from the API.
 * - refresh: A boolean flag to trigger re-fetching of meal plan and bookmarks.
 *
 * Effects:
 * - The component fetches the meal plan and bookmarks from the API when it mounts
 *   or when the `refresh` state changes.
 *
 * Methods:
 * - handleClick: Calls the function to navigate to the home page.
 * - updateMealPlan: Toggles the `refresh` state to re-fetch data.
 *
 * Render:
 * - Displays the meal plan heading, a modal to add recipes, a button to navigate
 *   to the home page, and a list of recipes in the meal plan.
 */

import { useEffect, useState } from "react";
import { Heading, Flex, Button, Spacer } from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";
import MealPlanRecipeList from "./MealPlanRecipeList";
import AddToPlanModal from "./AddToPlanModal";

const UserMealPlan = (props) => {
  const [mealPlan, setMealPlan] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const plan = recipeDB.get("/recipes/mealPlan", {
      params: {
        userName: localStorage.getItem("userName"),
      },
    });
    plan.then((res) => {
      console.log(res);
      if (res.data) {
        setMealPlan(res.data);
      }
    });
    const bks = recipeDB.get("/recipes/getBookmarks", {
      params: {
        userName: localStorage.getItem("userName"),
      },
    });
    bks.then((res) => {
      if (res.data) {
        console.log(res.data);
        setBookmarks(res.data.bookmarks);
      }
    });
  }, [refresh]);
  const handleClick = () => {
    props.handleProfileView();
  };
  const updateMealPlan = () => {
    setRefresh(!refresh);
  };
  return (
    <>
      <Flex>
        <Heading size={"md"} ml={10} mr={10}>
          Meal Plan for {props.user.userName}
        </Heading>
        <AddToPlanModal
          day={""}
          text={true}
          bookmarks={bookmarks}
          updateMealPlan={updateMealPlan}
        ></AddToPlanModal>
        <Spacer />
        <Button onClick={handleClick} mr={10}>
          Go to HomePage
        </Button>
      </Flex>
      <MealPlanRecipeList
        mealPlan={mealPlan}
        bookmarks={bookmarks}
        updateMealPlan={updateMealPlan}
      />
    </>
  );
};

export default UserMealPlan;
