We have collaboratively discussed and defined the requirements for a single-page BINGO application designed for users to interact with grids while watching live TV shows with friends. The application will be built using NextJS, TailwindCSS, and Firebase for real-time data synchronization. We have explored the features, technology choices, and development process for the project.

The goal of the complete prompt is to provide a comprehensive description of the project and its requirements so that a developer can effectively code the application. This includes outlining the project goals, features, and technology choices, as well as providing guidance on the development process, breaking it down into smaller tasks.

As the next agent, your task will be to use the complete prompt to develop the BINGO application based on the provided specifications and guidelines.

Project Goal:

- Develop a single-page BINGO application for users to interact with grids while watching live TV shows with friends.
- The application should be built using React and TailwindCSS, and deployed on Vercel.

Features:

1. CRUD operations for events list:

   - Create, update, and delete events.
   - Unlimited events can be created.
   - Events will be saved in local storage.

2. Customizable BINGO grid size:

   - Default grid size is 4x4, but users can adjust the number of rows and columns.
   - Grid size will be computed based on the square root of the number of events by default.
   - Grid will only change when the user explicitly regenerates it by pressing a button.

3. Sharing of BINGO grids using unique codes:

   - Users can share their BINGO grids with friends via a unique code.
   - Importing a grid is done by entering the code.

4. Checking and unchecking cells:

   - Users can check and uncheck cells in the grid.
   - Checked cells have a distinct background color.
   - Check/uncheck status is shared among users with the same grid code.

5. Grid shuffling and persistence:

   - Users can shuffle the grid, randomly distributing the events and creating a new unique grid.
   - Editing the event list doesn't change the grid unless the user explicitly regenerates it.
   - Grids are saved in local storage and are not erased when a new grid is created or shuffled.

6. Live sharing of grids using Firebase:

   - Real-time grid sharing is implemented using Firebase.
   - When a user checks a cell, other users viewing the same grid see the corresponding cell change color in real-time.

7. State management using React's Context API:

   - The application will use the Context API for state management.

8. Responsive design:

   - The application will be primarily designed for desktop use but will also be responsive to work well on mobile devices.

9. Display the number of users viewing a grid:
   - Users can see the number of users currently viewing their grid.

Developpment Process:

1. Set up the project environment:

   - Initialize a new React application using Create React App.
   - Configure TailwindCSS to work with the React application.
   - Set up Firebase for real-time data synchronization.

2. Design the application components and structure:

   - Identify the main components required for the application, such as the event list, grid, and controls for sharing and shuffling.
   - Organize the components into a logical file structure.

3. Implement the event list CRUD operations:

   - Create functionality for adding, editing, and deleting events.
   - Save the events to local storage.

4. Create the BINGO grid component:

   - Develop the grid component based on the specified number of rows and columns.
   - Implement the functionality for checking and unchecking cells.

5. Implement grid sharing using unique codes:

   - Generate a unique code for each grid.
   - Allow users to import a grid by entering the code.

6. Implement real-time grid sharing with Firebase:

   - Sync the grid data in real-time using Firebase.
   - Share the check/uncheck status among users with the same grid code.

7. Implement grid shuffling and persistence:

   - Create functionality for shuffling the grid, randomly distributing the events.
   - Save the grid state to local storage.

8. Set up state management with the Context API:

   - Implement state management for the application using React's Context API.

9. Develop responsive designs for mobile and desktop devices:

   - Ensure that the application is responsive and works well on both desktop and mobile devices.

10. Display the number of users viewing a grid:
    - Show the number of users currently viewing a grid.

---

Could you help me with each step of the developpment process? providing guidance on what to do starting with 1. Set up the project environment
what do i need to do
