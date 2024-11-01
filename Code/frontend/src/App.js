// Import necessary components and libraries
import Form from "./components/Form.js"; // Form for user input to search for recipes
import Header from "./components/Header"; // Header component for the app
import recipeDB from "./apis/recipeDB"; // API for making requests to the backend
import RecipeList from "./components/RecipeList"; // Component to display the list of recipes
import AddRecipe from "./components/AddRecipe.js"; // Component for adding a new recipe
import React, { Component } from "react"; // React library for creating components
import { Tabs, Tab, TabList, TabPanel, TabPanels, Box } from "@chakra-ui/react"; // Chakra UI components for tab navigation
import RecipeLoading from "./components/RecipeLoading.js"; // Loading indicator for recipes
import Nav from "./components/Navbar.js"; // Navigation bar component
import SearchByRecipe from "./components/SearchByRecipe.js"; // Component for searching recipes by name
import Login from "./components/Login.js"; // Login component for user authentication
import UserProfile from "./components/UserProfile.js"; // Component for displaying user profile
import LandingPage from "./components/LandingPage.js"; // Landing page component shown when user is not logged in
import BookMarksRecipeList from "./components/BookMarksRecipeList"; // Component to display bookmarked recipes
import UserMealPlan from "./components/UserMealPlan.js"; // Component for managing user's meal plans

// Main component of the project
class App extends Component {
  // Constructor for the App Component
  constructor(props) {
    super(props);

    // Initialize state variables for managing app state
    this.state = {
      cuisine: "", // Selected cuisine type for recipe search
      ingredients: new Set(), // Set of ingredients selected by the user
      recipeList: [], // List of recipes fetched based on user input
      recipeByNameList: [], // List of recipes fetched by name
      searchName: "", // Name of the recipe being searched
      email: "", // User email
      flag: false, // Flag to indicate some condition in the form
      isLoading: false, // Loading state for fetching data
      isLoggedIn: false, // User authentication state
      isProfileView: false, // State to toggle profile view
      isMealPlanView: false, // State to toggle meal plan view
      userData: {
        bookmarks: [], // List of user bookmarks
      },
    };
  }

  // Function to handle switching to bookmarks view
  handleBookMarks = () => {
    this.setState({
      isProfileView: true,
      isMealPlanView: false,
    });
  };

  // Function to handle switching to meal plan view
  handleMealPlan = () => {
    this.setState({
      isProfileView: false,
      isMealPlanView: true,
    });
  };

  // Function to reset profile and meal plan views
  handleProfileView = () => {
    this.setState({
      isProfileView: false,
      isMealPlanView: false,
    });
  };

  // Function to handle user signup
  handleSignup = async (userName, password) => {
    try {
      const response = await recipeDB.post("/recipes/signup", {
        userName,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        alert("Successfully Signed up!");
        this.setState({
          isLoggedIn: true,
          userData: response.data.user, // Set user data from response
        });
        localStorage.setItem("userName", response.data.user.userName); // Store username in local storage
        console.log(response.data.user);
      } else {
        alert("User already exists"); // Handle case where user already exists
      }
    } catch (err) {
      console.log(err); // Log any errors during signup
    }
  };

  // Function to handle user login
  handleLogin = async (userName, password) => {
    try {
      const response = await recipeDB.get("/recipes/login", {
        params: {
          userName,
          password,
        },
      });

      if (response.data.success) {
        this.setState({
          isLoggedIn: true, // Set logged-in state
          userData: response.data.user, // Set user data from response
        });
        localStorage.setItem("userName", response.data.user.userName); // Store username in local storage
        alert("Successfully logged in!"); // Alert user of successful login
      } else {
        const errorMessage = response.data.message || "An error occurred"; // Get error message
        console.log(errorMessage);
        alert(errorMessage); // Display specific message based on response
      }
    } catch (err) {
      console.log("An error occurred:", err);
      alert(
        "An error occurred while trying to log in. Please try again later."
      ); // Handle errors during login
    }
  };

  // Function to get user input from the Form component on submit action
  handleSubmit = async (formDict) => {
    this.setState({
      isLoading: true, // Set loading state while fetching recipes
    });
    console.log(formDict);
    this.setState({
      ingredients: formDict["ingredient"], // Update ingredients in state
      cuisine: formDict["cuisine"], // Update cuisine in state
      email: formDict["email_id"], // Update email in state
      flag: formDict["flag"], // Update flag in state
    });

    const mail = formDict["email_id"];
    const flag = formDict["flag"];
    const items = Array.from(formDict["ingredient"]); // Convert Set to Array for API call
    const cuis = formDict["cuisine"];
    this.getRecipeDetails(items, cuis, mail, flag); // Fetch recipes based on user input
  };

  // Function to search for recipes by name
  handleRecipesByName = (recipeName) => {
    this.setState({
      isLoading: true, // Set loading state while fetching recipes
      searchName: recipeName, // Update search name in state
    });
    recipeDB
      .get("/recipes/getRecipeByName", {
        params: {
          recipeName: recipeName,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          recipeByNameList: res.data.recipes, // Update recipes found by name in state
          isLoading: false, // Set loading state to false
        });
      });
  };

  // Function to get recipes based on ingredients, cuisine, email, and flag
  getRecipeDetails = async (ingredient, cuis, mail, flag) => {
    try {
      const response = await recipeDB.get("/recipes", {
        params: {
          CleanedIngredients: ingredient,
          Cuisine: cuis,
          Email: mail,
          Flag: flag,
        },
      });
      this.setState({
        recipeList: response.data.recipes, // Update recipe list with fetched data
        isLoading: false, // Set loading state to false
      });
    } catch (err) {
      console.log(err); // Log any errors during recipe fetching
    }
  };

