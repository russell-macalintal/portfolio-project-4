const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users`;
const SCORES_URL = `${BASE_URL}/scores`;
const DIFFICULTIES_URL = `${BASE_URL}/difficulties`;

const e_uniq = ['red', 'blue', 'green', 'yellow', 'brown', 'purple', 'black', 'white'];

const m_uniq = [...e_uniq, 'pink', 'red-blue', 'blue-green', 'green-yellow', 'yellow-brown', 'brown-pink', 'black-purple', 'black-white', 'white-purple', 'black-pink'];

const h_uniq = [...m_uniq, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

const easy_cards = [...e_uniq, ...e_uniq];
const medium_cards = [...m_uniq, ...m_uniq];
const hard_cards = [...h_uniq, ...h_uniq];

document.addEventListener('DOMContentLoaded', function() {
    
    const new_game_btn = document.getElementById('new-game');
    const leaderboards_btn = document.getElementById('leaderboards');

    const game_window = document.getElementById('game-window');
    const user_banner = document.getElementById('current-user');
    const logout_btn = document.getElementById('logout');
    const game_info = document.getElementById('game-info');
    const submit_score = document.getElementById('submit-score');
    const moves_html = document.getElementById("moves");
    const timer = document.getElementById("timer");
    const finish = document.getElementById("finish");

    let game_user = '';
    
    function reset_game_info() {
        timer.classList.add("hidden");
        timer.innerHTML = "";
        moves_html.classList.add("hidden");
        moves_html.innerHTML = "";
        finish.classList.add("hidden");
        submit_score.classList.add("hidden");
    }

    // Button to start new game
    new_game_btn.addEventListener('click', function() {
        Game.clearWindow(game_window);
        // If user has not been identified, invoke login prompt
        if(game_user === ''){
            User.renderLogin();
            const submit_btn = document.getElementById('user-submit');
            const input = document.getElementById('user-input');
            submit_btn.addEventListener('click', function(e) {
                e.preventDefault();
                game_user = new User(input.value);
                user_banner.innerHTML = `PLAYING AS: ${game_user.username}`;
                user_banner.classList.remove('hidden');
                logout_btn.classList.remove('hidden');
                Game.clearWindow(game_window);
                Game.selectNewGame(game_user);
            })
        } else {
            reset_game_info();
            Game.selectNewGame(game_user);
        }
    })

    // Button to see all scores in order from highest to lowest
    leaderboards_btn.addEventListener('click', function() {
        Game.clearWindow(game_window);
        reset_game_info();
        Game.getLeaderboards();
    })
    
    // Button to logout and reload the window to release user info and scores
    logout_btn.addEventListener('click', function() {
        window.location.reload();
    })

    // Button to submit a user's current score into database
    submit_score.addEventListener('click', function() {
        Game.clearWindow(game_window);
        reset_game_info();

        // Use sample game_user profile to test functionality
        game_user = new User('Scully');
        game_user.gameDifficulty = "Easy";
        game_user.current_score = 0;

        game_user.submitAndRenderScores();
    })
})