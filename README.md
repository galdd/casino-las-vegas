# Casino Las Vegas
A slot machine game built with React and Node.js.

## How to Play

1. **Start a Game**: When you open the app, click the "New Game" button to start a new game with 10 credits.
2. **Roll the Slots**: Click the "Roll" button to roll the slots. Each roll costs 1 credit.
3. **Winning**: To win a roll, you need to get the same symbol in all three blocks. The rewards are:
   - Cherry: 10 credits
   - Lemon: 20 credits
   - Orange: 30 credits
   - Watermelon: 40 credits
4. **Cash Out**: At any point, you can click the "Cash Out" button to cash out your credits and end the session.
5. **Cheating Mechanism**: 
   - When you have less than 40 credits, the rolls are truly random.
   - When you have between 40 and 60 credits, there is a 30% chance that the server will re-roll a winning roll.
   - When you have more than 60 credits, there is a 60% chance that the server will re-roll a winning roll.


## Tasks

### Server-side

- [x] When a user has less than 40 credits in the game session, their rolls are truly random. *(Handled in `casino.service.ts` in the `runRound` function)*
- [x] If a user has between 40 and 60 credits, the server begins to slightly cheat:
  - [x] For each winning roll, before communicating back to the client, the server performs a 30% chance roll which decides if the server will re-roll that round. *(Handled in `casino.service.ts` in the `runRound` function)*
  - [x] If the roll is true, then the server re-rolls and communicates the new result back. *(Handled in `casino.service.ts` in the `runRound` function)*
- [x] If the user has above 60 credits, the server acts the same, but the chance of re-rolling the round increases to 60%. *(Handled in `casino.service.ts` in the `runRound` function)*
  - [x] If the roll is true, then the server re-rolls and communicates the new result back. *(Handled in `casino.service.ts` in the `runRound` function)*
- [x] There is a cash-out endpoint that moves credits from the game session to the user's account and closes the session. *(Handled in `routes.ts` in the `cashOut` route)*

### Client-side

- [x] Include a super simple, minimalistic table with 3 blocks in 1 row. *(Handled in `GameSection.tsx` and `SlotMachine.tsx`, ****Not in a classic table structure, but serving the same purpose)*
- [x] Include a button next to the table that starts the game. *(Handled in `GameSection.tsx`)*
- [x] The components for each sign can be a starting letter (C for cherry, L for lemon, O for orange, W for watermelon). *(Handled in `SlotMachine.tsx`)*
- [x] After submitting a roll request to the server, all blocks should enter a spinning state (can be 'X' character spinning). *(Handled in `SlotMachine.tsx`)*
- [x] After receiving a response from the server:
  - [x] The first sign should spin for 1 second more and then display the result. *(Handled in `SlotMachine.tsx`)*
  - [x] The second sign should display the result at 2 seconds. *(Handled in `SlotMachine.tsx`)*
  - [x] The third sign should display the result at 3 seconds. *(Handled in `SlotMachine.tsx`)*
- [x] If the user wins the round, their session credit is increased by the amount from the server response, otherwise, it is deducted by 1. *(Handled in `SessionManager.tsx` and `GameSection.tsx`)*

## Evaluation Criteria

1. **Completeness**: Did you complete the features as briefed?
   - **Answer**: Yes, all the features as specified in the brief were completed. The server-side logic includes random rolls and mechanisms to slightly cheat when the user's credits are between 40 and 60, and more aggressively when above 60. The client-side includes a simple interface with a table, buttons to start the game and roll, and a display that updates the results of the rolls with the correct timing and visual effects.

2. **Correctness**: Does the solution perform in sensible, thought-out ways?
   - **Answer**: Yes, the solution performs as expected. The game starts with 10 credits, each roll deducts 1 credit, and winning rolls award the correct amount of credits based on the symbols. The server correctly manages the session state and implements the cheating mechanism based on the player's current credits. The client updates the UI to reflect the game state and results in a user-friendly manner.

3. **Maintainability**: Is the code written in a clean, maintainable way?
   - **Answer**: Yes, the code is written in a modular and maintainable way. The backend and frontend are separated into their respective directories, each with its own configuration files and dependencies. The code follows best practices, with clear function and variable names, and includes comments where necessary to explain the logic. The use of TypeScript ensures type safety and helps prevent bugs.

4. **Testing**: Was the system adequately tested?
   - **Answer**: Yes,
     - **Backend**: *Unit-testing
       - Tested that credits decrease by 1 on each roll.
       - Tested that an error is thrown if no credits are left.
       - Tested that credits increase correctly on a winning roll.
     - **Frontend**: * E2E
       - Tested that a new game starts and displays initial credits correctly.
       - Tested that cashing out returns 0 credits and shows the correct message.


## Development Steps

### Backend

1. **Project Setup**:
   - Initialized a new Node.js project.
   - Installed necessary dependencies: Express, express-session, dotenv, cors, uuid, lodash.
   - Set up TypeScript configuration.

2. **Session Management**:
   - Implemented session management using express-session.
   - Configured sessions to be stored in memory for simplicity.

3. **Slot Machine Logic**:
   - Created `casino.service.ts` to handle the main game logic.
   - Implemented functions to start a session (`startSession`), run a round (`runRound`), and cash out (`cashOut`).
   - Added logic to manage credits and determine if a roll is a winning roll.
   - Implemented the cheating mechanism based on the user's credits.

4. **API Endpoints**:
   - Created API endpoints in `routes.ts` for checking the session, starting a game, rolling the slots, and cashing out.
   - Integrated the game logic with the API routes to handle client requests.

5. **Testing**:
   - Added unit tests for the main functions in `casino.service.ts` using Vitest.
   - Verified that credits decrease correctly, errors are thrown when necessary, and winnings are awarded properly.

### Frontend

1. **Project Setup**:
   - Initialized a new React project using Vite.
   - Installed necessary dependencies: React, React DOM, Axios, Ant Design, react-cookie.

2. **Component Structure**:
   - Created main components: `App`, `GameSection`, `SlotMachine`, `MessageDisplay`, and `WinningGuide`.
   - Organized components to ensure a clear separation of concerns and reusability.

3. **State Management**:
   - Managed session state using react-cookie to persist session data across page reloads.
   - Used hooks like `useState` and `useEffect` to manage the component states and lifecycle.

4. **Game Logic Integration**:
   - Integrated the game logic with the frontend components.
   - Implemented functions to start a new game, roll the slots, and cash out.
   - Updated the UI based on the game state and server responses.

5. **Animations and Timing**:
   - Added animations for the slot machine to simulate spinning.
   - Ensured that each slot displays the result with the correct delay (1 second, 2 seconds, 3 seconds).

6. **Testing**:
   - Added end-to-end tests for the main user interactions using Vitest and React Testing Library.
   - Verified that the game starts correctly, rolls work as expected, and cashing out updates the UI properly.

### Documentation

- Documented the development process, decisions made, and challenges faced in the README file.
- Provided clear instructions for setting up, running, and testing the project.

## Installation and Running the Project

### Backend

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the backend directory or set up environment variables with the following values:
    ```sh
    NODE_ENV=development
    SECRET_KEY=your-secret-key
    CORS_PORT={client port}
    PORT={server port}
    ```

4. Run the development server:
    ```sh
    npm run dev
    ```

5. Build the project:
    ```sh
    npm run build
    ```

6. Run the tests:
    ```sh
    npm run test
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Run the development server:
    ```sh
    npm run dev
    ```

4. Build the project:
    ```sh
    npm run build
    ```

5. Run the tests:
    ```sh
    npm run test
    ```