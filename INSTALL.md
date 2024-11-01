### Installation:

- clone repository using `git clone https://github.com/SE-Fall24-RZA/Recipe_Recommender.git`
- setup for frontend <br>
  open terminal and navigate to the **frontend** folder and execute the following:
  ```
  npm install
  ```
- setup for backend <br>
  open terminal and navigate to the **backend** folder and execute the following:

  ```
  npm install
  ```
- Database Setup
    1) In the **backend** folder, make a copy of the `.env.sample` file, and name it `.env`

    2) Create a free account with MongoDB Atlas at this link: https://www.mongodb.com/products/platform/atlas-database

    3) Create a new free deployment cluster (name it whatever you like).

    4) After the cluster is created, follow along with the setup instructions provided.  Make sure to add a user, and store the provided password somewhere.

    5) Press "Choose a connection method" and then select "Drivers"

    6) Copy the connection string and paste it into the 'RECIPES_DB_URI' value in the `.env` file from step 1.  If necessary, replace <db_password> with the password from step 3.

    7) Press "Done".  On the left side of the screen, click "Database".  Then click on the name of your cluster.  Click on the "Collections" tab.  Create a new database and name it 'recipe_recommender'

    8) Add three collections titled 'user', 'recipe', and 'ingredient_list'.  To add additional collections, hover over the database name, 'recipe_recommender' and press the small plus that appears.

    9) Return to the project's .env file.  Replace the value in the 'GMAIL' field with the email you used to set up the Atlas account

- Ollama Setup (Optional, for chatbot functionality)
    1) Download Ollama for your machine from this link: https://ollama.com/download

    2) Once Ollama is installed, ensure its path is added to your system environment variables, if necessary

    3) Call `ollama run codeqwen`, and wait for the model to download

    ## Execution Steps

1.  start backend server using:
    ```
    npx nodemon
    ```
2.  start frontend server using:
    ```
    npm start
    ```
3.  Automatically a browser window is opened which shows frontend.
4.  run `npm test` for running the tests [Dependencies: Jest, Chai, Supertest]
