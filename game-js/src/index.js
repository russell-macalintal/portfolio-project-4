const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users`;
const SCORES_URL = `${BASE_URL}/scores`;
const DIFFICULTIES_URL = `${BASE_URL}/difficulties`;

document.addEventListener('DOMContentLoaded', function() {
    
    let game_user = '';
    const new_game_btn = document.getElementById('new-game');
    const leaderboards_btn = document.getElementById('leaderboards');

    const game_window = document.getElementById('game-window');
    const game_info = document.getElementById('game-info');
    const user_banner = document.getElementById('current-user');
    const logout_btn = document.getElementById('logout');
    const delete_scores_btn = document.getElementById('user-delete');
    
    new_game_btn.addEventListener('click', function() {
        Game.clearWindow(game_window);

        if(game_user === ''){
            User.renderLogin(game_window);
            const submit_btn = document.getElementById('user-submit');
            const input = document.getElementById('user-input');
            submit_btn.addEventListener('click', function(e) {
                e.preventDefault();
                game_user = new User(input.value);
                user_banner.innerHTML = `PLAYING AS: ${game_user.username}`;
                user_banner.classList.toggle('hidden');
                logout_btn.classList.toggle('hidden');
                Game.clearWindow(game_window);
                Game.startNewGame(game_user, game_window);
            })
        } else {
            Game.startNewGame(game_user, game_window);
        }
    })

    leaderboards_btn.addEventListener('click', function() {
        Game.clearWindow(game_window);
        Game.getLeaderboards(game_window);
    })
    
    logout_btn.addEventListener('click', function() {
        window.location.reload();
    })

    // These variables and event listeners may have to be moved elsewhere if button is not permanent
    const submit_scores_btn = document.getElementById('submit-scores');
    submit_scores_btn.addEventListener('click', function() {
        Game.clearWindow(game_window);

        // Use sample game_user profile to test functionality
        game_user = new User('David');
        game_user.gameDifficulty = "Easy";
        game_user.current_score = 0;

        game_user.submitAndRenderScores(game_window);
    })
})