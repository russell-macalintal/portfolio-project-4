const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users`;
const SCORES_URL = `${BASE_URL}/scores`;
const DIFFICULTIES_URL = `${BASE_URL}/difficulties`;

document.addEventListener('DOMContentLoaded', function() {
    const levels = Game.getDifficulty();
    const new_game_btn = document.getElementById('new-game');
    
    new_game_btn.addEventListener('click', function() {

    })
    
})