  // Function to handle user logout
  handleLogout = () => {
    console.log("logged out");
    this.setState({
      isLoggedIn: false, // Reset logged-in state
      userData: {}, // Clear user data
    });
  };

  // Function to handle fetching bookmarks when navigating to profile view
  handleBookMarks = async () => {
    const userName = localStorage.getItem("userName"); // Get username from local storage
    try {
      const response = await recipeDB.get("/recipes/getBookmarks", {
        params: { userName },
      });
      this.setState({
        isProfileView: true, // Set profile view to true
        userData: {
          ...this.state.userData,
          bookmarks: response.data.recipes, // Set fetched bookmarks to state
        },
      });
    } catch (err) {
      console.error("Error fetching bookmarks", err); // Log errors fetching bookmarks
    }
  };

  // Function to remove a bookmark
  handleRemoveBookmark = async (recipeId) => {
    const userName = localStorage.getItem("userName"); // Get username from local storage

    try {
      const response = await recipeDB.post("/recipes/removeBookmark", {
        userName,
        recipeId,
      });

      if (response.data.success) {
        this.setState((prevState) => ({
          userData: {
            ...prevState.userData,
            bookmarks: prevState.userData.bookmarks.filter(
              (recipe) => (recipe.id || recipe._id) !== recipeId // Remove based on recipeId
            ),
          },
        }));
      } else {
        throw new Error(response.data.message || "Failed to remove bookmark");
      }
    } catch (error) {
      console.error("Failed to remove bookmark:", error); // Log errors during bookmark removal
    }
  };

  // Function to edit a recipe
  editRecipe = async (recipeId, updatedData) => {
    try {
      const response = await recipeDB.put(
        `/recipes/updateRecipe/${recipeId}`,
        updatedData
      );
      if (response.status === 200) {
        alert("Recipe updated successfully!"); // Alert user on successful update
        // Refresh the recipes list or a specific recipe if needed
        this.setState((prevState) => ({
          recipeList: prevState.recipeList.map(
            (recipe) =>
              recipe._id === recipeId ? { ...recipe, ...updatedData } : recipe // Update recipe data in state
          ),
          recipeByNameList: prevState.recipeByNameList.map(
            (recipe) =>
              recipe._id === recipeId ? { ...recipe, ...updatedData } : recipe // Update recipe data in state
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to update recipe:", error); // Log errors during recipe update
      alert("Error updating the recipe. Please try again."); // Alert user on error
    }
  };

  // Function to reset profile and meal plan views
  handleProfileView = () => {
    this.setState({
      isProfileView: false,
      isMealPlanView: false,
    });
  };

  // Render method to display the component
  render() {
    return (
      <div>
        <Nav
          handleLogout={this.handleLogout} // Logout function passed to Nav
          handleBookMarks={this.handleBookMarks} // Bookmarks function passed to Nav
          handleMealPlan={this.handleMealPlan} // Meal plan function passed to Nav
          user={this.state.isLoggedIn ? this.state.userData : null} // Pass user data if logged in
          onLoginClick={() => this.setState({ isLoggedIn: false })} // Handle login click
        />
        {this.state.isLoggedIn ? ( // Conditional rendering based on login state
          <>
            {this.state.isProfileView ? ( // Render UserProfile if in profile view
              <UserProfile
                handleProfileView={this.handleProfileView}
                user={this.state.userData}
              >
                {}
                <BookMarksRecipeList
                  recipes={this.state.userData.bookmarks} // Pass bookmarks to BookMarksRecipeList
                />
              </UserProfile>
            ) : this.state.isMealPlanView ? ( // Render UserMealPlan if in meal plan view
              <UserMealPlan
                handleProfileView={this.handleProfileView}
                user={this.state.userData}
              ></UserMealPlan>
            ) : (
              // Render tabs for recipe searching and adding
              <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList ml={10}>
                  <Tab>Search Recipe</Tab>
                  <Tab>Add Recipe</Tab>
                  <Tab>Search Recipe By Name</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box display='flex'>
                      <Form sendFormData={this.handleSubmit} />
                      {this.state.isLoading ? ( // Conditional rendering of loading state
                        <RecipeLoading /> // Show loading indicator if loading
                      ) : (
                        <RecipeList
                          recipes={this.state.recipeList} // Pass fetched recipes to RecipeList
                          editRecipe={this.editRecipe} // Pass edit function to RecipeList
                        />
                      )}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <AddRecipe />
                  </TabPanel>
                  <TabPanel>
                    <SearchByRecipe sendRecipeData={this.handleRecipesByName} />{" "}
                    {this.state.isLoading ? ( // Conditional rendering of loading state
                      <RecipeLoading /> // Show loading indicator if loading
                    ) : (
                      <RecipeList
                        recipes={this.state.recipeByNameList} // Pass fetched recipes by name to RecipeList
                        refresh={this.handleRecipesByName} // Pass refresh function to RecipeList
                        searchName={this.state.searchName} // Pass search name to RecipeList
                      />
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </>
        ) : (
          <>
            {this.state.showLogin ? ( // Show Login component if showLogin state is true
              <Login
                handleSignup={this.handleSignup} // Pass signup function to Login
                handleLogin={this.handleLogin} // Pass login function to Login
              />
            ) : (
              <LandingPage
                onGetStarted={() => this.setState({ showLogin: true })} // Show LandingPage and handle getting started
              />
            )}
          </>
        )}
      </div>
    );
  }
}

export default App; // Export the App component as the default export
