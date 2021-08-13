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

        let final_minute = parseInt(timer.innerHTML.split(':')[1].split('>')[1]);
        let final_sec = parseInt(timer.innerHTML.split(':')[2]);
        let total_time = final_minute*60 + final_sec;

        let moves = parseInt(moves_html.innerHTML.split('>')[2]);

        // Calculate User Score
        let b_multiplier = 0;
        let min_moves = 0;
        let t_multiplier = 0;
        // Multiplier based on difficulty
        switch(game_user.gameDifficulty) {
            case 'Easy':
                b_multiplier = 10;
                min_moves = 8;
                t_multiplier = 1;
                break;
            case 'Medium':
                b_multiplier = 25;
                min_moves = 28;
                t_multiplier = 2;
                break;
            case 'Hard':
                b_multiplier = 50;
                min_moves = 64;
                t_multiplier = 3;
                break;
        }

        let base_score = Math.max((100 + min_moves) - moves, 0) * b_multiplier;

        let time_bonus;
        // Additional score based on completion time
        switch(true) {
            case (total_time < 30):
                time_bonus = 500 * t_multiplier;
                break;
            case (total_time < 45):
                time_bonus = 400 * t_multiplier;
                break;
            case (total_time < 60):
                time_bonus = 300 * t_multiplier;
                break;
            case (total_time < 90):
                time_bonus = 200 * t_multiplier;
                break;
            case (total_time < 120):
                time_bonus = 100 * t_multiplier;
                break;
            case (total_time < 180):
                time_bonus = 50 * t_multiplier;
                break;
            default:
                time_bonus = 0;
        }

        game_user.current_score = Math.max(base_score + time_bonus, 0);
        game_user.submitAndRenderScores();
        reset_game_info();
    })
})