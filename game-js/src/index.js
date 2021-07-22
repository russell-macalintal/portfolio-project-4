const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users`;
const SCORES_URL = `${BASE_URL}/scores`;
const DIFFICULTIES_URL = `${BASE_URL}/difficulties`;



document.addEventListener('DOMContentLoaded', function() {
    const new_game_btn = document.getElementById('new-game');
    const leaderboards_btn = document.getElementById('leaderboards');
    const game_window = document.getElementById('game-window');
    const game_info = document.getElementById('game-info');
    
    new_game_btn.addEventListener('click', function() {
        Game.clearWindow(game_window);
        Game.startNewGame(game_window);
    })

    leaderboards_btn.addEventListener('click', function() {
        Game.clearWindow(game_window);
        Game.getLeaderboards(game_window);
    })
    
})