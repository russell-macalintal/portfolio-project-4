# portfolio-project-4

This is a Single Page Javascript Application of a Card Matching Game that will test your memory skills. It is a simple program that implements the logic and mechanics of a basic memory-based game and which keeps track of its Users' scores using a Rails API server. 

Upon loading of the application, the User will be prompted to select a level of difficulty (Easy, Medium, or Hard) for their game. They will then be provided several seconds to look at and memorize the 'revealed' board. Once the cards are all flipped over and hidden, the User will simply select any 2 cards to create a matching pair while a timer counts up and the total number of 'moves' to find all the matching pairs are tallied.

Non-matching cards are flipped over and rehidden, while matched pairs are permanently revealed. When the board is complete, the timer stops and the User receives a score based on both the time to completion and the number of moves performed (less is better). The User will then be prompted to enter their username to log their scores into the leaderboards to compare how they performed against other players.


## INSTALLATION

- Clone the repository
- Open the application folder and navigate to the '/user-high-score-api' directory
- Run 'rails db:reset' in the terminal to obtain a clean database with randomized seed information
- Run 'rails server' to initiliaze the backend API
- Navigate to the '/game-js' directory
- Run 'explorer.exe index.html' to start the application on the default web browser
- Follow the prompts to start the game
- Enjoy!